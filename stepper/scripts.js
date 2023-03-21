
const gatewayName = document.getElementById("gateway");
const farmName = document.getElementById("farm");
const gatewayKey = document.getElementById("gw-key");
const sensorId = document.getElementById("sensor-id");
const gwContinue = document.getElementById('gw-continue');
const selectWrapper = document.getElementById('select-wrap');
const selector = document.getElementById('gw-select');
//URL parameters
const queryString = window.location.search;
//Parsed parameters
const urlParams = new URLSearchParams(queryString);

var stepperDiv = document.querySelector('.stepper');
console.log(stepperDiv);
var stepper = new MStepper(stepperDiv);

const data = JSON.parse(localStorage.getItem("gateway")) || [];

//const options = {'classes':'blue' ,'dropdownOptions': {'marek':1}}

addActive = (event) => {
    event.classList.add('active');
    //console.log(event.labels)
    event.labels[0].className = 'active';
}


populateSelect = (selectElementId, optionsList) => {
    // get the select element by its id
    const selectElement = document.getElementById(selectElementId);

    // clear any existing options
    selectElement.innerHTML = '';

    // add new options to the select element
    //Based on data from gateway localstorage
    //Here I will have to push to an array value of the gateeway name when array is longer than 0
    if (optionsList.length > 0) {
        for (let i = 0; i < optionsList.length; i++) {
            const option = document.createElement('option');
            console.log(optionsList[i])
            option.value = i;
            option.text = optionsList[i].Gateway;
            selectElement.appendChild(option);
        }
    } else {
        let optionNo = document.createElement('option');
        optionNo.value = 0;
        optionNo.text = gatewayName.value;
        selectElement.appendChild(optionNo);
    }
}

gwContinue.onclick = () => {
    populateSelect('gw-select', data);
}


document.addEventListener('DOMContentLoaded', (event) => {

    //Popualte Select dropdown with data from localstorage
    populateSelect('gw-select', data);
    console.log(gatewayName.value)
    // Check if user is adding new sensor (coming back from final.html)
    //By chekcing URL parameter. And go to the 3 step
    if (urlParams.get('q') === "2") {
        console.log('true?')
        stepper.openStep(2);
    } else {
        stepper.openStep(0);
    }
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
})

// getIdsGw = (text) => {
//     //console.log(text)
//     let id = document.getElementById("gwId");
//     let key = document.getElementById("gwKey");
//     let receivedId = text.substring(0, text.indexOf("-"))
//     let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
//     //console.log(receivedKey)
//     id.value = receivedId;
//     key.value = receivedKey;
// }


openNewSensor = (a) => {
    window.location = 'https://dobish.github.io/dolGW/stepper/index.html?q=' + a;
}

anotherSensor = () => {
    console.log('fired')
    let another = document.getElementsByClassName("another")
    another.onlick = function () {
        window.location.reload()
    }
}

// checkGateway = () => {
//     let obj = data;
//     if (Object.values(obj).indexOf('test1') > -1) {
//         console.log('has test1');
//     }
// }


function anyThing(destroyFeedback) {
    setTimeout(function () { destroyFeedback(true); }, 500);
}

function noThing(destroyFeedback) {
    setTimeout(function () { destroyFeedback(true); }, 1000);
}



console.log(stepper.getSteps());

// hasValue = (jsonArray, key, value) => {
//     for (let i = 0; i < jsonArray.length; i++) {
//       if (jsonArray[i].hasOwnProperty(key) && jsonArray[i][key] === value) {
//         return i
//       }
//     }
//     return false;
//   }

addSensor = (destroyFeedback, form, activeStepContent) => {
    let selectorValue = selector.value;


    // const key = 'Gateway'
    // if (data.length > 0) {
    //     console.log('true')
    //     //data[selectorValue].Sensors.push(sensorId.value)
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].hasOwnProperty(key) && data[i][key] === gatewayName.value) {
    //             data[i].Sensors.push(sensorId.value)
    //         } else {
    //             console.log('else')
    //             const newSensor = {
    //                 "Gateway": gatewayName.value,
    //                 "Farm": farmName.value,
    //                 "Key": gatewayKey.value,
    //                 "Sensors": [sensorId.value]
    //             }
    //             data.push(newSensor);
    //         }
    //     }
    // } else {
    //     console.log('else')
    //     const newSensor = {
    //         "Gateway": gatewayName.value,
    //         "Farm": farmName.value,
    //         "Key": gatewayKey.value,
    //         "Sensors": [sensorId.value]
    //     }
    //     data.push(newSensor);
    // }
    const newSensor = {
        "Gateway": gatewayName.value,
        "Farm": farmName.value,
        "Key": gatewayKey.value,
        "Sensors": [sensorId.value]
    }
    data.push(newSensor);


    localStorage.setItem("gateway", JSON.stringify(data));
    console.log(data);
    console.log(JSON.parse(localStorage.getItem("gateway")))
    document.getElementById('form').submit();
}


