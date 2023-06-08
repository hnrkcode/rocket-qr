<script lang="ts">
  import QrCode from '$lib/components/canvas/QrCode.svelte';
  import ColorPickers from '$lib/components/colors/ColorPickers.svelte';
  import Size from '$lib/components/sliders/Size.svelte';
  import QuietZoneMargin from '$lib/components/sliders/QuietZoneMargin.svelte';
  import ErrorResistance from '$lib/components/sliders/ErrorResistance.svelte';
  import Download from '$lib/components/buttons/Download.svelte';
</script>

<QrCode />
<Size />
<QuietZoneMargin />
<ErrorResistance />
<ColorPickers />
<Download on:click />
