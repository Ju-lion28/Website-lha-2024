const sharp = require("sharp");
const minifyHtml = require("@minify-html/node");
const fsExtra = require('fs-extra');
const esbuild = require('esbuild');

const process = require('node:process');
const fs = require('fs');
const path = require("path");

let jsFiles = [];
let htmlFiles = [];
let MiscFiles = [];
let cssFiles = [];

if(process.cwd().toString().includes("serverScripts") === false) {
  console.log("Please enter serverScripts directory and run the code from there.");
  process.exit(1);
}

clean();
createEnv();

try {
  const contents = fs.readFileSync('./.buildignore', { encoding: 'utf8' });
  const filesToIgnoreArray = String(contents).split("\n");

  const files = fs.readdirSync("../", { withFileTypes: true });

  const filteredFiles = files.filter(obj => !filesToIgnoreArray.includes(obj.name));

  for (const file of filteredFiles) {
    switch (true) {
      case file.name.includes(".html"):
        htmlFiles.push(file.path + file.name);
        break;
      case file.name.includes(".js"):
        jsFiles.push(file.path + file.name);
        break;
      case file.name.includes(".css"):
        cssFiles.push(file.path + file.name);
        break;
      case file.isDirectory():
        const dirFiles = fs.readdirSync(file.path + file.name, { recursive: true });
        for (const dirFile of dirFiles) {
          const filePath = file.path + file.name + '/' + dirFile;
          if (dirFile.includes("html")) {
            htmlFiles.push(filePath);
          } else {
            MiscFiles.push(filePath);
          }
        }
        break;
      default:
        MiscFiles.push(file.path + file.name);
        break;
    }
  }

  htmlHandler(htmlFiles);
  cssHandler(cssFiles);
  jsHandler(jsFiles);
  // webpHandler(MiscFiles)
  console.log("Copied");
} catch (err) {
  console.error(err.message);
}

function clean() {
  try {
    fsExtra.emptyDirSync("./dist", { recursive: true });
    console.log("Directory ./dist emptied successfully.");

    fsExtra.removeSync("./dist", { recursive: true });
    console.log("Directory ./dist deleted successfully.");
  } catch (err) {
    console.error("Error during clean:", err);
  }
}

function createEnv() {
  try {
    fsExtra.ensureDirSync("./dist");
    fsExtra.ensureDirSync("./dist/pages");

    fsExtra.copySync("../assets", "./dist/assets", { overwrite: true });
    fsExtra.copySync("../locales", "./dist/locales", { overwrite: true });

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
      fs.writeFileSync(`./dist${outputname}`, minifiedHtml, 'utf8');
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
        outfile: `./dist/${outputname}`,
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
        outfile: `./dist/${outputname}`,
        loader: { '.ttf': 'empty' },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

async function webpHandler(MiscFiles) {
  for (let file of MiscFiles) {
    if (file.includes("webp")) {
      const outputname = file.replace(/\.\./g, '');
      const inputPath = path.join(file);
      const outputPath = path.join("./dist", outputname);

      console.log(`Processing: ${inputPath} -> ${outputPath}`);

      try {
        await sharp("./" + inputPath)
          .webp({ lossless: true, quality: 20 })
          .toFile(outputPath, { force: true });
      } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
      }
    }
  }
}