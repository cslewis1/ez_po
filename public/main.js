
const products = document.querySelector(".products");


function createMeterDisplay(arr) {
  arr.forEach(meter => {
    const display = document.createElement("div");
  display.innerHTML = `<image alt='meter image' src='${meter.meter_image}' class='display'/>
         <p class='part-number'>${meter.part_number}</p>
         <p class='meter_name'>${meter.meter_name}</p>`;

  products.appendChild(display);
  })  
};


