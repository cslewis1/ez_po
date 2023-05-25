const form = document.querySelector("#order-form");
const customerID = document.querySelector("#customer_id");
const poNumber = document.querySelector("#po_number");
const qty = document.querySelector("#quantity");

const meterSize = document.querySelector("#meterSize");
const meterType = document.querySelector("#meterType");
const display = document.querySelector("#display");
const timeZone = document.querySelector("#timeZone");

const purchaseOrder = document.querySelector("#purchase-order");
const saveButton = document.querySelector("#save");

let totalSpan = document.querySelector("#totalSpan");
let subTotalSpan = document.querySelector("subTotalSpan");

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
    .catch((err) => console.log(err));
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
let orderTotal = []

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
  let total = meterPrice.data[0].meter_price * +lineObj.quantity;
  let discountedTotal;
  console.log(+lineObj.customerID)

  +lineObj.customerID === 1
    ? (discountedTotal = total * 0.5)
    : +lineObj.customerID === 2
    ? (discountedTotal = total * 0.65)
      : (discountedTotal = total * 0.75);
  
  
  orderTotal.push(Number(discountedTotal).toFixed(2))
  let completeTotal = orderTotal.reduce((a, price) => a + price,0)

  let poTotal = document.querySelector('#poTotal')
 
  poTotal.innerHTML = `${completeTotal}`
  
  
const addAddress = document.querySelector('#addAddress')
  if (+lineObj.customerID === 1) {
    addAddress.innerHTML = `Secure Water <br>
    111 Secure Rd, Atlanta GA 30349<br>
    Phone: (404)123-2222 <br>
    Email: info@securewater.net
    `
  } else if (+lineObj.customerID === 1) {
    addAddress.innerHTML = `Dakota Water Supply <br>
    222 Dakota Way, Hillsboro, OR 97006<br>
    Phone: (503)401-0539 <br>
    Email: info@securewater.net
    `    
  } else {
    addAddress.innerText = `Water Resource <br>
    333 Water Blvd, Pleasant Grove, AL 35127<br>
    Phone: (205)-235-1478 <br>
    Email: info@securewater.net
    ` 
  }
  
  //Create the order lines on the order page after the user configures a meter
  const addLine = document.createElement("section");
  addLine.classList.add("lineObj");
  addLine.innerHTML = `
        <section class=orderLineSection>
        <div class="line">${date}</div>
        <div class="line">${lineObj.customerID}</div>
        <div class="line">${lineObj.poNumber}</div>        
        <div class="line">${lineObj.quantity}</div>
        <div class="line">${lineObj.meterSize} - ${
    meterPrice.data[0].meter_name
  }</div>
        <div class="line">${lineObj.meterType}${lineObj.display}${
    lineObj.timeZone
  }</div>
        <div class="line">$${meterPrice.data[0].meter_price}</div>
        <div class="line">$${Number(total).toFixed(2)}</div>
        <div class="line">$${Number(discountedTotal).toFixed(2)}</div>
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
    meterSize: meterPrice.data[0].meter_id,
    config: meterType.value + display.value + timeZone.value,
    total: Number(total).toFixed(2),
    discount: Number(discountedTotal).toFixed(2),
  };

  //Add the order line objects to an array to be used to push to the orders database
  inputOrder(orders);
  orderLines.push(orders);
  console.log(orderLines);
  
};

//Add the entered order line to the database
const inputOrder = (body) => {
  axios
    .post(`http://localhost:4000/order/`, body)
    .then((res) => console.log(1, res))
    .catch((err) => console.log(err.response.data));
};

//Delete the order line
function deleteItem(e) {
  console.log("Button element", e);
  e.parentElement.remove();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayOrderLines();
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  alert('You Order PO has been received')

  window.open("completedOrder.html", "Order", "popup");
});

getAllConfigs();
getAllCustomers();
