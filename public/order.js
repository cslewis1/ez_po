const errCallback = (err) => console.log(err.response.data);

const form = document.querySelector("#order-form");
const customerID = document.querySelector("#customer_id");
const poNumber = document.querySelector("#po_number");
const qty = document.querySelector("#quantity");

const meterSelect = document.querySelector("#meterSelect");
const meterType = document.querySelector("#meterType");
const display = document.querySelector("#display");
const timeZone = document.querySelector("#timeZone");

const purchaseOrder = document.querySelector(".purchase-order");

let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let date = `${cYear - cMonth - cDay}`;

const getAllConfigs = () => {
  axios
    .get("http://localhost:4000/configuration")
    .then((res) => {
      const configs = res.data;
      console.log(configs);
      for (let i = 0; i < configs.length; i++) {
        if (i > 3 && i < 7) {
          const option = document.createElement("option");
          option.setAttribute("value", configs[i].config_code);
          option.textContent = configs[i].config_option;
          meterType.appendChild(option);
        } else if (i >= 7 && i <= configs.length) {
          const option2 = document.createElement("option");
          option2.setAttribute("value", configs[i].config_code);
          option2.textContent = configs[i].config_option;
          display.appendChild(option2);
        } else {
          const option3 = document.createElement("option");
          option3.setAttribute("value", configs[i].config_code);
          option3.textContent = configs[i].config_option;
          timeZone.appendChild(option3);
        }
      }
    })
    .catch(errCallback);
};

const createMeterOptions = (meters) => {
  meters.forEach((meter) => {
    const option = document.createElement("option");
    option.setAttribute("value", meter.part_number);
    option.textContent = meter.meter_name;
    meterSelect.appendChild(option);
  });
};

const getOrderLines = () => {
    const orderLines = []

}

getAllConfigs();
const allMeters = getAllMeters()
