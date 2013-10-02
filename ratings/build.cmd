@echo off

SET KANGODIR=C:\kango-framework

PUSHD %~dp0

xcopy /S /Y kango_src %~dp1src\

xcopy /S /Y certificates %~dp1certificates\

call "%KANGODIR%\kango.py" build %~dp1

POPD