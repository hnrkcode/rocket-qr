<script lang="ts">
  import QrCode from '../lib/components/QrCode.svelte';
  import Size from '../lib/components/Size.svelte';
  import ErrorResistance from '../lib/components/ErrorResistance.svelte';
  import Download from '../lib/components/Download.svelte';
</script>

<QrCode />
<Size />
<ErrorResistance />
<Download on:click />
