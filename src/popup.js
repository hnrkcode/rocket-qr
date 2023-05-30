import qr from "qrcode";

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
