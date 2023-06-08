<script lang="ts">
  import ColorPicker from '$lib/components/colors/ColorPicker.svelte';
  import { foregroundColor, backgroundColor } from '$lib/stores';
</script>

<div class="flex flex-cols gap-1 w-96 my-2">
  <ColorPicker color={$foregroundColor} title="foreground" />
  <ColorPicker color={$backgroundColor} title="background" />
</div>
