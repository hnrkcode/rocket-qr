<script lang="ts">
    import qr from 'qrcode';
    import { onMount } from 'svelte';
    import { getCurrentTab } from '../lib/utils';

    onMount(async () => {
        const { url } = await getCurrentTab();
        const canvas = document.getElementById('canvas');
        const options = {
            margin: 0,
            scale: 7,
            color: { dark: '#2b2a2a', light: '#ffffff' }
        };
        qr.toCanvas(canvas, url, options);
    });
</script>

<canvas id="canvas" />
