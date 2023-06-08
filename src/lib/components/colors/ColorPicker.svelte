<script lang="ts">
  import { Color, ColorInput, Position } from 'color-picker-svelte';
  import { foregroundColor, backgroundColor } from '$lib/stores';

  export let color: string;
  export let title: string;

  let hexColor = new Color(color);
  let position: Position = Position.Above;

  function handleChangeColor(): void {
    if (title === 'foreground') {
      foregroundColor.set(hexColor.toHexString());
    }

    if (title === 'background') {
      backgroundColor.set(hexColor.toHexString());
    }
  }
</script>

<ColorInput bind:color={hexColor} {title} bind:position onInput={handleChangeColor} />
