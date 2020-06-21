/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Items', [
    { name: 'Bio Black Tiger Garnelen', weight: 160, categoryId: 13, barcode: '4388844025929', packaging: 13, origin: 1, score: 2214, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Bio Ziegenofenkäse', weight: 140, categoryId: 102, barcode: '4104060028571', packaging: 16, origin: 1, score: 984, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Natives Olivenöl Extra', weight: 1000, categoryId: 4, barcode: '5200366700056', packaging: 7, origin: 1, score: 3345, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Barilla Penne Rigate', weight: 500, categoryId: 75, barcode: '8076809516457', packaging: 13, origin: 1, score: 530, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Bio Pfefferminztee', weight: 120, categoryId: 156, barcode: '4008137008308', packaging: 13, origin: 1, score: 249, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Mineralwasser Medium', weight: 2000, categoryId: 153, barcode: '4011470702987', packaging: 10, origin: 1, score: 540, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Famitra Soja Bolognese', weight: 100, categoryId: 149, barcode: '4313042436857', packaging: 14, origin: 1, score: 177, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Frisches Hackfleisch', weight: 500, categoryId: 16, barcode: '4061458018999', packaging: 4, origin: 1, score: 3085, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Cremo Butter', weight: 250, categoryId: 1, barcode: '7610434511145', packaging: 15, origin: 1, score: 2425, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Apfelmus Golden Delicious', weight: 355, categoryId: 113, barcode: '4388844003170', packaging: 17, origin: 1, score: 303, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Kelloggs Choco Krispies', weight: 700, categoryId: 151, barcode: '5050083122811', packaging: 16, origin: 1, score: 1320, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Cachew Erdnuss Mix', weight: 200, categoryId: 88, barcode: '4004980530102', packaging: 6, origin: 1, score: 364, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
