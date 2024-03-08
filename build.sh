rm -rf .parcel-cache

rm -rf dist

npx parcel build index.html 

mkdir dist/locales

cp locales/* dist/locales

mkdir dist/assets/
mkdir dist/assets/icons
mkdir dist/assets/icons/theme

cp assets/icons/theme/* dist/assets/icons/theme
cp robots.txt dist