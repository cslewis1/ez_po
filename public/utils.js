const errCallback = (err) => console.log(err);

const getAllMeters = () => {
    axios
       .get('http://localhost:4000/meter')
        .then((res) => { 
          const meters = res.data
            createMeterDisplay(meters)           
        })
       .catch(errCallback);
};

//Hamburger button on Nav Bar
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

/* Open */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
      document.getElementById("myNav").style.width = "0%";
}

getAllMeters()


