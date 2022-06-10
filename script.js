const dateSelector = document.getElementById('date-selector');
let dates = document.getElementById("date");
let spaces = document.getElementById("spaces");
const form = document.querySelector("form");
const spaceTypes = document.getElementById("space-types");
const bookingTypes = document.getElementById("booking-types");
const startTime = document.getElementById("start-time");

let arr = Array();
let dateSearch;

// const endpoint = "http://127.0.0.1:8000/api/available/";
// const endpoint = "https://workspaceapi.herokuapp.com/api/available/";

fetch("http://127.0.0.1:8000/api/space-type/")
.then(response => response.json())
.then(data => {
  data.forEach(d => {
    let opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.space_type_name;
    spaceTypes.appendChild(opt);
  })
});

// search for available houly spaces
bookingTypes.addEventListener('change', e => {
  if (e.target.value == "hourly") {
    
    let endpoint = ("http://127.0.0.1:8000/api/available"+'/'+dateSearch);

    let opt = document.createElement("option");
    opt.textContent = "Select space";
    opt.setAttribute("disabled", "disabled")
    opt.setAttribute("selected", "selected")
    spaces.replaceChildren(opt)

    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      data.forEach(d => {
        let opt = document.createElement("option");
        opt.value = d.id;
        opt.textContent = d.space_name;
        spaces.appendChild(opt);
      });

    startTime.removeAttribute("disabled");
    spaceTypes.setAttribute("disabled", "disabled");
    form.setAttribute("action", "http://127.0.0.1:8000/api/hourly-booking/new");

    });

  } else {
    startTime.setAttribute("disabled", "disabled");
    spaceTypes.removeAttribute("disabled");
    form.setAttribute("action", "http://127.0.0.1:8000/api/bookings/new");
  }
  
});


// search for available spaces
spaceTypes.addEventListener('change', e => {
  let endpoint = ("http://127.0.0.1:8000/api/available"+'/'+dateSearch+'/'+e.target.value);

  let opt = document.createElement("option");
  opt.textContent = "Select space";
  opt.setAttribute("disabled", "disabled")
  opt.setAttribute("selected", "selected")
  spaces.replaceChildren(opt)

  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    data.forEach(d => {
      let opt = document.createElement("option");
      opt.value = d.id;
      opt.textContent = d.space_name;
      spaces.appendChild(opt);
    })
  });
  
});

dateSelector.addEventListener('change', e => {
  dateSearch = e.target.value;

  bookingTypes.removeAttribute("disabled");

  arr.push(e.target.value);
  dates.value = arr;
});
