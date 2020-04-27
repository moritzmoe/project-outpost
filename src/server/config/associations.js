const Category = require('../models/category');
const Item = require('../models/item');
const PackMat = require('../models/packMat');
const PackType = require('../models/packType');
const Purchase = require('../models/purchase');
const SubCategory = require('../models/subCategory');
const User = require('../models/user');

// User created item 1:n
User.hasMany(Item, {
  as: 'created',
  foreignKey: 'createdBy'
});
Item.belongsTo(User, {
  as: 'created',
  foreignKey: 'createdBy'
});

// User last updated item 1:n
User.hasMany(Item, {
  as: 'lastUpdated',
  foreignKey: 'lastUpdatedBy'
});
Item.belongsTo(User, {
  as: 'lastUpdated',
  foreignKey: 'lastUpdatedBy'
});

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

// Item has (sub)category 1:n
SubCategory.hasMany(Item, {
  foreignKey: 'categoryId'
});
Item.belongsTo(SubCategory, {
  foreignKey: 'categoryId'
});

// Category has SubCategories 1:n
Category.hasMany(SubCategory, {
  foreignKey: 'parentCat'
});
SubCategory.belongsTo(Category, {
  foreignKey: 'parentCat'
});

// PackMat can have many items 1:n
PackMat.hasMany(Item, {
  foreignKey: 'packmat'
});
Item.belongsTo(PackMat, {
  foreignKey: 'packmat'
});

// PackType can have many items 1:n
PackType.hasMany(Item, {
  foreignKey: 'packtype'
});
Item.belongsTo(PackType, {
  foreignKey: 'packtype'
});
