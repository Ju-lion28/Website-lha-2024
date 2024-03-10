rmdir /s /q dist

cd serverScripts

node build.js

xcopy dist ..\dist\ /E /Y && rmdir /S /Q dist
