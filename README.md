# Portal Jobs - Monorepo

En el siguiente documento cubrimos los siguientes temas

- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalacion)
- [Ejecución](#ejecucion)
- [Lineamientos de Git](#lineamientos-de-git)
- [Herramientas](#herramientas)

## Estructura del proyecto

Este proyecto es un _monorepo_ con distintos _packages_.
Usamos _Yarn workspaces_ para manejar los mismos.

Dentro de la carpeta `/packages` tenemos sub-carpetas agrupando distintos _packages_ según tipo:

- **backend** agrupa todos de _backend_
- **web** contiene los que sean _web_ o _mobile_
- **commons** agrupa aquellos que serán compartidos entre otros _packages_ (por ej. lógica de negocios, llamadas a APIs, validación, etc)

Dependiendo de qué _packages_ usan cada dependencia, `yarn` va a instalar la misma dentro de la carpeta `node_modules` del raíz del proyecto o del proyecto específico.

> Si por alguna razón se quiere forzar a un dependencia a ser instalada dentro de los `node_modules` del proyecto específicamente, se puede hacer agregando la misma dentro del `package.json` del proyecto en el campo `workspaces.nohoist`

## Instalación

Para instalar todas las dependencias de todos los proyectos, correr el siguiente comando (desde cualquier carpeta)

```
yarn
```

**IMPORTANTE: es obligatorio usar yarn en vez de npm**

## Ejecución

Desde la carpeta raíz se puede ejecutar `yarn workspace <package_name> <command>` (por ej. `yarn workspace @naveng-jobs/semanas start`) para ejecutar comandos propios de cada proyecto.
Además tenemos algunos comandos definidos en los `package.json` (tanto en el root del monorepo como en cada package) para las tareas más comunes.

Dentro del root del proyecto tenemos:

### Clean

`yarn clean` elimina todos los `node_modules` y el archivo `yarn.lock`, para que todas las dependencias vuelvan a instalarse de cero en el próximo `yarn install`

### Test

`yarn test` ejecuta los tests de cada _package_

## Lineamientos de Git

Nos basamos en el [Github Flow](https://guides.github.com/introduction/flow/) y usamos `Squash and merge` para hacer el _merge_ de cada _pull request_.

### Nombres de los branchs

Cada _branch_ debe incluir en su nombre el id del ticket de JIRA como prefijo (por ej. `ABC-123-login`) para que JIRA pueda mostrar las ramas relacionadas a cada ticket.

También los mensajes de cada _commit_ deberían incluir el mismo prefijo (por ej. `[ABC-123] Some message`) por la misma razón.

> Puede que una ticket de JIRA tenga asociadas subtareas, así un branch puede estar asociado a un id y sus commits a otros.
> Por ejemplo, el branch `ABC-123-login` puede contener los commits `ABC-126-login-page`, `ABC-127-login-api` y `ABC-130-logout`.

## Herramientas

### ESLint

Usamos **ESLint** para detectar "malas prácticas" relacionadas a _code styling_.
Tenemos un archivo de configuración (llamado `.eslintrc`) **base** en la carpeta raíz del proyecto y luego uno por cada _package_ que extiende del base y agrega/modifica algunas reglas específicas del proyecto.

### Prettier

Usamos **Prettier** para dar formato a nuestro código automáticamente.
Tenemos un único archivo de configuración (`.prettierrc`) en la carpeta raíz que se usa en todos los _packages_.

Recomendamos **enfáticamente** instalar un [plugin para tu editor](https://prettier.io/docs/en/editors.html) y habilitar la opción **_format on save_** (si existe).
