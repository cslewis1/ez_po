require("dotenv").config();

const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//Create the customer, orders, and meters tables.
module.exports = {
  seed: (req, res) => {
    sequelize.query(`
    drop table if exists customer_order;
    drop table if exists configuration;
    drop table if exists meter;
    drop table if exists customer;

        create table customer (
            customer_id serial primary key,
            customer_name varchar(100),            
            email varchar(100),
            address varchar(100), 
            city varchar(100), 
            state varchar(2), 
            zip_code integer,            
            phone_number varchar(15),
            pricing_tier varchar(50),
            password varchar(100)
        );

        create table meter(
            meter_id serial primary key,
            part_number varchar(10),
            meter_name varchar (100),
            meter_price decimal(20, 2),
            meter_image varchar(100)
        );

        create table configuration(
            config_id serial primary key,
            config_code varchar(10),
            config_option varchar(50)
        );
        
        create table customer_order (
            order_id serial primary key,
            customer_id integer references customer(customer_id),
            order_number varchar(100),            
            order_date date,
            meter_qty integer,
            meter_id integer references meter(meter_id),
            config varchar(10),
            order_total decimal(20, 2),
            discounted_total decimal(20, 2)
        );
        
        insert into customer (customer_name, email, address, city, state, zip_code, phone_number, pricing_tier, password)
        values 
        ('Secure Water', 'info@securewater.net', '1111 Secure Rd', 'Atlanta', 'GA', 30349, '(404)123-2222', 'elite-50%', 'secure1!'),
        ('Dakota Water Supply', 'contact@dws.com','222 Dakota Way', 'Hillsboro', 'OR', 97006, '(503)401-0539', 'premium-35%', 'dakota2@'),
        ('Water Resource', 'wrc@gmail.com', '3333 Water Blvd', 'Pleasant Grove', 'AL', 35127, '(205)235-1478', 'associate-25%', 'water3#');

        insert into meter(part_number, meter_name, meter_price, meter_image) 
        values 
        ('58C', '5/8in Composite', 250.00, 'images/58C.jpeg'),
        ('34C', '3/4in Composite', 500.00, 'images/34C.jpeg'),
        ('58B', '5/8in Brass', 450.00, 'images/58brass.jpeg'),
        ('100B','1in Brass', 700.00, 'images/1inBR.jpeg'),        
        ('100SS', '1in Stainless Steel', 650.00, 'images/1inSS.jpeg'), 
        ('200SS', '2in Stainless Steel', 800.00, 'images/2inSS.png'), 
        ('400SS', '4in Stainless Steel', 1500.00, 'images/4inSS.jpeg'),
        ('600SS', '6in Stainless Steel', 1800.00, 'images/6inSS.jpeg'),
        ('120SS', '12in Stainless Steel', 2100.00, 'images/12inSS.jpeg');

        insert into configuration (config_code, config_option) 
        values 
        ('CT', 'Central Time Zone'),
        ('ET', 'Eastern Time Zone'),
        ('MT', 'Mountain Time Zone'),
        ('PT', 'Pacific Time Zone'),
        ('LD', 'Leak Detection'),
        ('EC', 'Encoded'),
        ('RD', 'Radio'),
        ('101', '0.000 Gallon Display'),
        ('240', '00.00 Gallon Display'),
        ('320', '0000 Gallon Display');

        insert into customer_order(customer_id, order_number, order_date, meter_qty, meter_id, config, order_total, discounted_total)
         values 
         (1, '1234W', '2023-05-04', 500, 1, 'LD320ET', 225000.00, 112500.00), 
         (1, '1234W', '2023-05-04', 5, 2, 'RD101ET', 3500.00, 1750.00),
         (2, '1235W', '2023-04-26', 20, 4, 'EC240CT', 10000.00, 6500.00);         
        `).then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
