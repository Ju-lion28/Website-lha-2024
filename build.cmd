rmdir /s /q .parcel-cache
rmdir /s /q dist

npx parcel build index.html

mkdir dist\locales

copy locales\* dist\locales

mkdir dist\assets
mkdir dist\assets\icons
mkdir dist\assets\icons\theme

copy assets\icons\theme\* dist\assets\icons\theme
