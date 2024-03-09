rmdir /s /q ./dist

cd ./serverScripts

node build.js

move dist ..