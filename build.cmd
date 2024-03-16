rmdir /s /q dist

cd serverScripts

node build.js

copy ..\robots.txt dist

xcopy dist ..\dist\ /E /Y && rmdir /S /Q dist
