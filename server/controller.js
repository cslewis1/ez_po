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
      join customer_order o on c.customer_id = o.customer_id
      join meter m on m.meter_id = o.meter_id`)
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
        `select meter_price, meter_name, meter_id from meter 
    where part_number = '${pn}'`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },

  inputOrder: (req, res) => {
    const {
      customerID,
      poNumber,
      date,
      quantity,
      meterSize,
      config,
      total,
      discount,
    } = req.body;

    sequelize
      .query(`insert into customer_order (customer_id, order_number, order_date, meter_qty, meter_id, config, order_total, discounted_total)
    values(${customerID}, '${poNumber}', '${date}', ${quantity}, ${meterSize}, '${config}', ${total}, ${discount})
    returning *`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
