import qr from "qrcode";

const ERROR_CORR_LEVELS = {
  7: { name: "L", fullName: "Low" },
  15: { name: "M", fullName: "Medium" },
  25: { name: "Q", fullName: "Quartile" },
  30: { name: "H", fullName: "High" },
};

const downloadBtn = document.getElementById("download");
const errorLevel = document.getElementById("level");
const errorLevelValue = document.getElementById("current-level");
const slider = document.getElementById("scale");
const sliderValue = document.getElementById("current-scale");

errorLevelValue.innerHTML = ERROR_CORR_LEVELS[errorLevel.value].fullName;
sliderValue.innerHTML = slider.value;

function getNearestErrorLevel() {
  const value = parseInt(errorLevel.value);
  const values = Object.keys(ERROR_CORR_LEVELS);
  const nearest = values.reduce(function (prev, curr) {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });

  return nearest;
}

function getErrorCorrectionLevel(level) {
  return ERROR_CORR_LEVELS[level];
}

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  const datalist = document.getElementById("values");

  for (let key in ERROR_CORR_LEVELS) {
    const option = document.createElement("option");
    option.value = key;
    option.label = ERROR_CORR_LEVELS[key].name;
    datalist.appendChild(option);
  }

  const { url } = await getCurrentTab();
  const canvas = document.getElementById("canvas");
  const options = {
    margin: 1,
    scale: 7,
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, url, options);
});

slider.addEventListener("input", (event) => {
  sliderValue.innerHTML = event.target.value;
});

errorLevel.addEventListener("input", async (event) => {
  const nearest = getNearestErrorLevel();
  const errorCorrectionLevel = getErrorCorrectionLevel(nearest);

  errorLevel.value = nearest;
  errorLevelValue.innerHTML = ERROR_CORR_LEVELS[nearest].fullName;

  const { url } = await getCurrentTab();
  const canvas = document.getElementById("canvas");
  const options = {
    margin: 1,
    scale: 7,
    errorCorrectionLevel: errorCorrectionLevel.name,
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, url, options);
});

downloadBtn.addEventListener("click", async () => {
  const { url } = await getCurrentTab();
  const filename = new URL(url).hostname.replaceAll(".", "-");
  const canvas = document.createElement("canvas");
  const scale = slider.value;
  const nearest = getNearestErrorLevel();
  const errorCorrectionLevel = getErrorCorrectionLevel(nearest);

  const options = {
    margin: 1,
    scale: scale,
    errorCorrectionLevel: errorCorrectionLevel.name,
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, url, options);

  const link = document.createElement("a");
  const image = new Image();

  image.src = canvas.toDataURL("image/png");
  link.href = image.src;
  link.download =
    `${filename}_scale-${scale}_${errorCorrectionLevel.fullName}.png`.toLowerCase();
  link.click();
});
