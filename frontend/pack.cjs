const fs = require("fs");
const path = require("path");

const targetFolder = "./src"; // Specifically targets your React source code
const outputFile = "frontend.txt";

let combinedCode = "";

function readFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (
      file === "node_modules" ||
      file === "dist" ||
      file.startsWith(".") ||
      file === "pack.js"
    )
      return;

    if (fs.statSync(fullPath).isDirectory()) {
      readFiles(fullPath);
    } else if (
      fullPath.endsWith(".js") ||
      fullPath.endsWith(".jsx") ||
      fullPath.endsWith(".css")
    ) {
      combinedCode += `\n\n========== FRONTEND: ${fullPath} ==========\n\n`;
      combinedCode += fs.readFileSync(fullPath, "utf-8");
    }
  });
}

console.log("Packing frontend files...");
readFiles(targetFolder);
fs.writeFileSync(outputFile, combinedCode);
console.log(`Done! Created ${outputFile}`);
