require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getAllMeters: (req, res) => {
    sequelize
      .query(`select * from meter`)
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },

  getAllOrders: (req, res) => {
    sequelize
      .query(`select * from order`)
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },

  getAllConfigs: (req, res) => {
    sequelize
    .query(`select * from configuration`)
      .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
  },
  
  getOrderOptions: (req, res) => {
    sequelize
      .query(`SELECT * from meter, configuration`)
      .then((dbRes) => {
        console.log(dbRes)
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  }
};
