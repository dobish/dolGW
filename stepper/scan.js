//Scan button
const btn = document.getElementById('btn-scan-qr');
const btn2 = document.getElementById('btn-scan-qr-2');
//Get gateway input elements
const id = document.getElementById("gw-id");
const key = document.getElementById("gw-key");
//
const reader = document.getElementById('reader');
const config = { fps: 10, qrbox: { width: 250, height: 250 } };
const html5QrCode = new Html5Qrcode(/* element id */ "reader");

let btnsArray = [btn, btn2];

btnsArray.forEach(btn => {

    btn.addEventListener('click', (event)=> {
     // ... event handled
     Html5Qrcode.getCameras().then(devices => {

        let cameraName = 'camera2 0, facing back';
        console.log(devices)
        if (devices && devices.length) {
            //btn.style.display = "none";
            btn.classList.add('scale-out');
             if( devices.length > 0) {
                const index = devices.findIndex(device => device.label === cameraName);
                if (index !== -1) {
                    const deviceId = devices[index].id;
                    console.log('Opening camera with device ID', deviceId);
                    html5QrCode.start(deviceId, config, qrCodeSuccessCallback);
                } else {
                    //If label was not found in the object open the last camera from the array (Might open front facing ¯\_(ツ)_/¯ )
                    const deviceId = devices[devices.length - 1].id;
                    console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
                    html5QrCode.start(deviceId, config, qrCodeSuccessCallback);
                }
             }
        }
    }).catch(err => {
        // handle err
        console.log(err)
    });
    });
 
 });

/* btn.onclick = () => {
    // If you want to prefer back camera
    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {

        let cameraName = 'camera2 0, facing back';
        console.log(devices)
        if (devices && devices.length) {
            //btn.style.display = "none";
            btn.classList.add('scale-out');
             if( devices.length > 0) {
                const index = devices.findIndex(device => device.label === cameraName);
                if (index !== -1) {
                    const deviceId = devices[index].id;
                    console.log('Opening camera with device ID', deviceId);
                    html5QrCode.start(deviceId, config, qrCodeSuccessCallback);
                } else {
                    //If label was not found in the object open the last camera from the array (Might open front facing ¯\_(ツ)_/¯ )
                    const deviceId = devices[devices.length - 1].id;
                    console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
                    html5QrCode.start(deviceId, config, qrCodeSuccessCallback);
                }
             }
        }
    }).catch(err => {
        // handle err
        console.log(err)
    });
} */

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    /* handle success */
    getIdsGw(decodedText);
    //btn.style.display = "block";
    btn.classList.add('scale-in')
}

getIdsGw = (text) => {
    let receivedId = text.substring(0, text.indexOf("-"))
    let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
    id.value = receivedId;
    key.value = receivedKey;
    html5QrCode.stop();
}




