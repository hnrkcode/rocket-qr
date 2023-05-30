import qr from "qrcode";

const downloadBtn = document.getElementById("download");
const errorLevel = document.getElementById("level");
const errorLevelValue = document.getElementById("current-level");
const slider = document.getElementById("scale");
const sliderValue = document.getElementById("current-scale");

errorLevelValue.innerHTML = `~${errorLevel.value} %`;
sliderValue.innerHTML = slider.value;

function getErrorCorrectionLevel(level) {
  const errorCorrectionLevels = {
    7: "L",
    15: "M",
    25: "Q",
    30: "H",
  };

  return errorCorrectionLevels[level];
}

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  const { url } = await getCurrentTab();
  const currentUrl = url;
  const canvas = document.getElementById("canvas");
  const options = {
    margin: 1,
    scale: 7,
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, currentUrl, options);
});

slider.addEventListener("input", (event) => {
  sliderValue.innerHTML = event.target.value;
});

errorLevel.addEventListener("input", async (event) => {
  const value = parseInt(event.target.value);
  const values = [7, 15, 25, 30];
  const nearest = values.reduce(function (prev, curr) {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });

  errorLevel.value = nearest;
  errorLevelValue.innerHTML = `~${nearest} %`;

  const { url } = await getCurrentTab();
  const currentUrl = url;
  const canvas = document.getElementById("canvas");
  const options = {
    margin: 1,
    scale: 7,
    errorCorrectionLevel: getErrorCorrectionLevel(nearest),
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, currentUrl, options);
});

downloadBtn.addEventListener("click", async () => {
  const { url } = await getCurrentTab();
  const currentUrl = url;
  const filename = new URL(url).hostname.replaceAll(".", "-");
  const canvas = document.createElement("canvas");
  const scale = slider.value;

  const options = {
    margin: 1,
    scale: scale,
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, currentUrl, options);

  const link = document.createElement("a");
  const image = new Image();

  image.src = canvas.toDataURL("image/png");
  link.href = image.src;
  link.download = `${filename}_scale-${scale}.png`;
  link.click();
});
