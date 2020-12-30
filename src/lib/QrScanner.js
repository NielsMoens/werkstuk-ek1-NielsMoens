/**
 * QR code scanner
 */

// Special thanks to Emiel De Vleeschouwer for porviding us with an awesome example
const QrScanner = async () => new Promise((resolve) => {
  // This method will trigger user permissions
  // eslint-disable-next-line no-undef
  Html5Qrcode.getCameras().then((devices) => {
    if (devices && devices.length) {
      const cameraId = devices[0].id; // <-- Select first camera in the list
      // eslint-disable-next-line no-undef
      const html5QrCode = new Html5Qrcode('reader'); // <-- reader-div element id

      const aspectRatio = window.screen.height / window.screen.width;

      // Start the scanner
      html5QrCode.start(
        cameraId, {
          // higher fps = faster scanning
          fps: 10,
          // container width / container height.
          aspectRatio,
        },
        (qrCodeMessage) => {
          // Stop the scanner, then handle response, return message
          html5QrCode.stop().then(() => resolve(qrCodeMessage))
          // error when stop has failed
            .catch(() => {
            });
        },
      )
        .catch((err) => {
          //  error when startup has failed
          console.log(err);
        });
    }
  }).catch((err) => {
    // error when there are no devices
    console.log(err);
  });
});

export default QrScanner;