@echo off
setlocal EnableDelayedExpansion

for /f "delims=" %%i in ('npm pkg get imageTag') do (
    set IMAGE_TAG=%%i
    set IMAGE_TAG=!IMAGE_TAG:"=!
)

echo Building Docker image with tag %IMAGE_TAG%...

docker build -t "%IMAGE_TAG%" .
if %ERRORLEVEL% NEQ 0 (
    echo Docker build failed. Exiting.
    exit /b 1
)

echo Docker image built successfully with tag %IMAGE_TAG%.
