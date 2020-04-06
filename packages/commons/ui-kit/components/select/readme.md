# Select

### Dependencias

```react
import React from 'react'
import { Button } from '../button/Button'
import Modal from '../modal/Modal'
```

### States que maneja el padre

- animation: nombre de la animación con la cual se muestra u oculta el componente. _Ver posibles nombres en la descripción de Animation._
- visible: booleano que representa si está oculto o no el componente.

### Props

Al llamar al componente Modal, es necesario que se pasen las siguientes props:

- animation [string] = {animation}
- visible [booleano] = {visible}
- onClose [func] = {handleClose}
- header [string] = {JSX: contenido del header}
- footer [string] = {JSX: contenido del footer}
- children [string] = {JSX: contenido del modal}

### Ejemplo final

El mismo quedaría de esta manera:

```react
<Modal 
  animation={animation} 
  visible={visible} 
  onClose={this.handleCloseModalRequest} 
  header={<h3>Modal title</h3>} 
  footer={<Button variant='primary' 
          onClick={this.handleCloseModalRequest}> 
            Save changes
          </Button>}> 
  Modal body text goes here. 
</Modal>
```

# Animation

### Introducción

El funcionamiento de Animation consta de dos componentes que engloban todo aquello que quiera ser animado.

### Dependencias 

```react
import { Transition } from 'react-transition-group'
import { Animation } from '../animation/Animation'
import { AnimationFixed } from '../animation/Animation'
```

## Transition

El primero es **Transition** que permite cambiar los 4 estados del componente. Esto posibilita una animación para cada punto de secuencia en el ingreso y egreso del mismo.

### Props

Trabaja con las props:

- in [boolean] = determina si el componente está oculto o no.
- timeout [int] = tiempo en milisegundos que lleva la animación.

### State

Dentro del mismo, se agrega 'state', una variable que devuelve Transition, permitiendo determinar cada estado del componente y así efectuar la transición correspondiente en el momento indicado. Existen 4 posibles: 

- entering
- entered
- exiting
- exited

## AnimationFixed/Animation

Luego, se llama a **AnimationFixed** (en caso de que el objeto a animar deba estar fixed) o a **Animation**.

### Props

Se deben asignar las siguientes props: 

- animation [string] = nombre de la animación.
- className = {\`animation-${state}\`} = cuyo state será reemplazado por alguno de los cuatro estados mencionados anteriormente.

### Animaciones

_Fade_
- fadeIn

_Slide_
- fadeInSlideDown
- fadeInSlideUp
- fadeInSlideRight
- fadeInSlideLeft

_Bounce_
- bounceIn
- bounceInUp
- bounceInRight
- bounceInLeft
- bounceInDown

_Zoom_
- zoomIn

### Ejemplo final

El mismo quedaría de esta manera:

```react
<Transition 
    in={visible} 
    timeout={350}>
  {state => (
          <> 
          <Animation 
            name={animation} 
            className={`animation-${state}`}> 
              <Componente /> 
          </Animation>
          </>
  )}
</Transition>
```

### Documentación

[Link](https://reactcommunity.org/react-transition-group/transition)