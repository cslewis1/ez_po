const form = document.querySelector("#order-form");
const customerID = document.querySelector("#customer_id");
const poNumber = document.querySelector("#po_number");
const qty = document.querySelector("#quantity");

const meterSize = document.querySelector("#meterSize");
const meterType = document.querySelector("#meterType");
const display = document.querySelector("#display");
const timeZone = document.querySelector("#timeZone");

const purchaseOrder = document.querySelector("#purchase-order");

//Get the date to store on the purchase order
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let date = `${cYear}-${cMonth}-${cDay}`;

//Get all of the configurations and create the form options for each select imput on the order page.
const getAllConfigs = () => {
  axios
    .get("http://localhost:4000/configuration")
    .then((res) => {
      const configs = res.data;
      
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
    .catch((err) => console.log(err.response.data));
};

const createMeterOptions = (meters) => {
  meters.forEach((meter) => {
    const option = document.createElement("option");
    option.setAttribute("value", meter.part_number);
    option.textContent = meter.meter_name;
    meterSize.appendChild(option);
  });
};

//Array to hold the lineObj to post to the database
const orderLines = [];

//Function to get the price of the meter chosen on each order line
displayOrderLines = async () => {
  let meterPrice = await axios.get(
    `http://localhost:4000/price/${meterSize.value}`
  );
  console.log(meterPrice.data[0].meter_price);

  let lineObj = {
    customerID: customerID.value,
    poNumber: poNumber.value,
    quantity: qty.value,
    meterSize: meterSize.value,
    meterType: meterType.value,
    display: display.value,
    timeZone: timeZone.value,
    total: meterPrice.data[0].meter_price,
  };

  //Calculate the total and discounted price of each order line based on the customer's tier discount
  //Elite(50%), Premium(35%), Associate(25%)
  let total = +meterPrice.data[0].meter_price * +lineObj.quantity;
  let discountedTotal;

  +lineObj.customerID === 1
    ? (discountedTotal = total * 0.5)
    : +lineObj.customerID === 2
    ? (discountedTotal = total * 0.65)
    : (discountedTotal = total * 0.75);

  
  //Create the order lines on the order page after the user configures a meter
  const addLine = document.createElement("section");
  addLine.classList.add("lineObj");
  addLine.innerHTML = `
        <section class=orderLineSection>
        <div class="line">${date}</div>
        <div class="line">${lineObj.customerID}</div>
        <div class="line">${lineObj.poNumber}</div>        
        <div class="line">${lineObj.quantity}</div>
        <div class="line">${lineObj.meterSize} - ${meterPrice.data[0].meter_name}</div>
        <div class="line">${lineObj.meterType}${lineObj.display}${lineObj.timeZone}</div>
        <div class="line">$${meterPrice.data[0].meter_price}</div>
        <div class="line">$${total}</div>
        <div class="line">$${discountedTotal}</div>
        <button onclick="deleteItem(this)">X</button>
        </section>
        <div class="line-break"><div>
        `;
  purchaseOrder.appendChild(addLine);

  let orders = {
    customerID: customerID.value,
    poNumber: poNumber.value,
    date: date,
    quantity: qty.value,
    meterSize: meterSize.value,
    config: meterType.value + display.value + timeZone.value,
    total: total,
    discount: discountedTotal
  };
  console.log(orders)

  //Add the order line objects to an array to be used to push to the orders database
  orderLines.push(orders);
};

console.log(orderLines);

//Delete the order line
function deleteItem(e) {
  console.log("Button element", e);
  e.parentElement.remove();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayOrderLines();
});

getAllConfigs();
