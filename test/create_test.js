const assert = require('assert');
const User   = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });

    joe.save()
      .then(() => {
        // JOE FOI SALVO?
        // O ATRIBUTO isNew DIZ SE O DADO FOI INSERIDO OU
        // NAO
        // ANTES DO DADO SER INSERIDO ELE EH 'NOVO'
        // DEPOIS DA INSERCAO ELE NAO EH MAIS 'NOVO'
        assert(!joe.isNew);
        done();
      });
  });
});
