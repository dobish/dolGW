const table = document.getElementById("gw-table");

// Get the array of users from the session storage
const gatewayData = localStorage.getItem('gateway');
const gatewayInfo = JSON.parse(gatewayData);

// Create a header row for the table
const headerRow = table.insertRow();



console.log(gatewayInfo)
console.log(Object.keys(gatewayInfo[0]))
// Create a cell for each header in the first object of the array
Object.keys(gatewayInfo[0]).forEach(key => {
  const cell = headerRow.insertCell();
  cell.innerText = key;
});

headerRow.style.fontWeight = "700";

// Iterate over each object in the array
gatewayInfo.forEach(user => {
  // Create a new row in the table
  const row = table.insertRow();

  // Create a new cell for each property in the user object
  Object.values(user).forEach(value => {
    const cell = row.insertCell();
    cell.innerText = value;
  });
});

document.getElementById("btn-new-sensor").addEventListener("click", addNewSensor2);
document.getElementById("btn-new-gw").addEventListener("click", addNewSensor3);


function addNewSensor2() {
  window.location = 'https://dobish.github.io/dolGW/stepper/index.html?q=2';
}

function addNewSensor3() {
  window.location = 'https://dobish.github.io/dolGW/stepper/index.html?q=0';
}
