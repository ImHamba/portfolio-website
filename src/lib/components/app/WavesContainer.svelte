<script>
    import { fade } from "svelte/transition";
    import Waves from "./Waves.svelte";
    import CreateOnScrollWrapper from "../generic/CreateOnScrollWrapper.svelte";
</script>

<div id="waves-container">
    <Waves />
</div>

<style>
    #waves-container {
        grid-row-start: 1;
        grid-column-start: 1;

        grid-template-columns: 1fr;
        z-index: -1;
    }
</style>
