<script lang="ts">
  import { quietZone } from '$lib/stores';
</script>

<div class="flex flex-col my-2">
  <label for="size" class="uppercase font-bold">Margin: <span />{$quietZone}</label>
  <input type="range" name="size" id="scale" min="0" max="5" bind:value={$quietZone} />
</div>
