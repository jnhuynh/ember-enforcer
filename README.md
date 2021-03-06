# Ember Enforcer has been sunsetted

Instead of maintaining two different addons trying to do the same thing, I've
collaborated with Yapplabs to create Ember Strong Attrs.

As such, Ember Enforcer has been sunsetted in favor of [ember-strong-attrs](https://github.com/yapplabs/ember-strong-attrs).

---

# Ember Enforcer

Ember Enforcer is an addon that facilitates the declaration and **enforcement**
of `Ember.Component` attributes. It exposes an API that return `Ember.Mixin`
instances which can be mixed into your components.

## Installation

```
ember install ember-enforcer
```

## API

#### Required Attributes

```js
Enforcer.required(attrName, [options])
```

`options` can have any of the following keys:
- `type` values can be any of the following strings:
  - `string`
  - `number`
  - `object`
  - `bool`
  - `function`
- `message`

```js
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
