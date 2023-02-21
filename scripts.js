function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            // Handle on success condition with the decoded message.
            console.log(`Scan result ${decodedText}`, decodedResult);
            let qrScanner = document.getElementById("qr-reader");
            getIds(decodedText)
            qrScanner.remove();

            resultContainer.remove();
            
        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});

getIds = (text) => {
    console.log(text)
    let id = document.getElementById("gwId");
    let key = document.getElementById("gwKey");
    let receivedId = text.substring(0, text.indexOf("-"))
    let receivedKey = text.substring(text.indexOf("-") + 1, text.length)
    console.log(receivedKey)
    id.value = receivedId;
    key.value = receivedKey;
}

anotherSensor = () => {
    console.log('fired')
    let another = document.getElementsByClassName("another")
    another.onlick = function() {
        window.location.reload()
    }
}
