@echo off

SET KANGODIR=C:\kango-framework

PUSHD %~dp0

call "%KANGODIR%\kango.py" build .\

POPD