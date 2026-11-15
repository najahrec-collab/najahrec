/**
 * server.js
 * خادم محلي لإدارة ومزامنة السير الذاتية مباشرة مع ملفات الموقع و GitHub
 * مكتب النجاح للاستقدام
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { updateJsFilesWithResumes } = require("./sync_resumes");

const PORT = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function pushToGitHub(callback) {
  const gitCandidates = [
    "git",
    '"C:\\Program Files\\Git\\cmd\\git.exe"',
    `"C:\\Users\\${process.env.USERNAME}\\AppData\\Local\\Programs\\Git\\cmd\\git.exe"`
  ];
  const gitCmd = fs.existsSync("C:\\Program Files\\Git\\cmd\\git.exe")
    ? '"C:\\Program Files\\Git\\cmd\\git.exe"'
    : gitCandidates[0];

  const cmd = `${gitCmd} add . && ${gitCmd} commit -m "Update resumes via control panel" && ${gitCmd} push origin main`;
  exec(cmd, { cwd: ROOT_DIR }, (err, stdout, stderr) => {
    if (err) {
      console.warn("[i] ملاحظة أثناء الرفع إلى GitHub:", stderr || err.message);
    } else {
      console.log("[✓] تم رفع التحديثات إلى GitHub بنجاح!");
    }
    if (callback) callback(err, stdout);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/save-resumes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        const resumes = Array.isArray(payload) ? payload : payload.resumes;
        const ok = updateJsFilesWithResumes(resumes);

        if (payload.push) {
          pushToGitHub(() => {
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ success: ok, pushed: true }));
          });
        } else {
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ success: ok }));
        }
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(ROOT_DIR, reqPath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log("==================================================");
  console.log("  مكتب النجاح للاستقدام - نظام إدارة السير الذاتية");
  console.log(`  لوحة التحكم:  http://localhost:${PORT}/admin.html`);
  console.log(`  صفحة السير:   http://localhost:${PORT}/resumes.html`);
  console.log("==================================================");
  exec(`start http://localhost:${PORT}/admin.html`);
});
