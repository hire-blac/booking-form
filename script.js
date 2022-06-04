const dateSelector = document.getElementById('date-selector');
let dates = document.getElementById("date");
let spaces = document.getElementById("spaces");
const form = document.querySelector("form");
let space;
let arr = Array();

fetch("https://workspaceapi.herokuapp.com/api/space")
.then(response => response.json())
.then(data => {
  data.forEach(d => {
    let opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.space_name;
    spaces.appendChild(opt);
  })
});

dateSelector.addEventListener('change', e => {
  arr.push(e.target.value);
  dates.value = arr;
});
