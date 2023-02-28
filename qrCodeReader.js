const a = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr-result");
//const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

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

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
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

function scan() {
  try {
    a.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

getIds = (text) => {
    let key = document.getElementById('gwKey');
    let id = document.getElementById('gwId');
    let receivedId = text.substring(0, text.indexOf("-"))
    let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
    id.value = receivedId;
    key.value = receivedKey;
}
