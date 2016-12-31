'use strict'
const assert = require('assert');
const User   = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(!user);
        done();
      });
  });

  it('model mothod remove', done => {
    // REMOVE A BUNCH OF RECORS WITH SOME GIVEM CRITERIA
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(!user);
        done();
      });
  });

  it('model mothod findOneAndRemove', done => {
    User.findOneAndRemove({ name: 'Joe' })
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
      assert(!user);
      done();
    });
  });

  it('model mothod findByIdAndRemove', done => {
    User.findByIdAndRemove(joe._id)
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
      assert(!user);
      done();
    });
  });
})
