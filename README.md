# Ember Enforcer

## Installation

```
ember install ember-enforcer
```

## API

#### Required Attributes

```
Enforcer.required(attrName, [options])
```

`options` can have any of the following keys:
- `type`
  `type` arguments can be any of the following strings:
  - `string`
  - `number`
  - `object`
  - `bool`
  - `function`
- `message`

```
import Ember from 'ember';
import Enforcer from 'ember-enforcer';

const ButtonComponent = Ember.Component.extend(
  Enforcer.required('height'),
  Enforcer.required('width', { type: 'number' }),
  Enforcer.required('model', { type: 'object' }),
  Enforcer.required('enabled', { type: 'bool' }),
  Enforcer.required('color', { message: 'Component requires hex string attribute' }),
  Enforcer.required('onClick', {
    type: 'function',
    message: 'Component requires onClick callback attribute'
  }),

  {
    // Component logic goes here...
});

export default ButtonComponent;
```

## Future Enhancements

- ES7 decorators once the proposal is formalized
- `type` can be a function that returns if attr is a valid type
