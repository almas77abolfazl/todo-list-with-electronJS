const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src", "renderer", "components");
const destDir = path.join(__dirname, "dist", "gui");

function copyHtmlFiles(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyHtmlFiles(srcPath, destPath);
    } else if (entry.isFile() && path.extname(entry.name) === ".html") {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyHtmlFiles(srcDir, destDir);
console.log("HTML files copied successfully!");
