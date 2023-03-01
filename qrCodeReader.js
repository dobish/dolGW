const a = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr-result");
//const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
var cameraObjects;
let cameraID;

let scanning = false;

//result from QR code scan
a.callback = res => {
    if (res) {
        getIds(res);
        //outputData.innerText = res;
        scanning = false;

        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        //qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.classList.add('submit');
        btnScanQR.hidden = false;
    }
};

function openCamera(deviceId) {
    //console.log(asda())
    navigator.mediaDevices
        .getUserMedia({ video: { deviceId: deviceId } })
        .then(function (stream) {
            scanning = true;
            //qrResult.hidden = true;
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
    main();
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


async function main() {
    const cameras = await getCameras();
    console.log('Available cameras:', cameras);
    if (cameras.length > 0) {
        //Find index of a camera which label is matching desired string
        const index = cameras.findIndex(camera => camera.label === 'camera2 0, facing back');
        //If found open correct camera that corresponds to the found index
        if (index !== -1) {
            const deviceId = cameras[index].id;
            console.log('Opening camera with device ID', deviceId);
            openCamera(deviceId);
        } else {
            //If label was not found in the object open first camera form the array (Might open front facing ¯\_(ツ)_/¯ )
            deviceId = cameras[0].id;
            console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
            openCamera(deviceId);
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
    let key = document.getElementById('gwKey');
    let id = document.getElementById('gwId');
    let receivedId = text.substring(0, text.indexOf("-"))
    let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
    id.value = receivedId;
    key.value = receivedKey;
}
