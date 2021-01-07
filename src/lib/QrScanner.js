/**
 * QR code scanner
 */

// Special thanks to Emiel De Vleeschouwer for providing us with an awesome example
const QrScanner = async () => new Promise((resolve) => {
  // This method will trigger user permissions

  Html5Qrcode.getCameras().then((devices) => {
    if (devices && devices.length) {
      // Select first camera in the list
      const cameraId = devices[0].id;

      // Reader-div element id
      const html5QrCode = new Html5Qrcode('reader');

      // eslint-disable-next-line no-unused-vars
      const aspectRatio = window.screen.height / window.screen.width;

      // Start the scanner
      html5QrCode.start(
        cameraId, {
          // higher fps = faster scanning
          fps: 10,
          // container width / container height.
          aspectRatio: 16 / 9,
        },
        (qrCodeMessage) => {
          // Stop the scanner, then handle response, return message
          html5QrCode.stop().then(() => resolve(qrCodeMessage))
          // error when stop has failed
            .catch(() => {
            });
        },
      );
    }
  });
});

export default QrScanner;