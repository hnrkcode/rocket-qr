<script lang="ts">
    import QrCode from './QrCode.svelte';
    import Size from './Size.svelte';
    import ErrorResistance from './ErrorResistance.svelte';
    import Download from './Download.svelte';
</script>

<QrCode />
<Size />
<ErrorResistance />
<Download on:click />
