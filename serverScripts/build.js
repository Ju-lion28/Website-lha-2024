const sharp = require("sharp");
const minifyHtml = require("@minify-html/node");
const fsExtra = require('fs-extra');
const esbuild = require('esbuild');

const process = require('node:process');
const fs = require('fs');
const path = require("path");

let jsFiles = [];
let htmlFiles = [];
let miscFiles = [];
let cssFiles = [];

if (!process.cwd().toString().includes("serverScripts")) {
  console.log("Please enter the serverScripts directory and run the code from there.");
  process.exit(1);
}

clean();
createEnv();

try {

  const contents = fs.readFileSync(path.join(__dirname, '.buildignore'), { encoding: 'utf8' });
  const filesToIgnoreArray = String(contents).split(/\r?\n/);

  const files = fs.readdirSync("..", { withFileTypes: true });
  const filteredFiles = files.filter(obj => !filesToIgnoreArray.includes(obj.name));

  for (const file of filteredFiles) {
    switch (true) {
      case file.name.includes(".html"):
        htmlFiles.push(path.join(file.path, file.name));
        break;
      case file.name.includes(".js"):
        jsFiles.push(path.join(file.path, file.name));
        break;
      case file.name.includes(".css"):
        cssFiles.push(path.join(file.path, file.name));
        break;
      case file.isDirectory():
        const dirFiles = fs.readdirSync(path.join(file.path, file.name), { recursive: true });
        for (const dirFile of dirFiles) {
          const filePath = path.join(file.path, file.name, dirFile);
          if (dirFile.includes("html")) {
            htmlFiles.push(filePath);
          } else {
            miscFiles.push(filePath);
          }
        }
        break;
      default:
        miscFiles.push(path.join(file.path, file.name));
        break;
    }
  }

  htmlHandler(htmlFiles);
  cssHandler(cssFiles);
  jsHandler(jsFiles);
  webpHandler(miscFiles)
  console.log("Copied");
} catch (err) {
  console.error(err.message);
}

function clean() {
  try {
    fsExtra.emptyDirSync(path.join(__dirname, "dist"), { recursive: true });
    console.log("Cleaning successful");
  } catch (err) {
    console.error("Error during clean:", err);
  }
}

function createEnv() {
  try {
    fsExtra.ensureDirSync(path.join(__dirname, "dist"));
    fsExtra.ensureDirSync(path.join(__dirname, "dist", "pages"));
    fsExtra.ensureDirSync(path.join(__dirname, "dist", "assets"));
    
    fsExtra.copySync(path.join("..", "assets"), path.join(__dirname, "dist", "assets"), { overwrite: true });
    fsExtra.copySync(path.join("..", "locales"), path.join(__dirname, "dist", "locales"), { overwrite: true });

    console.log("Environment setup completed successfully.");
  } catch (err) {
    console.error(err.message);
  }
}

function htmlHandler(htmlFiles) {
  for (let file of htmlFiles) {
    try {
      const htmlContent = fs.readFileSync(file, 'utf8');
      const minifiedHtml = minifyHtml.minify(Buffer.from(htmlContent), { minify_css: true, minify_js: true });
      const outputname = file.replace(/\.\./g, '');
      fs.writeFileSync(path.join(__dirname, "dist", outputname), minifiedHtml, 'utf8');
    } catch (err) {
      console.error(err.message);
    }
  }
}

function jsHandler(jsFiles) {
  for(let file of jsFiles) {
    const outputname = file.replace(/\.\./g, '');
    try {
      esbuild.build({
        entryPoints: [file],
        bundle: false,
        minify: true,
        sourcemap: false,
        outfile: path.join(__dirname, "dist", outputname),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

function cssHandler(cssFiles) {
  for(let file of cssFiles) {
    const outputname = file.replace(/\.\./g, '');
    try {
      esbuild.build({
        entryPoints: [file],
        bundle: false,
        minify: true,
        sourcemap: false,
        outfile: path.join(__dirname, "dist", outputname),
        loader: { '.ttf': 'empty' },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

async function webpHandler(miscFiles) {
  for (let file of miscFiles) {
    if (file.includes("webp")) {
      const outputname = file.replace(/\.\./g, '');
      const inputPath = path.join(file);
      const outputPath = path.join(__dirname, "dist", outputname);

      console.log(`Processing: ${outputname}`);

      try {
        await sharp(inputPath)
          .webp({ nearLossless: true, quality: 80 })
          .toFile(outputPath, { force: true });
      } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
      }
    }
  }
}
