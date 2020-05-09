const Packaging = require('../models/packaging');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const Origin = require('../models/origin');

console.log('Searching for initial Categories');
Category.findOne({
  where: {
    name: 'Fisch, Meerestiere'
  }
}).then((result) => {
  if (!result) {
    const categories = [
      { name: 'Fette, Öle' },
      { name: 'Fisch, Meerestiere' },
      { name: 'Fleisch, Geflügel, Eier' },
      { name: 'Gemüse, Pilze' },
      { name: 'Getreideprodukte' },
      { name: 'Hülsenfrüchte, Samen, Nüsse' },
      { name: 'Milch und Milchprodukte' },
      { name: 'Obst' },
      { name: 'Sonstiges, Gewürze, Fertiggerichte' },
      { name: 'Getränke' }
    ];
    Category.bulkCreate(categories, { validate: true })
      .then(() => {
        console.log('Initial categories created');
        console.log('Now creating initial subcategories');

        // Fette und Öle
        Category.findOne({
          where: {
            name: 'Fette, Öle'
          }
        }).then((fette) => {
          if (fette) {
            const fetteCategories = [
              { parentCat: fette.id, name: 'Butter', co2: 9200 },
              { parentCat: fette.id, name: 'Butter & Magarine', co2: 3400 },
              { parentCat: fette.id, name: 'Halbfettmargarine', co2: 1150 },
              { parentCat: fette.id, name: 'Olivenöl', co2: 3060 },
              { parentCat: fette.id, name: 'Palmfett zum Braten', co2: 1410 },
              { parentCat: fette.id, name: 'Pflanzencreme', co2: 1970 },
              { parentCat: fette.id, name: 'Rapsöl', co2: 2710 },
              { parentCat: fette.id, name: 'Sonnenblumenöl', co2: 2240 },
              { parentCat: fette.id, name: 'Veganes Streichfett', co2: 1670 },
              { parentCat: fette.id, name: 'Vollfettmagarine', co2: 1780 },
            ];
            SubCategory.bulkCreate(fetteCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Fette, Öle" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Fette, Öle".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Fette, Öle" not found!');
          }
        });

        // Fisch, Meerestiere
        Category.findOne({
          where: {
            name: 'Fisch, Meerestiere'
          }
        }).then((fisch) => {
          if (fisch) {
            const fischCategories = [
              { parentCat: fisch.id, name: 'Fisch (frisch)', co2: 6290 },
              { parentCat: fisch.id, name: 'Fisch (gefroren)', co2: 4090 },
              { parentCat: fisch.id, name: 'Garnelen (gefroren)', co2: 12590 },
            ];
            SubCategory.bulkCreate(fischCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Fisch, Meerestiere" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Fisch, Meerestiere".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Fisch, Meerestiere" not found!');
          }
        });


        // Fleisch, Geflügel, Eier
        Category.findOne({
          where: {
            name: 'Fleisch, Geflügel, Eier'
          }
        }).then((fleisch) => {
          if (fleisch) {
            const fleischCategories = [
              { parentCat: fleisch.id, name: 'Eier', co2: 2040 },
              { parentCat: fleisch.id, name: 'Frikadellen', co2: 2580 },
              { parentCat: fleisch.id, name: 'Hackfleisch, gemischt', co2: 5590 },
              { parentCat: fleisch.id, name: 'Hamburger Patty (gefroren)', co2: 8140 },
              { parentCat: fleisch.id, name: 'Hähnchenfleisch (gefroren)', co2: 3920 },
              { parentCat: fleisch.id, name: 'Hähnchenfleisch (frisch)', co2: 3700 },
              { parentCat: fleisch.id, name: 'Lamm', co2: 7700 },
              { parentCat: fleisch.id, name: 'Putenfleisch', co2: 4220 },
              { parentCat: fleisch.id, name: 'Rindfleisch', co2: 12290 },
              { parentCat: fleisch.id, name: 'Schweinefleisch', co2: 4150 },
              { parentCat: fleisch.id, name: 'Wildfleisch', co2: 10480 },
              { parentCat: fleisch.id, name: 'Wurst', co2: 3620 },
              { parentCat: fleisch.id, name: 'Würstchen', co2: 3770 },
            ];
            SubCategory.bulkCreate(fleischCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Fleisch, Geflügel, Eier" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Fleisch, Geflügel, Eier".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Fleisch, Geflügel, Eier" not found!');
          }
        });

        // Gemüse, Pilze
        Category.findOne({
          where: {
            name: 'Gemüse, Pilze'
          }
        }).then((gemuese) => {
          if (gemuese) {
            const gemueseCategories = [
              { parentCat: gemuese.id, name: 'Aubergine', co2: 290 },
              { parentCat: gemuese.id, name: 'Blumenkohl', co2: 430 },
              { parentCat: gemuese.id, name: 'Brokkoli', co2: 560 },
              { parentCat: gemuese.id, name: 'Brokkoli (gefroren)', co2: 930 },
              { parentCat: gemuese.id, name: 'Champignon', co2: 1310 },
              { parentCat: gemuese.id, name: 'Champignons (Dose)', co2: 2550 },
              { parentCat: gemuese.id, name: 'Eisbergsalat', co2: 200 },
              { parentCat: gemuese.id, name: 'Feldsalat', co2: 270 },
              { parentCat: gemuese.id, name: 'Fenchel', co2: 240 },
              { parentCat: gemuese.id, name: 'Grünkohl (Glas)', co2: 800 },
              { parentCat: gemuese.id, name: 'Grünkohl, frisch', co2: 350 },
              { parentCat: gemuese.id, name: 'Gurke', co2: 450 },
              { parentCat: gemuese.id, name: 'Karotte/Möhre', co2: 270 },
              { parentCat: gemuese.id, name: 'Kartoffeln', co2: 400 },
              { parentCat: gemuese.id, name: 'Kirschtomaten', co2: 910 },
              { parentCat: gemuese.id, name: 'Kohlrabi', co2: 430 },
              { parentCat: gemuese.id, name: 'Kürbis', co2: 210 },
              { parentCat: gemuese.id, name: 'Lauch', co2: 210 },
              { parentCat: gemuese.id, name: 'Mais (Dose)', co2: 1200 },
              { parentCat: gemuese.id, name: 'Paprika', co2: 640 },
              { parentCat: gemuese.id, name: 'Rettich', co2: 230 },
              { parentCat: gemuese.id, name: 'Rosenkohl, frisch', co2: 280 },
              { parentCat: gemuese.id, name: 'Rosenkohl, gefroren', co2: 590 },
              { parentCat: gemuese.id, name: 'Rote Beete (Glas)', co2: 1360 },
              { parentCat: gemuese.id, name: 'Rote Beete, frisch', co2: 320 },
              { parentCat: gemuese.id, name: 'Rotkohl (frisch)', co2: 420 },
              { parentCat: gemuese.id, name: 'Rotkohl (Glas)', co2: 960 },
              { parentCat: gemuese.id, name: 'Rucola', co2: 270 },
              { parentCat: gemuese.id, name: 'Salatmischung, gewaschen', co2: 280 },
              { parentCat: gemuese.id, name: 'Sellerie', co2: 330 },
              { parentCat: gemuese.id, name: 'Spargel', co2: 580 },
              { parentCat: gemuese.id, name: 'Spinat (gefroren)', co2: 630 },
              { parentCat: gemuese.id, name: 'Spinat, frisch', co2: 290 },
              { parentCat: gemuese.id, name: 'Süßkartoffel', co2: 410 },
              { parentCat: gemuese.id, name: 'Tomate', co2: 770 },
              { parentCat: gemuese.id, name: 'Tomate (Dose)', co2: 1870 },
              { parentCat: gemuese.id, name: 'Tomate (Gewächshaus)', co2: 2920 },
              { parentCat: gemuese.id, name: 'Weißkohl', co2: 400 },
              { parentCat: gemuese.id, name: 'Wirsing', co2: 300 },
              { parentCat: gemuese.id, name: 'Zucchini', co2: 250 },
              { parentCat: gemuese.id, name: 'Zwiebeln', co2: 250 },
            ];
            SubCategory.bulkCreate(gemueseCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Gemüse, Pilze" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Gemüse, Pilze".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Gemüse, Pilze" not found!');
          }
        });

        // Getreideprodukte
        Category.findOne({
          where: {
            name: 'Getreideprodukte'
          }
        }).then((getreide) => {
          if (getreide) {
            const getreideCategories = [
              { parentCat: getreide.id, name: 'Brötchen, Vollkorn', co2: 600 },
              { parentCat: getreide.id, name: 'Brötchen, Weißmehl', co2: 620 },
              { parentCat: getreide.id, name: 'Bulgur', co2: 520 },
              { parentCat: getreide.id, name: 'Couscous', co2: 440 },
              { parentCat: getreide.id, name: 'Haferflocken', co2: 360 },
              { parentCat: getreide.id, name: 'Hirse', co2: 520 },
              { parentCat: getreide.id, name: 'Knäckebrot', co2: 530 },
              { parentCat: getreide.id, name: 'Nudeln', co2: 460 },
              { parentCat: getreide.id, name: 'Nudeln, Vollkorn', co2: 440 },
              { parentCat: getreide.id, name: 'Quinoa', co2: 650 },
              { parentCat: getreide.id, name: 'Reis', co2: 3050 },
              { parentCat: getreide.id, name: 'Toast', co2: 480 },
              { parentCat: getreide.id, name: 'Toast, Vollkorn', co2: 460 },
              { parentCat: getreide.id, name: 'Vollkornbrot', co2: 590 },
              { parentCat: getreide.id, name: 'Weißbrot', co2: 610 },
              { parentCat: getreide.id, name: 'Weizenmehl', co2: 340 }
            ];
            SubCategory.bulkCreate(getreideCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Getreideprodukte" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Getreideprodukte".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Getreideprodukte" not found!');
          }
        });

        // Hülsenfrüchte, Samen, Nüsse
        Category.findOne({
          where: {
            name: 'Hülsenfrüchte, Samen, Nüsse'
          }
        }).then((nuesse) => {
          if (nuesse) {
            const nuesseCategories = [
              { parentCat: nuesse.id, name: 'Bohnen', co2: 740 },
              { parentCat: nuesse.id, name: 'Bohnen (Dose)', co2: 1210 },
              { parentCat: nuesse.id, name: 'Erbsen, grün', co2: 780 },
              { parentCat: nuesse.id, name: 'Erbsen, grün (Dose)', co2: 1240 },
              { parentCat: nuesse.id, name: 'Erdnüsse, ganz', co2: 670 },
              { parentCat: nuesse.id, name: 'Kichererbsen (Dose)', co2: 1250 },
              { parentCat: nuesse.id, name: 'Leinsamen', co2: 1160 },
              { parentCat: nuesse.id, name: 'Linsen (Dose)', co2: 1460 },
              { parentCat: nuesse.id, name: 'Linsen, getrocknet', co2: 610 },
              { parentCat: nuesse.id, name: 'Tofu', co2: 1660 },
              { parentCat: nuesse.id, name: 'Walnüsse, ganz', co2: 950 },
            ];
            SubCategory.bulkCreate(nuesseCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Hülsenfrüchte, Samen, Nüsse" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Hülsenfrüchte, Samen, Nüsse".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Hülsenfrüchte, Samen, Nüsse" not found!');
          }
        });

        // Milch und Milchprodukte
        Category.findOne({
          where: {
            name: 'Milch und Milchprodukte'
          }
        }).then((milch) => {
          if (milch) {
            const nuesseCategories = [
              { parentCat: milch.id, name: 'Buttermilch', co2: 1160 },
              { parentCat: milch.id, name: 'Creme Fraiche', co2: 4190 },
              { parentCat: milch.id, name: 'Fetakäse', co2: 6470 },
              { parentCat: milch.id, name: 'Frischkäse', co2: 5650 },
              { parentCat: milch.id, name: 'H-Milch', co2: 1380 },
              { parentCat: milch.id, name: 'Joghurt', co2: 2370 },
              { parentCat: milch.id, name: 'Kochcreme', co2: 880 },
              { parentCat: milch.id, name: 'Käse', co2: 5820 },
              { parentCat: milch.id, name: 'Magerquark', co2: 2520 },
              { parentCat: milch.id, name: 'Milch', co2: 1440 },
              { parentCat: milch.id, name: 'Mozzarella', co2: 4340 },
              { parentCat: milch.id, name: 'Quark', co2: 3400 },
              { parentCat: milch.id, name: 'Sahne', co2: 4310 },
              { parentCat: milch.id, name: 'Sahne Alternative', co2: 1030 },
              { parentCat: milch.id, name: 'Saure Sahne', co2: 3050 },
              { parentCat: milch.id, name: 'Schmand', co2: 3660 }
            ];
            SubCategory.bulkCreate(nuesseCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Milch und Milchprodukte" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Milch und Milchprodukte".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Milch und Milchprodukte" not found!');
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
              { parentCat: obst.id, name: 'Ananas (Dose)', co2: 1710 },
              { parentCat: obst.id, name: 'Ananas, frisch', co2: 740 },
              { parentCat: obst.id, name: 'Apfel', co2: 250 },
              { parentCat: obst.id, name: 'Aprikosen (Dose)', co2: 1700 },
              { parentCat: obst.id, name: 'Aprikosen, frisch', co2: 540 },
              { parentCat: obst.id, name: 'Avocado', co2: 510 },
              { parentCat: obst.id, name: 'Banane', co2: 570 },
              { parentCat: obst.id, name: 'Birne', co2: 290 },
              { parentCat: obst.id, name: 'Brombeeren', co2: 690 },
              { parentCat: obst.id, name: 'Erdbeeren (gefroren)', co2: 710 },
              { parentCat: obst.id, name: 'Erdbeeren, frisch', co2: 320 },
              { parentCat: obst.id, name: 'Feigen', co2: 890 },
              { parentCat: obst.id, name: 'Granatapfel', co2: 390 },
              { parentCat: obst.id, name: 'Heidelbeeren (gefroren)', co2: 640 },
              { parentCat: obst.id, name: 'Heidelbeerein, frisch', co2: 540 },
              { parentCat: obst.id, name: 'Himbeeren, frisch', co2: 1200 },
              { parentCat: obst.id, name: 'Himbeeren, gefroren', co2: 660 },
              { parentCat: obst.id, name: 'Kirschen', co2: 220 },
              { parentCat: obst.id, name: 'Kiwi', co2: 660 },
              { parentCat: obst.id, name: 'Mango', co2: 1730 },
              { parentCat: obst.id, name: 'Maracuja/Passionsfrucht', co2: 2300 },
              { parentCat: obst.id, name: 'Nektarine', co2: 320 },
              { parentCat: obst.id, name: 'Oliven', co2: 1450 },
              { parentCat: obst.id, name: 'Orange/Apfelsine', co2: 350 },
              { parentCat: obst.id, name: 'Pfirsich', co2: 320 },
              { parentCat: obst.id, name: 'Pfirsich (Dose)', co2: 1520 },
              { parentCat: obst.id, name: 'Pflaume', co2: 220 },
              { parentCat: obst.id, name: 'Rosinen', co2: 930 },
              { parentCat: obst.id, name: 'Stachelbeeren', co2: 690 },
              { parentCat: obst.id, name: 'Wassermelone', co2: 350 },
              { parentCat: obst.id, name: 'Weintrauben', co2: 370 },
              { parentCat: obst.id, name: 'Zitrone', co2: 360 },
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


        // Sonstiges, Gewürze, Fertiggerichte
        Category.findOne({
          where: {
            name: 'Sonstiges, Gewürze, Fertiggerichte'
          }
        }).then((sonstiges) => {
          if (sonstiges) {
            const sonstigesCategories = [
              { parentCat: sonstiges.id, name: 'Gemüsebrühe', co2: 1490 },
              { parentCat: sonstiges.id, name: 'Honig', co2: 1920 },
              { parentCat: sonstiges.id, name: 'Hühnerbrühe', co2: 1510 },
              { parentCat: sonstiges.id, name: 'Kokosmilch', co2: 540 },
              { parentCat: sonstiges.id, name: 'Puderzucker', co2: 490 },
              { parentCat: sonstiges.id, name: 'Rinderbrühe', co2: 1790 },
              { parentCat: sonstiges.id, name: 'SojaDrink', co2: 670 },
              { parentCat: sonstiges.id, name: 'Zucker', co2: 600 },
              { parentCat: sonstiges.id, name: 'Sonstiges Nahrungmittel', co2: 1500 },
            ];
            SubCategory.bulkCreate(sonstigesCategories, { validate: true }).then(() => {
              console.log('Initial SubCategories for "Sonstiges, Gewürze, Fertiggerichte" created.');
            }).catch((err) => {
              console.log('Failed to create initial SubCategories for "Sonstiges, Gewürze, Fertiggerichte".');
              console.log(err);
            });
          } else {
            console.log('Parent Category "Sonstiges, Gewürze, Fertiggerichte" not found!');
          }
        });

        Category.findOne({
          where: {
            name: 'Getränke'
          }
        }).then((getraenke) => {
          if (getraenke) {
            const getraenkeCategories = [
              { parentCat: getraenke.id, name: 'Kaffee', co2: 600 },
              { parentCat: getraenke.id, name: 'Wasser', co2: 200 },
              { parentCat: getraenke.id, name: 'Saft', co2: 540 },
              { parentCat: getraenke.id, name: 'Alkoholische Getränke', co2: 300 },
              { parentCat: getraenke.id, name: 'Sonstige Getränke', co2: 410 }
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

console.log('Searching for initial Packaging Types');
Packaging.findOne({
  where: {
    name: 'Glasflasche'
  }
}).then((result) => {
  if (!result) {
    const packaging = [
      { name: 'Einfach verpackt, Plastik', co2: 195 },
      { name: 'Mehrfach verpackt, Plastik', co2: 255 },
      { name: 'Plastiktüte', co2: 210 },
      { name: 'Plastikschachtel (Einweg)', co2: 240 },
      { name: 'Plastikschachtel (Mehrweg)', co2: 105 },
      { name: 'Metalldose', co2: 180 },
      { name: 'Glasflasche', co2: 135 },
      { name: 'Glasflasche (Pfandsystem)', co2: 15 },
      { name: 'Plastikfalsche', co2: 225 },
      { name: 'Plastikfalsche (Einweg-Pfandsystem)', co2: 90 },
      { name: 'Plastikfalsche (Mehrweg-Pfandsystem)', co2: 30 },
      { name: 'Tetrapak', co2: 45 },
      { name: 'Papierschachtel (Karton)', co2: 150 },
      { name: 'Papiertüte', co2: 60 },
      { name: 'Einfach verpackt, Papier/Pappe', co2: 75 },
      { name: 'Mehrfach verpackt, Papier/Pappe', co2: 120 },
      { name: 'Einmachglas', co2: 165 },
      { name: 'Unverpackt', co2: 0 },
      { name: 'Sonstige Verpackung', co2: 120 },
    ];
    Packaging.bulkCreate(packaging, { validate: true }).then(() => {
      console.log('Initial Packaging created.');
    }).catch((err) => {
      console.log('Failed to create initial Packaging.');
      console.log(err);
    });
  } else {
    console.log('Initial Packaging found');
  }
});

console.log('Searching for initial Origins');
Origin.findOne({
  where: {
    name: 'Deutschland'
  }
}).then((result) => {
  if (!result) {
    const origins = [
      { name: 'Deutschland', co2: 50 },
      { name: 'Europa', co2: 150 },
      { name: 'Welt', co2: 250 }
    ];
    Origin.bulkCreate(origins, { validate: true }).then(() => {
      console.log('Initial Origins created.');
    }).catch((err) => {
      console.log('Failed to create initial Origins.');
      console.log(err);
    });
  } else {
    console.log('Initial Origins found');
  }
});
