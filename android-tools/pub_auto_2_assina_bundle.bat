# como usar https://flutter.dev/docs/deployment/android
call pub_auto

del %APPNOME%_producao.aab

del %APPNOME%_producao.apks

copy ..\android\app\build\outputs\bundle\release\app-release.aab %APPNOME%_producao.aab

.\bundletool.jar build-apks --bundle=%APPNOME%_producao.aab --output=%APPNOME%_producao.apks --ks=..\%CERTIFICADO% --ks-pass=pass:%CERTIFICADO_SENHA% --ks-key-alias=%CERTIFICADO_ALIAS% --key-pass=pass:%CERTIFICADO_SENHA%

pause