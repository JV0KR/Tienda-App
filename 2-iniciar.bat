@echo off
setlocal
cd /d "%~dp0"

if not exist backend\node_modules (
  echo [ERROR] Falta instalar. Ejecuta primero 1-instalar.bat
  pause
  goto :eof
)
if not exist frontend\node_modules (
  echo [ERROR] Falta instalar. Ejecuta primero 1-instalar.bat
  pause
  goto :eof
)

echo Iniciando backend en una ventana nueva...
start "TiendaApp - Backend" cmd /k "cd /d %~dp0backend && npm run dev"

echo Iniciando Expo en una ventana nueva...
start "TiendaApp - Frontend" cmd /k "cd /d %~dp0frontend && npx expo start -c"

echo.
echo Listo. En la ventana de Expo presiona:
echo   w = abrir en el navegador
echo   a = emulador Android
echo   o escanea el QR con Expo Go en tu celular (misma red Wi-Fi)
echo.
echo Usuario: admin@tienda.com   Clave: 123456
echo Para detener todo, cierra las dos ventanas nuevas (o Ctrl+C en cada una).
endlocal
