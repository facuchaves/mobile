# Tooltip

### Dependencias

```react
import React from 'react'
import { Tooltip } from './Tooltip'
import { Button } from '../button/Button' (Si es que el tooltip se despliega desde un botón, por ejemplo)
```

### Props

_Nombres_

Al llamar al componente Tooltip, es necesario que se pasen las siguientes props:

- animation [string] = {animation}
- visible [booleano] = {visible}
- toggleElement [func] = {JSX: componente del que se despliega el tooltip con su contenido}
- placement [string] = {string: posición del tooltip por sobre el toggleElement}
- children [string] = {JSX: contenido del tooltip}

_Descripción_

- animation: nombre de la animación con la cual se muestra u oculta el componente. _Ver posibles nombres en la descripción de Animation._

- visible: booleano que representa si está oculto o no el componente.

- toggleElement: es el componente que contiene el tooltip. Se lo asigna como función y se le comparten las props.

```react
{props => <Button {...props}>Hover</Button>}
```

- placement: se ubica primero según vertical, por alineado, y después horizontal.

  - top-left
  - top-center
  - top-right
  - center-left
  - center-right
  - bottom-left
  - bottom-center
  - bottom-right

### Ejemplo final

El mismo quedaría de esta manera:

```react
<Tooltip
  animation={'fadeIn'}
  visible={true}
  toggleElement={props => <Button {...props}>Hover</Button>}
  placement="bottom-left"
>
  <h3>Test de personalidad</h3>
  <p>Conocé los puntos fuertes de tu personalidad</p>
</Tooltip>
```
