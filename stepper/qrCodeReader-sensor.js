const b = window.qrcode;

const video2 = document.createElement("video");
const canvasElement2 = document.getElementById("qr-canvas-sensor");
const canvas2 = canvasElement2.getContext("2d");
const qrResult2 = document.getElementById("qr-result");
//const outputData = document.getElementById("outputData");
const btnScanQR2 = document.getElementById("btn-scan-qr-sensor");
var cameraObjects;
//let cameraID2;




let scanning2 = false;

//result from QR code scan
/* b.callback = res => {
    if (res) {
        console.log(res2)
        getIds2(res2);
        //outputData.innerText = res;
        scanning2 = false;

        video2.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        //qrResult.hidden = false;
        canvasElement2.hidden = true;
        btnScanQR2.classList.add('submit');
        btnScanQR2.hidden = false;
    }
}; */

function openCamera2(deviceId) {
    //console.log(asda())
    navigator.mediaDevices
        .getUserMedia({ video: { deviceId: deviceId } })
        .then(function (stream) {
            window.localStorage.setItem('step', '2');
console.log('tutaj')
            scanning2 = true;

            //Camera? Action!
            btnScanQR2.classList.remove('submit');
            btnScanQR2.hidden = true;
            canvasElement2.hidden = false;
            video2.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video2.srcObject = stream;  
            video2.play();
            tick2();
            scan2();


        });
};


function tick2() {
    canvasElement2.height = 300;
    canvasElement2.width = 300;
    console.log(video.videoHeight)
    canvas2.drawImage(video2, 0, 0, canvasElement2.width, canvasElement2.height);
    scanning2 && requestAnimationFrame(tick2);
}

//Trigger main function that operates camera when button is clicked
btnScanQR2.onclick = () => {
    console.log('clicked')
    main2(1);
}

//Get all available cameras on the device that meet requirements (videoinput and back facing camera)
function getCameras2() {
    return navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(device => device.kind === 'videoinput'))
        .then(cameras => cameras.map(camera => ({
            id: camera.deviceId,
            label: camera.label
        })));
}


async function main2(btn) {
    console.log('fired')
    const cameras2 = await getCameras2();
    let cameraName = 'camera2 0, facing back';
    console.log('Available cameras:', cameras2);
    if (cameras2.length > 0) {
        //Find index of a camera which label is matching desired string
        const index = cameras2.findIndex(camera => camera.label === cameraName);
        //If found open correct camera that corresponds to the found index
        if (index !== -1) {
            const deviceId = cameras2[index].id;
            console.log('Opening camera with device ID', deviceId);
            openCamera2(deviceId);
        } else {
            //If label was not found in the object open the last camera from the array (Might open front facing ¯\_(ツ)_/¯ )
            deviceId = cameras2[cameras2.length - 1].id;
            console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
            openCamera2(deviceId, btn);
        }
    } else {
        console.error('No cameras available');
    }
}


function scan2() {
    try {
        console.log(a)
        a.decode();
    } catch (e) {
        setTimeout(scan2, 300);
    }
}

//Received key and ids to input values 

