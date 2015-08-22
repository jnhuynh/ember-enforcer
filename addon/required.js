import Ember from 'Ember';

function _defaultAssertMessage(attrName, attrType) {
  if (Ember.isPresent(attrType)) {
    return ['Error:', attrName, 'of type', attrType, 'is required'].join(' ');
  } else {
    return ['Error:', attrName, 'is required'].join(' ');
  }
}

function _enforceAttrMixin(attrName, errorMessage) {
  return Ember.Mixin.create({
    init() {
      this._super(...arguments);

      if (Ember.isEmpty(errorMessage)) {
        errorMessage = defaultAssertMessage(attrName);
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

export default function(attrName, options) {
  Ember.assert('Error: Enforcer.required() requires an attrName as the first argument',
    Ember.isEmpty(attrName));

  let type;
  let message;

  if (Ember.isPresent(options) {
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
};
