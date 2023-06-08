<script lang="ts">
  import { onMount, beforeUpdate } from 'svelte';
  import { getCurrentTab, renderQR } from '$lib/utils';
  import { foregroundColor, backgroundColor, quietZone } from '$lib/stores';

  async function handleRenderQR() {
    const { url } = await getCurrentTab();
    const canvas = document.getElementById('canvas');
    const options = {
      margin: $quietZone,
      scale: 7,
      color: { dark: $foregroundColor, light: $backgroundColor }
    };
    renderQR(canvas, url, options);
  }

  onMount(async () => handleRenderQR());
  beforeUpdate(async () => handleRenderQR());
</script>

<div class="flex justify-center mt-10 mb-8">
  <canvas id="canvas" />
</div>
