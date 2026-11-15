/**
 * sync_resumes.js
 * أداة مزامنة السير الذاتية من لوحة التحكم إلى ملفات الموقع الرسمية (resumes.js و admin.js)
 * مكتب النجاح للاستقدام
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT_DIR = __dirname;
const IMAGES_DIR = path.join(ROOT_DIR, "images");

function saveBase64ImagesToDisk(resumes) {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  return resumes.map((cv) => {
    const copy = Object.assign({}, cv);
    if (copy.photo && typeof copy.photo === "string" && copy.photo.startsWith("data:image/")) {
      try {
        const match = copy.photo.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (match) {
          const base64Data = match[2];
          const safeId = String(copy.id || Date.now())
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "_");
          const fileName = `cv_${safeId}.jpg`;
          const filePath = path.join(IMAGES_DIR, fileName);
          fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
          copy.photo = `images/${fileName}`;
          console.log(`[+] تم حفظ صورة السيرة الذاتية (#${copy.id}) في: images/${fileName}`);
        }
      } catch (err) {
        console.warn(`[!] تعذر حفظ الصورة المنفصلة للسيرة #${copy.id}:`, err.message);
      }
    }
    return copy;
  });
}

function updateJsFilesWithResumes(resumesArray) {
  if (!Array.isArray(resumesArray) || resumesArray.length === 0) {
    console.log("[!] قائمة السير الذاتية فارغة، لم يتم التعديل.");
    return false;
  }

  const processedResumes = saveBase64ImagesToDisk(resumesArray);
  const formattedJson = JSON.stringify(processedResumes, null, 4)
    .split("\n")
    .map((line, i) => (i === 0 ? line : "  " + line))
    .join("\n");

  const replacementBlock = `const DEFAULT_RESUMES = ${formattedJson};`;
  const targetFiles = ["resumes.js", "admin.js"];
  let updatedCount = 0;

  targetFiles.forEach((file) => {
    const fullPath = path.join(ROOT_DIR, file);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, "utf8");
    const regex = /const DEFAULT_RESUMES = \[[\s\S]*?\n  \];+/;
    if (regex.test(content)) {
      const updatedContent = content.replace(regex, replacementBlock);
      fs.writeFileSync(fullPath, updatedContent, "utf8");
      updatedCount++;
      console.log(`[✓] تم تحديث السير الذاتية الافتراضية داخل الملف: ${file} (${processedResumes.length} سيرة ذاتية)`);
    } else {
      console.warn(`[!] لم يتم العثور على DEFAULT_RESUMES في الملف: ${file}`);
    }
  });

  return updatedCount > 0;
}

function findLatestSyncFile() {
  const candidates = [];
  const searchDirs = [ROOT_DIR, path.join(os.homedir(), "Downloads")];

  searchDirs.forEach((dir) => {
    try {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      files.forEach((f) => {
        if (
          (f.startsWith("alnajah_resumes_sync") || f.startsWith("alnajah_recruitment_backup")) &&
          f.endsWith(".json")
        ) {
          const full = path.join(dir, f);
          const stat = fs.statSync(full);
          candidates.push({ path: full, mtime: stat.mtimeMs, name: f });
        }
      });
    } catch (e) {}
  });

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.mtime - a.mtime);
  return candidates[0];
}

if (require.main === module) {
  const latest = findLatestSyncFile();
  if (!latest) {
    console.log("[i] لا يوجد ملف مزامنة جديد (alnajah_resumes_sync.json) في مجلد التنزيلات أو مجلد الموقع.");
    process.exit(0);
  }

  try {
    console.log(`[*] تم العثور على ملف مزامنة السير الذاتية: ${latest.path}`);
    const raw = fs.readFileSync(latest.path, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : data.resumes;
    if (Array.isArray(list) && list.length > 0) {
      updateJsFilesWithResumes(list);
    }
  } catch (err) {
    console.error("[!] خطأ أثناء قراءة ملف المزامنة:", err.message);
  }
}

module.exports = { updateJsFilesWithResumes, saveBase64ImagesToDisk };
