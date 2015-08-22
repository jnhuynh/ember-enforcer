# Ember Enforcer

## Installation

```
ember install ember-enforcer
```

## API

#### Required Attributes

```
Enforcer.required(attributeName, [attributeType], [errorMessage])
```

`attributeType` argument can be any of the following strings:
- `string`
- `number`
- `object`
- `bool`
- `function`

```
import Ember from 'ember';
import Enforcer from 'ember-enforcer';

const ButtonComponent = Ember.Component.extend(
  Enforcer.required('height'), // Attribute with no type requirement
  Enforcer.required('width', 'number'),
  Enforcer.required('model', 'object'),
  Enforcer.required('enabled', 'bool'),
  Enforcer.required('onClick', 'function', 'Component requires onClick callback attribute'), // Attribute with custom error message
  Enforcer.required('color', 'string', 'Component requires hex string attribute'),

  {
    // Component logic goes here...
});

export default ButtonComponent;
```

#### Optional Attributes

```
Enforcer.optional(attributeName, [attributeType], [errorMessage])
```

`attributeType` argument can be any of the following strings:
- `string`
- `number`
- `object`
- `bool`
- `function`

```
import Ember from 'ember';
import Enforcer from 'ember-enforcer';

const ButtonComponent = Ember.Component.extend(
  Enforcer.optional('height'), // Attribute with no type requirement
  Enforcer.optional('width', 'number'),
  Enforcer.optional('model', 'object'),
  Enforcer.optional('enabled', 'bool'),
  Enforcer.optional('onClick', 'function', 'Component requires onClick callback attribute'), // Attribute with custom error message
  Enforcer.optional('color', 'string', 'Component requires hex string attribute'),

  {
    // Component logic goes here...
});

export default ButtonComponent;
```
