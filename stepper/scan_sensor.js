//Scan button
const btn_sensor = document.getElementById('btn-scan-qr-sensor');
const btn_sensor_2 = document.getElementById('btn-scan-qr-sensor-2');

const id_sensor = document.getElementById("sensor-id");
const key_sensor = document.getElementById("app-key");

const reader_sensor = document.getElementById('reader_sensor');
const config_sensor = { fps: 10, qrbox: { width: 250, height: 250 } };
const html5QrCode_sensor = new Html5Qrcode(/* element id */ "reader_sensor");

let btnsArray_2 = [btn_sensor, btn_sensor_2]

btnsArray_2.forEach(btns => {

    btns.addEventListener('click', (event) => {
        // If you want to prefer back camera
        console.log('fired')
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {

            let cameraName = 'camera2 0, facing back';

            if (devices && devices.length) {
                if (devices.length > 0) {
                    btn_sensor.classList.add('scale-out');
                    const index = devices.findIndex(device => device.label === cameraName);
                    if (index !== -1) {
                        const deviceId = devices[index].id;
                        console.log('Opening camera with device ID', deviceId);
                        html5QrCode_sensor.start(deviceId, config_sensor, qrCodeSuccessCallback_sensor);
                    } else {
                        //If label was not found in the object open the last camera from the array (Might open front facing ¯\_(ツ)_/¯ )
                        const deviceId = devices[devices.length - 1].id;
                        console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
                        html5QrCode_sensor.start(deviceId, config_sensor, qrCodeSuccessCallback_sensor);
                    }
                }

            }
        }).catch(err => {
            // handle err
            console.log(err)
        });
    })
})

/* btn_sensor.onclick = () => {
    // If you want to prefer back camera

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {

        let cameraName = 'camera2 0, facing back';

        if (devices && devices.length) {
            if (devices.length > 0) {
                btn_sensor.classList.add('scale-out');
                const index = devices.findIndex(device => device.label === cameraName);
                if (index !== -1) {
                    const deviceId = devices[index].id;
                    console.log('Opening camera with device ID', deviceId);
                    html5QrCode_sensor.start(deviceId, config_sensor, qrCodeSuccessCallback_sensor);
                } else {
                    //If label was not found in the object open the last camera from the array (Might open front facing ¯\_(ツ)_/¯ )
                    const deviceId = devices[devices.length - 1].id;
                    console.log(`Specified label not found, opening first available camera with device ID ${deviceId}`);
                    html5QrCode_sensor.start(deviceId, config_sensor, qrCodeSuccessCallback_sensor);
                }
            }

        }
    }).catch(err => {
        // handle err
        console.log(err)
    });
} */







const qrCodeSuccessCallback_sensor = (decodedText, decodedResult) => {
    /* handle success */
    getIdsSensor(decodedText);
    btn_sensor.classList.add('scale-in');
}


getIdsSensor = (text) => {
    let receivedId = text.substring(0, text.indexOf("-"))
    let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
    id_sensor.value = receivedId;
    key_sensor.value = receivedKey;
    html5QrCode_sensor.stop();
}




