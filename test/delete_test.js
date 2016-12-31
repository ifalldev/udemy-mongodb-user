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

  function assertName(operation, done) {
    operation
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(!user);
        done();
      });
  }

  it('model instance remove', (done) => {
    assertName(joe.remove(),done);
  });

  it('model mothod remove', done => {
    // REMOVE A BUNCH OF RECORS WITH SOME GIVEM CRITERIA
    assertName(User.remove({ name: 'Joe' }), done);
  });

  it('model mothod findOneAndRemove', done => {
    assertName(User.findOneAndRemove({ name: 'Joe' }), done);
  });

  it('model mothod findByIdAndRemove', done => {
    assertName(User.findByIdAndRemove(joe._id), done);
  });
})
