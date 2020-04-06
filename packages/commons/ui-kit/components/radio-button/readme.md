# RadioButton

### Dependencias

```react
import React from 'react'
import { RadioButton } from '../radio-button/RadioButton'
```

### Props

_Nombres_

Al llamar al componente RadioButton, es necesario que se pasen las siguientes props:

- id [number] = {id}
- question [string] = {question}
- options [ [{id: [number], option: [string] }] ] = {options}
- disabled [bool] = {disabled}
- small [bool] = {small}
- register [func] = {register}
- errors [object] = {}

_Descripción_

- id: id de la pregunta.
- question: pregunta que se responde seleccionando una de las respuestas establecidas.
- options: objeto con las respuestas posibles y su id respectivo.
- disabled: bool si la pregunta está deshabilitada o no.
- small: si los tamaños de los radio-button y las respuestas son más pequeños del default.
- register: función que se ejecuta al responder.
- errors: qué errores se tienen en cuenta.

### Ejemplo final

El mismo quedaría de esta manera:

```react
      <RadioButton
        id="RBTEST"
        question="RadioButton"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
```
