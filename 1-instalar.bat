@echo off
setlocal
cd /d "%~dp0"

echo ==================================================
echo   TiendaApp - Instalacion (solo se hace una vez)
echo ==================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js no esta instalado. Descargalo de https://nodejs.org y vuelve a ejecutar.
  goto :fin
)

echo [1/3] Instalando dependencias del backend...
pushd backend
call npm install
if errorlevel 1 ( popd & goto :error )
popd

if exist frontend\package.json (
  echo [2/3] El frontend ya tiene package.json, se omite la creacion de la base Expo.
) else (
  echo [2/3] Creando la base del proyecto Expo...
  if exist _tmp rmdir /S /Q _tmp
  call npx --yes create-expo-app@latest _tmp\TiendaApp --template blank --no-install
  if errorlevel 1 goto :error
  rem Copia package.json, app.json, index.js, assets... sin pisar nuestro App.js
  robocopy _tmp\TiendaApp frontend /E /XF App.js AGENTS.md LICENSE /XD node_modules .git .claude >nul
  if errorlevel 8 goto :error
  rmdir /S /Q _tmp
)

echo [3/3] Instalando dependencias del frontend...
pushd frontend
call npm install
if errorlevel 1 ( popd & goto :error )
call npm install @react-navigation/native @react-navigation/native-stack
if errorlevel 1 ( popd & goto :error )
call npx expo install react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage react-dom react-native-web @expo/metro-runtime
if errorlevel 1 ( popd & goto :error )
popd

echo.
echo ==================================================
echo   Listo. Ahora ejecuta 2-iniciar.bat
echo ==================================================
goto :fin

:error
echo.
echo [ERROR] Algo fallo durante la instalacion. Revisa el mensaje de arriba.

:fin
echo.
pause
endlocal
