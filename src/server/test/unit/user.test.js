/* eslint-disable global-require */
/* eslint-disable no-undef */


const expect = require('expect.js');

describe('models/user', () => {
  before(() => require('../../models').sequelize.sync());

  beforeEach(function () {
    this.User = require('../../models').User;
  });

  describe('create', () => {
    it('create a user', function () {
      return this.User.create({
        email: 'test@test.com',
        firstname: 'test',
        lastname: 'test',
        password: 'test'
      }).then((user) => {
        expect(user.email).to.equal('test@test.com');
      });
    });
  });
});
