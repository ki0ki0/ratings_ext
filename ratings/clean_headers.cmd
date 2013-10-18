@echo off

PUSHD %~dp0

..\bin\Release\addHeader.exe %~dpn1\kango_src\common\js remove
..\bin\Release\addHeader.exe %~dpn1\src\common\js remove
..\bin\Release\addHeader.exe %~dpn1\src\common\ts remove
..\bin\Release\addHeader.exe %~dpn1\src\chrome\ts remove
..\bin\Release\addHeader.exe %~dpn1\src\firefox\ts remove

POPD
