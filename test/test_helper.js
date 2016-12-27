const mongoose = require('mongoose');
// global.Promise EH A IMPLEMENTACAO NATIVA DO NODE
// PARA PROMISES
mongoose.Promise = global.Promise;

before(() => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {})
    .on('error', error => {
      console.warn('Warning ', error);
    });
});
// HOOK
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    // CALLBACK
    done();
  });
});
