<script lang="ts">
  import { onMount } from 'svelte';
  import { getCurrentTab, renderQR } from '$lib/utils';

  onMount(async () => {
    const { url } = await getCurrentTab();
    const canvas = document.getElementById('canvas');
    const options = {
      margin: 0,
      scale: 7,
      color: { dark: '#2b2a2a', light: '#ffffff' }
    };
    renderQR(canvas, url, options);
  });
</script>

<canvas id="canvas" />
