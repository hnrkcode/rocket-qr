<script lang="ts">
  import QrCode from '../lib/components/canvas/QrCode.svelte';
  import Size from '../lib/components/sliders/Size.svelte';
  import ErrorResistance from '../lib/components/sliders/ErrorResistance.svelte';
  import Download from '../lib/components/buttons/Download.svelte';
</script>

<QrCode />
<Size />
<ErrorResistance />
<Download on:click />
