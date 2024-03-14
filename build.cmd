rmdir /s /q dist

cd serverScripts

node build.js

del /Q "dist\locales\*.md"

xcopy dist ..\dist\ /E /Y && rmdir /S /Q dist
