<script>
    import { fade } from "svelte/transition";
    import Waves from "./Waves.svelte";
    import CreateOnScrollWrapper from "../generic/CreateOnScrollWrapper.svelte";
</script>

<div class="container">
    <CreateOnScrollWrapper btmLimitCreate="0.3">
        <div in:fade={{ duration: 150 }} out:fade>
            <Waves />
        </div>
    </CreateOnScrollWrapper>
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
