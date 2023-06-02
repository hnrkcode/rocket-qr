<script lang="ts">
  import { onMount } from 'svelte';
  import {
    ERROR_CORR_LEVELS,
    getNearestErrorLevel,
    getErrorCorrectionLevel,
    getCurrentTab,
    renderQR
  } from '../utils';
  import { errorResistance } from '../stores';
  import type { QRCodeErrorCorrectionLevel } from 'qrcode';

  let currentErrorResistance = ERROR_CORR_LEVELS[$errorResistance].fullName;

  async function rerenderQRCode(errorCorrectionLevel: string) {
    const { url } = await getCurrentTab();
    const canvas = document.getElementById('canvas');
    const options = {
      margin: 0,
      scale: 7,
      errorCorrectionLevel: errorCorrectionLevel as QRCodeErrorCorrectionLevel,
      color: { dark: '#2b2a2a', light: '#ffffff' }
    };
    renderQR(canvas, url, options);
  }

  async function handleErrorResistance(event: Event) {
    const inputEvent = event as InputEvent;
    const inputElement = inputEvent.target as HTMLInputElement | null;

    if (inputElement) {
      const inputValue = parseInt(inputElement.value, 15);
      const nearest = getNearestErrorLevel(inputValue);
      let { name, fullName } = getErrorCorrectionLevel(nearest);
      errorResistance.set(nearest);
      await rerenderQRCode(name);

      if (fullName !== currentErrorResistance) {
        currentErrorResistance = fullName;
      }
    }
  }

  onMount(() => {
    const datalist = document.getElementById('error-resistance-values');

    if (datalist) {
      for (let key in ERROR_CORR_LEVELS) {
        const option = document.createElement('option');
        option.value = key;
        option.label = ERROR_CORR_LEVELS[key].name;
        datalist.appendChild(option);
      }
    }
  });
</script>

<div class="flex flex-col my-2">
  <label for="error-resistance" class="uppercase font-bold"
    >Error resistance: <span />{currentErrorResistance}</label
  >
  <input
    type="range"
    name="error-resistance"
    id="error-resistance"
    list="error-resistance-values"
    min="7"
    max="30"
    bind:value={$errorResistance}
    on:input={handleErrorResistance}
  />
  <datalist id="error-resistance-values" />
</div>
