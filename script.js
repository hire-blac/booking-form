const dateSelector = document.getElementById('date-selector');
let dates = document.getElementById("date");
let spaces = document.getElementById("spaces");
const form = document.querySelector("form");
const spaceTypes = document.getElementById("space-types");

let arr = Array();
let dateSearch;

// const endpoint = "http://127.0.0.1:8000/api/available/";

fetch("http://127.0.0.1:8000/api/space-type/")
.then(response => response.json())
.then(data => {
  console.log(data);
  data.forEach(d => {
    let opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.space_type_name;
    spaceTypes.appendChild(opt);
  })
});

// search for available spaces
spaceTypes.addEventListener('change', e => {
  console.log(dateSearch.toString());
  let endpoint = ("http://127.0.0.1:8000/api/available"+'/'+dateSearch+'/'+e.target.value);

  let opt = document.createElement("option");
  opt.textContent = "Select space";
  opt.setAttribute("disabled", "disabled")
  opt.setAttribute("selected", "selected")
  spaces.replaceChildren(opt)

  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    console.log(data);
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
  spaceTypes.removeAttribute("disabled")

  arr.push(e.target.value);
  dates.value = arr;
});
