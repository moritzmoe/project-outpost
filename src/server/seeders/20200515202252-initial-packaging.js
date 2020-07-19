module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Packagings', [
    { name: 'Einfach verpackt, Plastik', co2: 195, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Mehrfach verpackt, Plastik', co2: 255, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Plastiktüte', co2: 210, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Plastikschachtel (Einweg)', co2: 240, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Plastikschachtel (Mehrweg)', co2: 105, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Metalldose', co2: 180, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Glasflasche', co2: 135, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Glasflasche (Pfandsystem)', co2: 15, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Plastikfalsche', co2: 225, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Plastikfalsche (Einweg-Pfandsystem)', co2: 90, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Plastikfalsche (Mehrweg-Pfandsystem)', co2: 30, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Tetrapak', co2: 45, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Papierschachtel (Karton)', co2: 150, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Papiertüte', co2: 60, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Einfach verpackt, Papier/Pappe', co2: 75, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Mehrfach verpackt, Papier/Pappe', co2: 120, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Einmachglas', co2: 165, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Unverpackt', co2: 0, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Sonstige Verpackung', co2: 120, createdAt: new Date(), updatedAt: new Date() },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Packagings', null, {})
};
