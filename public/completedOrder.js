const getAllOrders = () =>
  axios.get(`http://localhost:4000/order`).then((res) => {
    let orders = res.data;
    console.log(orders);

    let customerInfo = document.querySelector("#customerInfo");
    let lineNum = 1;
    let table = document.querySelector("#orderTable");
    let rows = document.createElement("tr");
    
      let orderLines = JSON.parse(localStorage.getItem('cart'))
      console.log(orderLines)
    let customerID = orderLines[0].customerID
    let poNumber = orderLines[0].poNumber
      
    orders.forEach((el) => {       
        if (customerID === 1) {
      console.log(el.order_number)
            

        rows.innerHTML = `
        <td>${lineNum}</td>
        <td>${el.meter_qty}</td>
        <td>${el.meter_id}</td>
        <td>${el.config}</td>
        <td>${el.order_total}</th>
        <td>${el.discounted_total}</td>
    `;
       
        table.appendChild(rows)

        lineNum++;
      }
    });
  }).catch((err) => console.log(err));


getAllOrders()