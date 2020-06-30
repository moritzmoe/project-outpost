/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Items', [
    { name: 'Black Tiger Garnelen', weight: 160, categoryId: 13, barcode: '4388844025929', packaging: 13, origin: 1, score: 2500, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Bio Black Tiger Garnelen', weight: 160, categoryId: 13, barcode: '4388843025929', packaging: 13, origin: 1, score: 2214, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ziegenofenkäse', weight: 140, categoryId: 102, barcode: '4104060028570', packaging: 16, origin: 1, score: 980, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Bio Ziegenofenkäse', weight: 140, categoryId: 102, barcode: '4104060028571', packaging: 16, origin: 1, score: 984, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Milder Bergofenkäse', weight: 140, categoryId: 102, barcode: '4104060028590', packaging: 16, origin: 1, score: 789, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Natives Olivenöl Extra', weight: 1000, categoryId: 4, barcode: '5200366700056', packaging: 7, origin: 1, score: 3345, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Sonnenblumenöl', weight: 1000, categoryId: 4, barcode: '5200366700055', packaging: 7, origin: 1, score: 3300, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Sonnenblumenöl Light', weight: 1000, categoryId: 4, barcode: '5200365700456', packaging: 7, origin: 1, score: 3330, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Barilla Penne Rigate', weight: 500, categoryId: 75, barcode: '8076809516457', packaging: 13, origin: 1, score: 530, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Bio Pfefferminztee', weight: 120, categoryId: 156, barcode: '4008137008308', packaging: 13, origin: 1, score: 249, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Mineralwasser Medium', weight: 2000, categoryId: 153, barcode: '4011470702987', packaging: 10, origin: 1, score: 540, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ja! Wasser Still', weight: 2000, categoryId: 153, barcode: '4011470702986', packaging: 10, origin: 1, score: 500, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ja! Wasser Medium', weight: 2000, categoryId: 153, barcode: '4011470702957', packaging: 10, origin: 1, score: 500, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ja! Wasser Spritzig', weight: 2000, categoryId: 153, barcode: '4011470704987', packaging: 10, origin: 1, score: 500, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Famitra Soja Bolognese', weight: 100, categoryId: 149, barcode: '4313042436857', packaging: 14, origin: 1, score: 177, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Frisches Hackfleisch', weight: 500, categoryId: 16, barcode: '4061458018999', packaging: 4, origin: 1, score: 3085, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Bio Hackfleisch', weight: 500, categoryId: 16, barcode: '4061458018998', packaging: 4, origin: 1, score: 2500, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Eco Hackfleisch', weight: 500, categoryId: 16, barcode: '4061458018997', packaging: 4, origin: 1, score: 2350, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Cremo Butter', weight: 250, categoryId: 1, barcode: '7610434511145', packaging: 15, origin: 1, score: 2425, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Apfelmus Golden Delicious', weight: 355, categoryId: 113, barcode: '4388844003170', packaging: 17, origin: 1, score: 303, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Kelloggs Choco Krispies', weight: 700, categoryId: 151, barcode: '5050083122811', packaging: 16, origin: 1, score: 1320, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Cachew Erdnuss Mix', weight: 200, categoryId: 88, barcode: '4004980530102', packaging: 6, origin: 1, score: 364, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Gut & Günstig Senf süß', weight: 250, categoryId: 151, barcode: '4311596477517', packaging: 17, origin: 1, score: 590, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ja! Weizenmehl Typ 405', weight: 1000, categoryId: 83, barcode: '4388840014309', packaging: 15, origin: 1, score: 465, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'nöm PRO Kirschjoghurt', weight: 180, categoryId: 100, barcode: '9019100234308', packaging: 1, origin: 2, score: 771, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Gold Ochsen Original 0,5l', weight: 500, categoryId: 155, barcode: '4103030111015', packaging: 6, origin: 1, score: 380, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Waldquelle Himbeere', weight: 1000, categoryId: 154, barcode: '9001521001867', packaging: 10, origin: 2, score: 780, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Himbeeren', weight: 125, categoryId: 126, barcode: '8717496041685', packaging: 4, origin: 2, score: 540, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'ja! Frikadellenbällchen', weight: 500, categoryId: 15, barcode: '4388840222728', packaging: 4, origin: 1, score: 1540, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ettes - Aufstrich Aubergine', weight: 135, categoryId: 27, barcode: '4260524580020', packaging: 17, origin: 1, score: 254, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Bonduelle Goldmais', weight: 300, categoryId: 45, barcode: '3083680073608', packaging: 6, origin: 2, score: 690, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Delikatess Rotkohl', weight: 250, categoryId: 53, barcode: '4300175162333', packaging: 17, origin: 1, score: 455, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'San Lucar Cherry Tomaten', weight: 350, categoryId: 61, barcode: '8430631143845', packaging: 19, origin: 2, score: 539, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'GC Stangenspargel', weight: 1000, categoryId: 57, barcode: '4009884400650', packaging: 13, origin: 1, score: 780, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'ja! Haferflocken zart', weight: 1000, categoryId: 72, barcode: '4388844031715', packaging: 15, origin: 1, score: 485, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Dittmann Oliven Schwarz', weight: 155, categoryId: 133, barcode: '4002239420907', packaging: 17, origin: 2, score: 539, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Gilde Champignons', weight: 425, categoryId: 32, barcode: '4009418204075', packaging: 6, origin: 1, score: 1313, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Hortamira Biopaprika', weight: 500, categoryId: 46, barcode: '4327475060695', packaging: 1, origin: 1, score: 565, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Alnatura Bio Blattspinat', weight: 450, categoryId: 58, barcode: '4104420112148', packaging: 13, origin: 1, score: 483, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Libbys Ananas', weight: 350, categoryId: 111, barcode: '7612500001239', packaging: 6, origin: 2, score: 928, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Ackergold Kartoffeln', weight: 1500, categoryId: 40, barcode: '4311527648696', packaging: 14, origin: 1, score: 710, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Hohes C O-Saft', weight: 1000, categoryId: 154, barcode: '4001497651306', packaging: 5, origin: 1, score: 695, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'Diamant Puderzucker', weight: 250, categoryId: 147, barcode: '4008381178000', packaging: 16, origin: 1, score: 292, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'ja! Speisequark', weight: 500, categoryId: 106, barcode: '4388840216826', packaging: 4, origin: 1, score: 1990, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },
    { name: 'G&G Vollkorntoast', weight: 500, categoryId: 80, barcode: '4311596476268', packaging: 1, origin: 1, score: 475, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 1 },

    { name: 'Jens & Vincents Brotaufstrich', weight: 500, categoryId: 80, barcode: '4311596476200', packaging: 1, origin: 1, score: 475, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 0 },
    { name: 'Max & Moritz Kekse', weight: 500, categoryId: 80, barcode: '4311534576268', packaging: 1, origin: 1, score: 475, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date(), approved: 0 }

  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
