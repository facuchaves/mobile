# Checkbox

### Dependencias

```react
import React from 'react'
import { Checkbox } from '../checkbox/Checkbox'
```

### Props

_Nombres_

Al llamar al componente Checkbox, es necesario que se pasen las siguientes props:

- id [number] = {id}
- question [string] = {question}
- options [ [{id: [number], option: [string] }] ] = {options}
- disabled [bool] = {disabled}
- small [bool] = {small}
- register [func] = {register}
- errors [object] = {}

_Descripción_

- id: id de la pregunta.
- question: pregunta que se responde seleccionando una o más de las respuestas establecidas.
- options: objeto con las respuestas posibles y su id respectivo.
- disabled: bool si la pregunta está deshabilitada o no.
- small: si los tamaños de los checkbox y las respuestas son más pequeños del default.
- register: función que se ejecuta al responder.
- errors: qué errores se tienen en cuenta.

### Ejemplo final

El mismo quedaría de esta manera:

```react
      <Checkbox
        id="RBTEST"
        question="Checkbox"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
```
