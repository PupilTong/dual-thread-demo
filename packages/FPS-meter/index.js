// FPS Meter
// show FPS at the top left corner
// the background color is changed from green to red for low FPS

const fpsContainer = document.createElement('div');
fpsContainer.style.position = 'fixed';
fpsContainer.style.top = '0';
fpsContainer.style.left = '0';
fpsContainer.style.color = 'white';
fpsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
fpsContainer.style.padding = '4px 8px';
fpsContainer.style.zIndex = '9999';
fpsContainer.style.contain = 'strict';
fpsContainer.style.width = '100px';
fpsContainer.style.height = '20px';
document.body.appendChild(fpsContainer);

let frameCount = 0;
let lastTime = performance.now();

function updateFPS() {
  const now = performance.now();
  frameCount++;
  const delta = now - lastTime;

  if (delta >= 1000) {
    const fps = Math.round((frameCount * 1000) / delta);
    fpsContainer.textContent = `FPS: ${fps}`;
    
    // Change background color continuously based on FPS
    // Interpolates from red (low FPS) to green (high FPS)
    const maxFps = 120;
    const clampedFps = Math.max(0, Math.min(fps, maxFps));
    const hue = (clampedFps / maxFps) * 120; // 0 is red, 120 is green
    fpsContainer.style.backgroundColor = `hsla(${hue}, 100%, 40%, 0.5)`;
    
    lastTime = now;
    frameCount = 0;
  }

  requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);

