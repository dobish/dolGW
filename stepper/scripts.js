
const gatewayName = document.getElementById("gateway");
const farmName = document.getElementById("farm");
const gatewayKey = document.getElementById("gw-key");
const sensorId = document.getElementById("sensor-id");

//URL parameters
const queryString = window.location.search;
//Parsed parameters
const urlParams = new URLSearchParams(queryString);

const data = JSON.parse(localStorage.getItem("gateway")) || [];




addActive = (event) => {
    event.classList.add('active');
    //console.log(event.labels)
    event.labels[0].className = 'active';
}

document.addEventListener('DOMContentLoaded', (event) => {
    if(localStorage.getItem('gateway')){

    }
    //the event occurred
    if(urlParams.get('q') === "2"){
        console.log('true?')
        stepper.openStep(2);
    } else {
        stepper.openStep(0);
    }
    
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
    window.location = 'http://localhost:8012/dol-sensors/stepper/index.html?q=' + a;
}

anotherSensor = () => {
    console.log('fired')
    let another = document.getElementsByClassName("another")
    another.onlick = function () {
        window.location.reload()
    }
}

function anyThing(destroyFeedback) {
    setTimeout(function () { destroyFeedback(true); }, 500);
}

function noThing(destroyFeedback) {
    setTimeout(function () { destroyFeedback(true); }, 1000);
}

var stepperDiv = document.querySelector('.stepper');
console.log(stepperDiv);
var stepper = new MStepper(stepperDiv);

console.log(stepper.getSteps());

addSensor = (destroyFeedback, form, activeStepContent) => {
    let marko = JSON.parse(localStorage.getItem("gateway"));
    const newSensor = {
        "Gateway": gatewayName.value,
        "Farm": farmName.value,
        "Key": gatewayKey.value,
        "Sensors": sensorId.value
    }

    data.push(newSensor);
    localStorage.setItem("gateway", JSON.stringify(data));
    console.log(data);
    console.log(JSON.parse(localStorage.getItem("gateway")))

    document.getElementById('form').submit();
}


