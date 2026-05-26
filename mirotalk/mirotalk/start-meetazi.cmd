@echo off
cd /d "E:\apps\mirotalk\mirotalk"

echo ============================== >> "E:\apps\mirotalk\mirotalk\meetazi-autostart.log"
echo Starting Meetazi at %date% %time% on PORT 9907 >> "E:\apps\mirotalk\mirotalk\meetazi-autostart.log"

set PORT=9907

if not exist "app\src\config.js" (
  copy "app\src\config.template.js" "app\src\config.js" >> "E:\apps\mirotalk\mirotalk\meetazi-autostart.log" 2>&1
)

"C:\Program Files\nodejs\node.exe" app\src\server.js >> "E:\apps\mirotalk\mirotalk\meetazi-autostart.log" 2>&1
