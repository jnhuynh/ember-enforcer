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

test('throws when options.type is not a supported type', (assert) => {
  const errorBlock = () => {
    Enforcer.required('someAttr', { type: 'apples' });
  };

  assert.throws(errorBlock);
});

test('can be mixed into a component', (assert) => {
    const klass1 = Ember.Component.extend(Enforcer.required('someAttr'), {});
    const component1 = klass1.create({
      attrs: { 'someAttr': true }
    });
    assert.ok(component1, 'Can create component that requires attr');

    const klass2 = Ember.Component.extend(
      Enforcer.required('someAttr', {
        type: 'string'
      }), {
    });
    const component2 = klass2.create({
      attrs: { 'someAttr': 'yas' }
    });
    assert.ok(component2, 'Can create component that requires attr of specific type');
});

test('throws default error messages', (assert) => {
    const klass1 = Ember.Component.extend(
      Enforcer.required('someAttr'), {
    });
    const errorBlock1 = () => {
      klass1.create({
        attrs: {}
      });
    };

    assert.throws(errorBlock1, (error) => {
      return Ember.isPresent(error.message.match(/someAttr/));
    }, 'throws default error message for attr check');

    const klass2 = Ember.Component.extend(
      Enforcer.required('someAttr', { type: 'string' }), {
    });
    const errorBlock2 = () => {
      klass2.create({
        attrs: { 'someAttr': true }
      });
    };

    assert.throws(errorBlock2, (error) => {
      return Ember.isPresent(error.message.match(/someAttr/));
    }, 'throws default error message for attr and type check');
});

test('throws custom error messages', (assert) => {
    const klass1 = Ember.Component.extend(
      Enforcer.required('someAttr', { message: 'MAGIC' }), {
    });
    const errorBlock1 = () => {
      klass1.create({
        attrs: {}
      });
    };

    assert.throws(errorBlock1, (error) => {
      return Ember.isPresent(error.message.match(/MAGIC/));
    }, 'throws custom error message for attr check');

    const klass2 = Ember.Component.extend(
      Enforcer.required('someAttr', {
        type: 'string',
        message: 'MAGIC',
      }), {
    });
    const errorBlock2 = () => {
      klass2.create({
        attrs: { 'someAttr': true }
      });
    };

    assert.throws(errorBlock2, (error) => {
      return Ember.isPresent(error.message.match(/MAGIC/));
    }, 'throws custom error message for attr and type check');
});

test('throws when mixed in component is missing attr', (assert) => {
    const klass1 = Ember.Component.extend(Enforcer.required('someAttr'), {});
    const errorBlock1 = () => {
      klass1.create({
        attrs: {}
      });
    };

    assert.throws(errorBlock1, 'throws when attr is specified');

    const klass2 = Ember.Component.extend(
      Enforcer.required('someAttr', { type: 'string' }),
      {});
    const errorBlock2 = () => {
      klass2.create({
        attrs: {}
      });
    };

    assert.throws(errorBlock2, 'throws when attr and type is specified');
});

test('checks string attr type', (assert) => {
    const klass = Ember.Component.extend(
      Enforcer.required('someAttr', {
        type: 'string'
      }), {
    });

    const errorBlock1 = () => {
      klass.create({
        attrs: {}
      });
    };
    assert.throws(errorBlock1, 'throws when missing attr');

    const errorBlock2 = () => {
      klass.create({
        attrs: { 'someAttr': true }
      });
    };
    assert.throws(errorBlock2, 'throws when attr is incorrect type');

    const component = klass.create({
      attrs: { 'someAttr': 'yas' }
    });
    assert.ok(component, 'can create with valid attr and type');
});

test('checks number attr type', (assert) => {
    const klass = Ember.Component.extend(
      Enforcer.required('someAttr', {
        type: 'number'
      }), {
    });

    const errorBlock1 = () => {
      klass.create({
        attrs: {}
      });
    };
    assert.throws(errorBlock1, 'throws when missing attr');

    const errorBlock2 = () => {
      klass.create({
        attrs: { 'someAttr': true }
      });
    };
    assert.throws(errorBlock2, 'throws when attr is incorrect type');

    const component = klass.create({
      attrs: { 'someAttr': 124 }
    });
    assert.ok(component, 'can create with valid attr and type');
});

