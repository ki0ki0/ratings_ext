@echo off

SET KANGODIR=C:\kango-framework

PUSHD %~dp0

call "%KANGODIR%\kango.py" build .\

call clean.cmd 2> nul > nul

POPD