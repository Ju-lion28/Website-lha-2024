const sharp = require("sharp")
const minifyHtml = require("@minify-html/node")
const fsExtra = require('fs-extra');
const esbuild = require('esbuild')

const process = require('node:process');
const fs = require('fs');
const path = require("path")

let jsFiles = []
let htmlFiles = []
let MiscFiles = []
let cssFiles = []

if(process.cwd().toString().includes("serverScripts") === false) {
  console.log("Please enter serverScripts directory and run the code from there.")
  process.exit(1)
}

try {
  createEnv()
} catch (error) {
  console.log(error)
}

fs.readFile('./.buildignore', { encoding: 'utf8' }, (err, contents) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  const filesToIgnoreArray = String(contents).split("\n");

  fs.readdir("../", { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }

    filteredFiles = files.filter(obj => !filesToIgnoreArray.includes(obj.name));

    console.log(filteredFiles)
    for (const file of filteredFiles) {

      switch (true) {
        case file.name.includes(".html"):
          htmlFiles.push(file.path + file.name)
          break;
        case file.name.includes(".js"):
          jsFiles.push(file.path + file.name)
          break;
        case file.name.includes(".css"):
          cssFiles.push(file.path + file.name)
          break;
        case file.isDirectory():
          fs.readdir(file.path + file.name, { recursive: true }, (err, dirFiles) => {
              if (err) {
                console.error(err.message);
                process.exit(1);
              }
              
              for (const dirFile of dirFiles) {
                const filePath = file.path + file.name + '/' + dirFile;
                
                if (dirFile.includes("html")) {
                  htmlFiles.push(filePath);
                } else {
                  MiscFiles.push(filePath);
                }
              }
            });
          break;
        default:
          MiscFiles.push(file.path + file.name)
          break;
      }
    }

    htmlHandler(htmlFiles)
    cssHandler(cssFiles)
    jsHandler(jsFiles)
    //webpHandler(MiscFiles)
  });
});

async function clean() {
  try {
    await fsExtra.emptyDir("./dist", { recursive: true });
    console.log("Directory ./dist emptied successfully.");

    await fsExtra.remove("./dist", { recursive: true });
    console.log("Directory ./dist deleted successfully.");
  } catch (err) {
    console.error("Error during clean:", err);
  }
}

async function createEnv() {
  try {
    await fsExtra.ensureDir("./dist");
    await fsExtra.ensureDir("./dist/assets");
    await fsExtra.ensureDir("./dist/locales");
    await fsExtra.ensureDir("./dist/pages");

    await fsExtra.copy("../assets", "./dist/assets", { overwrite: true });
    await fsExtra.copy("../locales", "./dist/locales", { overwrite: true });

    console.log("Environment setup completed successfully.");
  } catch (err) {
    console.error(err.message);
  }
}

function htmlHandler(htmlFiles) {
  for (let file of htmlFiles) {
    try {
      const htmlContent = fs.readFileSync(file, 'utf8');

      const minifiedHtml = minifyHtml.minify(Buffer.from(htmlContent), {minify_css: true, minify_js: true});

      const outputname = file.replace(/\.\./g, '')
  
      fs.writeFileSync(`./dist${outputname}`, minifiedHtml, 'utf8');
    } catch (err) {
      console.error(err.message);
    }
  }
}

function jsHandler(jsFiles) {
  for(let file of jsFiles) {
    const outputname = file.replace(/\.\./g, '')
    try {
      esbuild.build({
        entryPoints: [file],
        bundle: false,
        minify: true,
        sourcemap: false,
        outfile: `./dist/${outputname}`,
      })      
    } catch (error) {
      console.error(error)
    }
  }
}

function cssHandler(cssFiles) {
  for(let file of cssFiles) {
    const outputname = file.replace(/\.\./g, '')
    try {
      esbuild.build({
        entryPoints: [file],
        bundle: false,
        minify: true,
        sourcemap: false,
        outfile: `./dist/${outputname}`,
        loader: { '.ttf': 'empty' },
      })      
    } catch (error) {
      console.error(error)
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
          .webp({ lossless: true, quality: 20})
          .toFile(outputPath, { force: true,});
      } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
      }
    }
  }
}