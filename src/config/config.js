module.exports = {
  "development": {
    "database": "copper_bites",
    "dialect": "sqlite",
    "storage": "./copper_bites.sqlite"
  },
  "test": {
    "database": "copper_bites_test",
    "dialect": "sqlite"
  },
  "production": {
    "database": "copper_bites_production",
    "dialect": "sqlite"
  }
}
