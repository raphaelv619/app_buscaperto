call pub_auto

pause

cd ..

echo "Atencao digite a senha ao ser solicitada: %CERTIFICADO_SENHA%"
pause

keytool -genkey -v -keystore %CERTIFICADO% -alias %CERTIFICADO_ALIAS% -keyalg RSA -keysize 2048 -validity 10000


pause