<script lang="ts">
    import { scale } from '../stores';
</script>

<div class="flex flex-col my-2">
    <label for="size" class="uppercase font-bold"
        >Size: <span />{$scale}</label
    >
    <input
        type="range"
        name="size"
        id="scale"
        min="1"
        max="100"
        bind:value={$scale}
    />
</div>
