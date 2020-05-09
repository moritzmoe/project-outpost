// const PackType = require('../models/packType');
// const PackMat = require('../models/packMat');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

console.log('Searching for initial Categories');
Category.findOne({
  where: {
    name: 'Backwaren'
  }
}).then((result) => {
  if (!result) {
    const categories = [
      { name: 'Backwaren' },
      { name: 'Obst' },
      { name: 'Gemüse' },
      { name: 'Fleisch und Fisch' },
      { name: 'Teigwaren' },
      { name: 'Milchprodukte' },
      { name: 'Getränke' },
      { name: 'Sonstiges' }
    ];
    Category.bulkCreate(categories, { validate: true })
      .then(() => {
        console.log('Initial categories created');
        console.log('Now creating initial subcategories');

        Category.findOne({
          where: {
            name: 'Backwaren'
          }
        }).then((backwaren) => {
          if (backwaren) {
            const backwarenCategories = [
              { parentCat: backwaren.id, name: 'Brot' },
              { parentCat: backwaren.id, name: 'Brötchen' },
              { parentCat: backwaren.id, name: 'Kuchen' },
              { parentCat: backwaren.id, name: 'Süße Stückchen' },
              { parentCat: backwaren.id, name: 'Pikante Backwaren' },
              { parentCat: backwaren.id, name: 'Sonstige Backwaren' },
            ];
            SubCategory.bulkCreate(backwarenCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Backwaren" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Backwaren".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Backwaren" not found!');
          }
        });

        // Obst
        Category.findOne({
          where: {
            name: 'Obst'
          }
        }).then((obst) => {
          if (obst) {
            const obstCategories = [
              { parentCat: obst.id, name: 'frisches, rohes Obst' },
              { parentCat: obst.id, name: 'Apfelmus, Konfitüre' },
              { parentCat: obst.id, name: 'Trockenobst' }
            ];
            SubCategory.bulkCreate(obstCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Obst" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Obst".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Obst" not found!');
          }
        });


        // Gemüse
        Category.findOne({
          where: {
            name: 'Gemüse'
          }
        }).then((gemuese) => {
          if (gemuese) {
            const gemueseCategories = [
              { parentCat: gemuese.id, name: 'Gemüse (roh)' },
              { parentCat: gemuese.id, name: 'Gemüseerzeugnisse' }
            ];
            SubCategory.bulkCreate(gemueseCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Gemüse" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Gemüse".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Gemüse" not found!');
          }
        });

        // Fleisch und Fisch
        Category.findOne({
          where: {
            name: 'Fleisch und Fisch'
          }
        }).then((fleisch) => {
          if (fleisch) {
            const fleischCategories = [
              { parentCat: fleisch.id, name: 'Fleisch' },
              { parentCat: fleisch.id, name: 'Fleischerzeugnisse und Wurstwaren' },
              { parentCat: fleisch.id, name: 'Fisch' },
              { parentCat: fleisch.id, name: 'Fischerzeugnisse' },
              { parentCat: fleisch.id, name: 'Krusten- und Schalentiere' },
            ];
            SubCategory.bulkCreate(fleischCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Fleisch und Fisch" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Fleisch und Fisch".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Fleisch und Fisch" not found!');
          }
        });

        // Milchprodukte
        Category.findOne({
          where: {
            name: 'Milchprodukte'
          }
        }).then((fleisch) => {
          if (fleisch) {
            const milchCategories = [
              { parentCat: fleisch.id, name: 'Milch/-mischgetränke' },
              { parentCat: fleisch.id, name: 'Milcherzeugnisse' },
              { parentCat: fleisch.id, name: 'Käse' },
              { parentCat: fleisch.id, name: 'Butter' }
            ];
            SubCategory.bulkCreate(milchCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Milchprodukte" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Milchprodukte".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Milchprodukte" not found!');
          }
        });

        // Teigwaren
        Category.findOne({
          where: {
            name: 'Teigwaren'
          }
        }).then((teigwaren) => {
          if (teigwaren) {
            const teigwarenCategories = [
              { parentCat: teigwaren.id, name: 'Nudeln' },
              { parentCat: teigwaren.id, name: 'Nudelgerichte' },
              { parentCat: teigwaren.id, name: 'Sonstige Teigwaren' }
            ];
            SubCategory.bulkCreate(teigwarenCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Teigwaren" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Teigwaren".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Teigwaren" not found!');
          }
        });

        // Sonstiges
        Category.findOne({
          where: {
            name: 'Sonstiges'
          }
        }).then((sonstiges) => {
          if (sonstiges) {
            const sonstigesCategories = [
              { parentCat: sonstiges.id, name: 'Eier' },
              { parentCat: sonstiges.id, name: 'Getreide/-erzeugnisse' },
              { parentCat: sonstiges.id, name: 'Hülsenfrüchte' },
              { parentCat: sonstiges.id, name: 'Nüsse' },
              { parentCat: sonstiges.id, name: 'Öle und Fette' },
              { parentCat: sonstiges.id, name: 'Müsli' },
              { parentCat: sonstiges.id, name: 'Cornflakes' },
              { parentCat: sonstiges.id, name: 'Soßen' },
              { parentCat: sonstiges.id, name: 'Salz und Pfeffer' },
              { parentCat: sonstiges.id, name: 'Süßwaren' },
              { parentCat: sonstiges.id, name: 'Knabberartikel' },
              { parentCat: sonstiges.id, name: 'Sojaerzeugnisse' },
              { parentCat: sonstiges.id, name: 'Sonstiges' },
            ];
            SubCategory.bulkCreate(sonstigesCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Sonstiges" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Sonstiges".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Sonstiges" not found!');
          }
        });

        Category.findOne({
          where: {
            name: 'Getränke'
          }
        }).then((getraenke) => {
          if (getraenke) {
            const getraenkeCategories = [
              { parentCat: getraenke.id, name: 'Tee' },
              { parentCat: getraenke.id, name: 'Kaffee' },
              { parentCat: getraenke.id, name: 'Wasser' },
              { parentCat: getraenke.id, name: 'Saft' },
              { parentCat: getraenke.id, name: 'Alkoholische Getränke' }

            ];
            SubCategory.bulkCreate(getraenkeCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Getränke" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Getränke".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Getränke" not found!');
          }
        });
      });
  } else {
    console.log('Initial Categories found');
  }
});

/*
console.log('Searching for initial Packaging Types');
PackType.findOne({
  where: {
    name: 'Flasche'
  }
}).then((result) => {
  if (!result) {
    const packTypes = [
      { name: 'Tüte' },
      { name: 'Flasche' },
      { name: 'Flasche (Pfandsystem)' },
      { name: 'Dose' },
      { name: 'Netz' },
      { name: 'Schachtel' },
      { name: 'Einfach verpackt' },
      { name: 'Mehrfach verpackt' },
      { name: 'Sonstige' },
    ];
    PackType.bulkCreate(packTypes, { validate: true }).then(() => {
      console.log('Initial Packaging Types created.');
    }).catch((err) => {
      console.log('Failed to create initial Packaging Types.');
      console.log(err);
    });
  } else {
    console.log('Initial Packaging Types found');
  }
});

console.log('Searching for initial Packaging Materials');
PackMat.findOne({
  where: {
    name: 'Plastik'
  }
}).then((result) => {
  if (!result) {
    const packMats = [
      { name: 'Plastik' },
      { name: 'Papier/Pappe' },
      { name: 'Metall' },
      { name: 'Glas' }
    ];
    PackMat.bulkCreate(packMats, { validate: true }).then(() => {
      console.log('Initial Packaging Materials created.');
    }).catch((err) => {
      console.log('Failed to create initial Packaging Materials.');
      console.log(err);
    });
  } else {
    console.log('Initial Packaging Materials found.');
  }
});

*/
