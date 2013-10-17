@echo off

PUSHD %~dp0

rmdir /s /q %1src

POPD

exit 0