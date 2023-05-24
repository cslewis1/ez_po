const form = document.querySelector("#order-form");
const customerID = document.querySelector("#customer_id");
const poNumber = document.querySelector("#po_number");
const qty = document.querySelector("#quantity");

const meterSize = document.querySelector("#meterSize");
const meterType = document.querySelector("#meterType");
const display = document.querySelector("#display");
const timeZone = document.querySelector("#timeZone");

const purchaseOrder = document.querySelector("#purchase-order");

let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let date = `${cYear}-${cMonth}-${cDay}`;

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
    .catch((err) => console.log(err.response.data));
};

const createOrder = () => {
  axios
    .post("http://localhost:4000/configuration", body)
    .then(displayOrderLines)
    .catch(errCallback);
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

  let num = 0;
    let total = +meterPrice.data[0].meter_price * +lineObj.quantity;
    let discountedTotal

  +lineObj.customerID === 1
    ? (discountedTotal = total * 0.5)
    : +lineObj.customerID === 2
    ? (discountedTotal = total * 0.65)
    : (discountedTotal = total * 0.75);

    console.log(total)
    console.log(date)
    const addLine = document.createElement("section");
    addLine.classList.add('lineObj');
    addLine.innerHTML = `
        <section class=orderLineSection>
        <div class="line">${date}</div>
        <div class="line">${lineObj.customerID}</div>
        <div class="line">${lineObj.poNumber}</div>        
        <div class="line">${lineObj.quantity}</div>
        <div class="line">${lineObj.meterSize}</div>
        <div class="line">${lineObj.meterType}${lineObj.display}${lineObj.timeZone}</div>
        <div class="line">${total}</div>
        <div class="line">${discountedTotal}</div>
        <button onclick="deleteItem(this)">X</button>
        </section>
        <div class="line-break"><div>
        `;
  purchaseOrder.appendChild(addLine);
    orderLines.push(lineObj);
      
};

console.log(orderLines)

function deleteItem(e){
    console.log("Button element", e)
    e.parentElement.remove()
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
    displayOrderLines();
    num++;
});

getAllConfigs();
