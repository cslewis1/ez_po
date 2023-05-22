const products = document.querySelector(".products");

const errCallback = (err) => console.log(err.response.data);

let createMeterDisplay = (meter) => {
  const display = document.createElement("div");
  display.innerHTML = `<image alt='meter image' src='${meter.meter_image}' class='display'/>
         <p class='part-number'>${meter.part_number}</p>
         <p class='meter_name'>${meter.meter_name}</p>`;

  products.appendChild(display);
};

const displayMeters = (arr) => {
  arr.forEach((meter) => {
    createMeterDisplay(meter);
  });
};

getAllMeters();

