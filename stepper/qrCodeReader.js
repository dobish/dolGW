const a = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr-result");
//const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");



console.log(window.qrcode)


var cameraObjects;
let cameraID;

let scanning = false;


//result from QR code scan
a.callback = res => {
    if (res) {
        let step = window.localStorage.getItem('step');
        console.log(step);
        if (step === "1") {
            getIds(res);
        } else {
            getIds2(res);
        }


        //outputData.innerText = res;
        scanning = false;
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        //qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.classList.add('submit');
        btnScanQR.hidden = false;
        canvasElement.remove();
    }
};

function openCamera(deviceId, btn) {
    //console.log(asda())
    navigator.mediaDevices
        .getUserMedia({ video: { deviceId: deviceId } })
        .then(function (stream) {
            window.localStorage.setItem('step', 1);
            scanning = true;
            console.log('if')
            //Camera? Action!
            btnScanQR.classList.remove('submit');
            btnScanQR.hidden = true;
            canvasElement.hidden = false;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();

        });
};


function tick() {
    canvasElement.height = 300;
    canvasElement.width = 300;
    console.log(video.videoHeight)
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    scanning && requestAnimationFrame(tick);
}




//Trigger main function that operates camera when button is clicked
btnScanQR.onclick = () => {
    main(1);
}



//Get all available cameras on the device that meet requirements (videoinput and back facing camera)
function getCameras() {
    return navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(device => device.kind === 'videoinput'))
        .then(cameras => cameras.map(camera => ({
            id: camera.deviceId,
            label: camera.label
        })));
}


async function main(btn) {
    const cameras = await getCameras();
    let cameraName = 'camera2 0, facing back';
    console.log('Available cameras:', cameras);
    if (cameras.length > 0) {
        //Find index of a camera which label is matching desired string
        const index = cameras.findIndex(camera => camera.label === cameraName);
        //If found open correct camera that corresponds to the found index
        if (index !== -1) {
            const deviceId = cameras[index].id;
            console.log('Opening camera with device ID', deviceId);
            openCamera(deviceId, btn);
        } else {
            //If label was not found in the object open the last camera from the array (Might open front facing ¯\_(ツ)_/¯ )
            deviceId = cameras[cameras.length - 1].id;
            console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
            openCamera(deviceId, btn);
        }
    } else {
        console.error('No cameras available');
    }
}




function scan() {
    try {
        a.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}

//Received key and ids to input values 
getIds = (text) => {
    let key = document.getElementById('gw-key');
    let id = document.getElementById('gw-id');
    let receivedId = text.substring(0, text.indexOf("-"))
    let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
    id.value = receivedId;
    key.value = receivedKey;
}

getIds2 = (text) => {
    console.log('odpalanko')
    let appKey = document.getElementById('app-key');
    let appId = document.getElementById('sensor-key');
    let receivedIdsens = text.substring(0, text.indexOf("-"))
    let receivedKeysens = text.substring(text.indexOf("-") + 1, text.length)
    appId.value = receivedIdsens;
    appKey.value = receivedKeysens;
}
