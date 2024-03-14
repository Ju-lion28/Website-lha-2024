rm -rf dist

cd serverScripts || exit

node build.js

rm -f dist/locales/*.md

cp -rf dist/* ../dist/ && rm -rf dist
