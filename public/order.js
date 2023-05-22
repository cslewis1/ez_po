
const form = document.querySelector('#order-form');
const customerID = document.querySelector('#customer_id');
const po = document.querySelector('#purchase-order');
const poNumber = document.querySelector('#po_number');
const qty = document.querySelector('#quantity');

const meter = document.querySelector('#meter');
const type = document.querySelector('#type');
const display = document.querySelector('#display');
const timeZone = document.querySelector('#timeZone');
const purchaseOrder = document.querySelector('.purchase-order')

let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let date = `${cYear - cMonth - cDay}`

// const createLineOptions = (meters) => {
//     meters.forEach(el => {    
//     const meterOption = document.createElement('option')
//     meterOption.setAttribute('value', meter['part_number'])
//         meterOption.textContent = el.meter_name;
//         meter.appendChild(meterOption)
//     })
// }           




  
const meters = getAllMeters()
const configs = getAllConfigs()

