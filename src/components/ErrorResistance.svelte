<script lang="ts">
    import qr from 'qrcode';
    import { onMount } from 'svelte';
    import {
        ERROR_CORR_LEVELS,
        getNearestErrorLevel,
        getErrorCorrectionLevel,
        getCurrentTab
    } from '../lib/utils';
    import { errorResistance } from '../lib/stores';

    let { fullName } = getErrorCorrectionLevel($errorResistance);

    async function rerenderQRCode(errorCorrectionLevel) {
        const { url } = await getCurrentTab();
        const canvas = document.getElementById('canvas');
        const options = {
            margin: 0,
            scale: 7,
            errorCorrectionLevel: errorCorrectionLevel,
            color: { dark: '#2b2a2a', light: '#ffffff' }
        };
        qr.toCanvas(canvas, url, options);
    }

    async function handleErrorResistance(event) {
        const nearest = getNearestErrorLevel(event.target.value);
        let { name } = getErrorCorrectionLevel(nearest);
        errorResistance.set(nearest);
        await rerenderQRCode(name);
    }

    onMount(() => {
        const datalist = document.getElementById('error-resistance-values');

        for (let key in ERROR_CORR_LEVELS) {
            const option = document.createElement('option');
            option.value = key;
            option.label = ERROR_CORR_LEVELS[key].name;
            datalist.appendChild(option);
        }
    });
</script>

<div class="flex flex-col my-2">
    <label for="error-resistance" class="uppercase font-bold"
        >Error resistance: <span />{fullName}</label
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
