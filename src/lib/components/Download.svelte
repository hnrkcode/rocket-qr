<script lang="ts">
  import { onMount } from 'svelte';
  import { getCurrentTab, getErrorCorrectionLevel, renderQR } from '../utils';
  import { scale, errorResistance } from '../stores';

  let currentUrl = null;
  let filename = null;

  function downloadQrCode() {
    const canvas = document.createElement('canvas');
    const { name, fullName } = getErrorCorrectionLevel($errorResistance);
    const options = {
      margin: 1,
      scale: $scale,
      errorCorrectionLevel: name,
      color: { dark: '#2b2a2a', light: '#ffffff' }
    };
    renderQR(canvas, currentUrl, options);

    const link = document.createElement('a');
    const image = new Image();

    image.src = canvas.toDataURL('image/png');
    link.href = image.src;
    link.download = `${filename}_scale-${$scale}_${fullName}.png`.toLowerCase();
    link.click();
  }

  onMount(async () => {
    const { url } = await getCurrentTab();
    currentUrl = url;
    filename = new URL(url).hostname.replaceAll('.', '-');
  });
</script>

<button
  on:click={downloadQrCode}
  class="w-full text-center mt-2 mx-auto bg-green-500 text-white px-10 py-2 border-none rounded-md cursor-pointer uppercase hover:bg-green-600"
  >Download</button
>
