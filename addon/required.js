import Ember from 'ember';

const _supportedAttrTypes = {
  'bool': () => {
  },
  'function': () => {
  },
  'number': (value) => {
    return Ember.isPresent(value) && typeof value === 'number';
  },
  'object': () => {
  },
  'string': (value) => {
    return Ember.isPresent(value) && typeof value === 'string';
  },
};

function _defaultAssertMessage(attrName, attrType) {
  if (Ember.isPresent(attrType)) {
    return ['Component', attrName, 'of type', attrType, 'is required'].join(' ');
  } else {
    return ['Component', attrName, 'is required'].join(' ');
  }
}

function _enforceAttrMixin(attrName, errorMessage) {
  return Ember.Mixin.create({
    init() {
      this._super(...arguments);

      if (Ember.isEmpty(errorMessage)) {
        errorMessage = _defaultAssertMessage(attrName);
      }
      Ember.assert(errorMessage, this.get('attrs').hasOwnProperty(attrName));
    }
  });
}

function _enforceAttrWithTypeMixin(attrName, attrType, errorMessage) {
  return Ember.Mixin.create({
    init() {
      this._super(...arguments);

      if (Ember.isEmpty(errorMessage)) {
        errorMessage = _defaultAssertMessage(attrName, attrType);
      }

      const attrs = this.get('attrs');
      Ember.assert(errorMessage, attrs.hasOwnProperty(attrName));
      Ember.assert(errorMessage, _supportedAttrTypes[attrType](attrs[attrName]));
    }
  });
}

export default function required(attrName, options) {
  Ember.assert('Enforcer.required() requires an attrName as the first argument',
    Ember.isPresent(attrName));

  let type;
  let message;

  if (Ember.isPresent(options)) {
    type = options.type;
    message = options.message;
  }

  let mixin;
  if (Ember.isPresent(type)) {
    let errorMessage = 'Enforcer.required() only accepts ' +
      'options.type of the following values: ' +
      Object.keys(_supportedAttrTypes).join(', ');

    Ember.assert(errorMessage, _supportedAttrTypes.hasOwnProperty(type));

    mixin = _enforceAttrWithTypeMixin(attrName, type, message);
  } else {
    mixin = _enforceAttrMixin(attrName, message);
  }

  return mixin;
}
