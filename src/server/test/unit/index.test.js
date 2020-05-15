/* eslint-disable global-require */
/* eslint-disable no-undef */


const expect = require('expect.js');

describe('models/index', () => {
  it('returns the Category model', () => {
    const models = require('../../models');
    expect(models.Category).to.be.ok();
  });

  it('returns the Item model', () => {
    const models = require('../../models');
    expect(models.Item).to.be.ok();
  });

  it('returns the Origin model', () => {
    const models = require('../../models');
    expect(models.Origin).to.be.ok();
  });

  it('returns the Packaging model', () => {
    const models = require('../../models');
    expect(models.Packaging).to.be.ok();
  });

  it('returns the Purchase model', () => {
    const models = require('../../models');
    expect(models.Purchase).to.be.ok();
  });

  it('returns the PurchaseItem model', () => {
    const models = require('../../models');
    expect(models.PurchaseItem).to.be.ok();
  });

  it('returns the SubCategory model', () => {
    const models = require('../../models');
    expect(models.SubCategory).to.be.ok();
  });

  it('returns the User model', () => {
    const models = require('../../models');
    expect(models.User).to.be.ok();
  });
});
