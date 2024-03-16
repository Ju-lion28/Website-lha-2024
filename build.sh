rm -rf dist

cd serverScripts || exit

node build.js

cp ../robots.txt dist

cp -rf dist/* ../dist/ && rm -rf dist
