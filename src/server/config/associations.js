const Category = require('../models/category');
const Item = require('../models/item');
const Packaging = require('../models/packaging');
const Origin = require('../models/origin');
const Purchase = require('../models/purchase');
const SubCategory = require('../models/subCategory');
const User = require('../models/user');

// User has many Purchases 1:n
User.hasMany(Purchase, {
  foreignKey: 'userId'
});
Purchase.belongsTo(User, {
  foreignKey: 'userId'
});

// Purchase has many Items and Item can have many Purchases n:m
Purchase.belongsToMany(Item, {
  through: 'purchaseItem'
});
Item.belongsToMany(Purchase, {
  through: 'purchaseItem'
});

// User created item 1:n
Item.belongsTo(User, {
  as: 'created',
  foreignKey: 'createdBy'
});

// User last updated item 1:n
Item.belongsTo(User, {
  as: 'lastUpdated',
  foreignKey: 'lastUpdatedBy'
});

// Category has SubCategories 1:n
Category.hasMany(SubCategory, {
  foreignKey: 'parentCat'
});

// Item has (sub)category 1:n
Item.belongsTo(SubCategory, {
  foreignKey: 'categoryId'
});

// Items has packaging 1:n
Item.belongsTo(Packaging, {
  foreignKey: 'packaging'
});

// Item has origin
Item.belongsTo(Origin, {
  foreignKey: 'origin'
});

require('./initialData');
