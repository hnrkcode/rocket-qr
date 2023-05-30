import qr from "qrcode";

const downloadBtn = document.getElementById("download");
const slider = document.getElementById("scale");
const sliderValue = document.getElementById("current-scale");
sliderValue.innerHTML = slider.value;

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

downloadBtn.addEventListener("click", async () => {
  const { url } = await getCurrentTab();
  const currentUrl = url;

  const canvas = document.createElement("canvas");

  const options = {
    margin: 1,
    scale: slider.value,
    color: { dark: "#2b2a2a", light: "#ffffff" },
  };
  qr.toCanvas(canvas, currentUrl, options);

  const link = document.createElement("a");
  const image = new Image();

  image.src = canvas.toDataURL("image/png");
  link.href = image.src;
  link.download = "image.png";
  link.click();
});
