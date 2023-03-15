//Get the table element
const table = document.getElementById("sensor-table");
const tableWrapper = document.getElementById('table-wrapper');

// Get the array of users from the session storage
const gatewayData = localStorage.getItem('gateway');
const gatewayInfo = JSON.parse(gatewayData);

// Create a header row for the table
const headerRow = table.insertRow();


document.addEventListener('DOMContentLoaded', (event) => {
    if(localStorage.getItem('gateway')){
        createHeaders(createTable())
    } else {
        tableWrapper.style.display = 'none';
        console.log('gateway is empty');
    }
    
})

createTable = () => {
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
}

createHeaders = () => {
    // Create a cell for each header in the first object of the array
    Object.keys(gatewayInfo[0]).forEach(key => {
        const cell = headerRow.insertCell();
        cell.innerText = key;
    });
    headerRow.style.fontWeight = "700";
}