@echo off

PUSHD %~dp0

cd output
IF %ERRORLEVEL% NEQ 0 goto exit

del /S *.ts
del /S *.js.map
del /S IDatabaseInfo.js
del /S ILookuper.js
del /S IInformationProvider.js
del /S Ii18n.js
del /S ISettings.js
del /S Localization

:exit

POPD