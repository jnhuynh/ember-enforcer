import Ember from 'ember';
import { module, test } from 'qunit';
import Enforcer from 'ember-enforcer';

module('Enforcer.required test', {
  setup() {
  }
});

test('returns an Ember.Mixin', (assert) => {
  let mixin = Enforcer.required('someAttr');
  assert.ok(mixin instanceof Ember.Mixin);
});
