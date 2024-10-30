// Get the video element
const videoElement = document.getElementById('videoElement');
const photosContainer = document.getElementById('photos');

// Set up the camera
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    videoElement.srcObject = stream;

    // Wait for the video stream to start
    videoElement.onloadedmetadata = () => {
      // Capture photo after a delay of 1 second
      setTimeout(() => {
        capturePhoto();
      }, 1000);
    };
  })
 .catch(error => {
    console.error('Error accessing the camera:', error);
  });

function capturePhoto() {
  // Create a canvas element to capture the photo
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 240;

  // Get the 2D drawing context of the canvas
  const ctx = canvas.getContext('2d');

  // Draw the video frame to the canvas
  ctx.drawImage(videoElement, 0, 0, 320, 240);

  // Get the IP address of the user
  fetch('https://api.ipify.org')
   .then(response => response.text())
   .then(ipAddress => {
      // Create a new image element
      const img = document.createElement('img');
      img.src = canvas.toDataURL();
      img.className = 'photo';

      // Add the IP address and photo to the photos container
      const photoContainer = document.createElement('div');
      photoContainer.innerHTML = `
        <p>IP Address: ${ipAddress}</p>
        <img src="${img.src}" alt="Captured Photo">
      `;
      photosContainer.appendChild(photoContainer);
    });
}