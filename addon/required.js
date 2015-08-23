import Ember from 'ember';

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

// function _enforceAttrWithTypeMixin(attrName, attrType, errorMessage) {
//   return Ember.Mixin.create({
//     init() {
//       this._super(...arguments);
//     }
//   });
// }

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
  // if (Ember.isPresent(type)) {
  //   mixin = enforceAttrWithTypeMixin(attrName, type, message)
  // } else {
    mixin = _enforceAttrMixin(attrName, message);
  // }

  return mixin;
}
