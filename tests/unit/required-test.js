import Ember from 'ember';
import { module, test } from 'qunit';
import Enforcer from 'ember-enforcer';

module('Enforcer.required test', {
  setup() {
  }
});

test('returns an Ember.Mixin', (assert) => {
  const mixin = Enforcer.required('someAttr');
  assert.ok(mixin instanceof Ember.Mixin);
});

test('throws when attrName argument is missing', (assert) => {
  const errorBlock = () => {
    Enforcer.required();
  };

  assert.throws(errorBlock);
});

test('can be mixed into a component', (assert) => {
    const klass = Ember.Component.extend(Enforcer.required('someAttr'), {});
    const component = klass.create({
      attrs: { 'someAttr': true }
    });

    assert.ok(component);
});

test('throws when mixed in component is missing attr', (assert) => {
    const klass1 = Ember.Component.extend(Enforcer.required('someAttr'), {});
    const errorBlock1 = () => {
      const component = klass1.create({
        attrs: {}
      });
    };

    assert.throws(errorBlock1, (error) => {
      return Ember.isPresent(error.message.match(/someAttr/));
    }, 'throws default error message');

    const klass2 = Ember.Component.extend(
      Enforcer.required('someAttr', { message: 'MAGIC' }),
      {});
    const errorBlock2 = () => {
      const component = klass2.create({
        attrs: {}
      });
    };

    assert.throws(errorBlock2, (error) => {
      return Ember.isPresent(error.message.match(/MAGIC/));
    }, 'throws custom error message');
});

