<script>
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import Waves from "./Waves.svelte";

    let scroll;
    let visible = false;
    let container;
    let absPos = null;
    let fullHeight;
    let relPos;

    // determine position of panel on the site at initialisation
    onMount(() => {
        const rect = container.getBoundingClientRect();
        absPos = rect.top + scroll;
        fullHeight = window.innerHeight;
    });

    // update position of panel relative to viewport when user scrolls
    // sets visible to true when the centre of panel is visible on screen
    $: {
        if (absPos != null) {
            relPos = (scroll + fullHeight - absPos) / fullHeight;
            visible = relPos >= 0.2 && relPos < 0.85;
        }
    }

    // update absPos and fullHeight if bounding rectangle changes due to window resize
    $: {
        if (absPos != null) {
            const rect = container.getBoundingClientRect();
            absPos = (rect.top + rect.bottom) / 2 + scroll;
            fullHeight = window.innerHeight;
        }
    }
</script>

<svelte:window bind:scrollY={scroll} />

<div class="container" bind:this={container}>
    {#if visible}
        <div out:fade><Waves /></div>
    {/if}
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
