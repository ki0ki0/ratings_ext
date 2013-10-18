@echo off

SET KANGODIR=C:\kango-framework

PUSHD %~dp0

xcopy /S /Y kango_src %~dp1src\

xcopy /S /Y certificates %~dp1certificates\

%~dp1addHeader.exe %~dp1\src\common\js
%~dp1addHeader.exe %~dp1\src\common\ts
%~dp1addHeader.exe %~dp1\src\chrome\ts
%~dp1addHeader.exe %~dp1\src\firefox\ts

call "%KANGODIR%\kango.py" build %~dp1

POPD