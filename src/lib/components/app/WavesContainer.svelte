<script>
    import { fade } from "svelte/transition";
    import Waves from "./Waves.svelte";
    import CreateOnScrollWrapper from "../generic/CreateOnScrollWrapper.svelte";
</script>

<div class="container">
        <div >
            <Waves />
        </div>
</div>

<style>
    .container {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>
