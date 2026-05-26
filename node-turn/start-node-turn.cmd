@echo off
cd /d "E:\apps\node-turn"
echo ============================== >> "E:\apps\node-turn\node-turn-autostart.log"
echo Starting NodeTURN at %date% %time% >> "E:\apps\node-turn\node-turn-autostart.log"
"C:\Program Files\nodejs\node.exe" server.js >> "E:\apps\node-turn\node-turn-autostart.log" 2>&1
