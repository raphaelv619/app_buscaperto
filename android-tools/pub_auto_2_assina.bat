# como usar https://facebook.github.io/react-native/docs/signed-apk-android.html
call pub_auto

cd ..

del android-tools\%APPNOME%_producao.apk

cd android

copy app\build\outputs\apk\release\app-release.apk ..\android-tools\%APPNOME%_producao.apk

pause