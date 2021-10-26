@ECHO OFF 

ECHO "Stay cool,  Setting up your project for the initial dev setup!!!"
ECHO "***************************************************************"
ECHO.
ECHO "**** Cleaning up node modules ****"
ECHO.
cd ../daily-status-core && rmdir /s /q node_modules && cd ../ && cd ./daily-status-tracker-ui && rmdir /s /q node_modules
ECHO "**** Configuring daily-status-core and daily-status-tracker-ui ****"
ECHO.
cd ../daily-status-core && npm i && npm link && cd ../ && cd ./daily-status-tracker-ui && npm i && npm link daily-status-core && ECHO. && ECHO "*********** DONE!!! ************"

