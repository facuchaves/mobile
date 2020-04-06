***PROTECTO PRODUCTO_EMPLEOS***

Proyecto desarrollado por el ramal jobs en navent.

**REQUISITOS**

-NODEJS: Versión superior a 8.11

-NVM: Para actualizar versión de node. How To Install: https://www.liquidweb.com/kb/install-nvm-node-version-manager-node-js-ubuntu-16-04-lts/

-YARN. How To Install: https://vitux.com/how-to-install-yarn-npm-client-on-ubuntu-and-manage-dependencies-through-it/

----------------------------------------------------------

**INSTALACION PREVIA A LEVANTAR EL SERVER**

***en linux requiere permisos las subcarpetas***

`$ chmod -R 777 jobs-portal`

**INSTALAR DEPENDECIAS**

Actualizar la versión de node con nvm. Debe ser superior a 8.11
`$ nvm install 10.15.3`

    Referencia: https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/

**LINK SOFT**

Chequear primero si ya está generado el link para node y nodejs
`$ cd /usr/bin` y luego, 
`$ ls -l *node*` 

Sino está creado el link crearlo desde la carpeta bin de la siguiente manera:
`$ sudo ln -s /home/{{tu_usuario}}/.nvm/versions/node/v10.15.3/bin/node nodejs`

Lo mismo con node:

`$ sudo ln -s /home/{{tu_usuario}}/.nvm/versions/node/v10.15.3/bin/node node`

**CONFIGURAR VARIABLE DE ENTORNO** 

1. Tener en algún repositorio local el archivo google_key.json
2. En ubuntu editar el archivo /etc/environment
3. Agregar la siguiente línea, editando la ruta
GOOGLE_APPLICATION_CREDENTIALS="/RUTA-DONDE-GUARDAMOS-LA-KEY/google_key.json"

Desde el ROOT ejecutar:
`$ sudo yarn install`

**RUN SERVER**
`$ sudo yarn run bm-prepro`

**RUN APP**
 `$ sudo sh runApp.sh bm-prepro semanas`

En caso de trabajar en windows imprime un error sobre la variable NODE-ENV para normalizar con linux en el root del proyecto ejecutar este comando `npm install -g win-node-env`.

Error! **VCBuild.exe** (Solo ocurre en Windows)
VCBuild.exe is not found. Para corregir este error, realizar los siguientes pasos:

1 - Instalar Python 2.7
2 - Instalar .NET 2.0 SDK
3 - Instalar Microsoft VS 2005
4 - Instalar Visual Studio Express
5 - Correr en PowerShell como administrador "npm install -g windows-build-tools"
