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
      .query(
        `select * from customer c
      join order o on c.customer_id = o.customer_id
      where c.customer_id = ${customerID}`
      )
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

  getMeterPrice: (req, res) => {
    const { pn } = req.params;
    sequelize
      .query(
        `select meter_price, meter_name from meter 
    where part_number = '${pn}'`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },
};
