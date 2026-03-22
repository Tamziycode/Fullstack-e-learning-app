const fs = require("fs");
const path = require("path");

const targetFolder = "./"; // Grabs everything in the backend root
const outputFile = "backend.txt";

let combinedCode = "";

function readFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    // Ignore modules, package-lock, and the script itself
    if (
      file === "node_modules" ||
      file === "package-lock.json" ||
      file.startsWith(".") ||
      file === "pack.js" ||
      file === "frontend.txt" ||
      file === "backend.txt"
    )
      return;

    if (fs.statSync(fullPath).isDirectory()) {
      readFiles(fullPath);
    } else if (fullPath.endsWith(".js") || fullPath.endsWith(".env.example")) {
      combinedCode += `\n\n========== BACKEND: ${fullPath} ==========\n\n`;
      combinedCode += fs.readFileSync(fullPath, "utf-8");
    }
  });
}

console.log("Packing backend files...");
readFiles(targetFolder);
fs.writeFileSync(outputFile, combinedCode);
console.log(`Done! Created ${outputFile}`);
