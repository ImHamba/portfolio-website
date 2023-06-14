<script>
    import { onMount } from "svelte";
    import { redact } from "../../functions/redactTransition";

    import CentredContainer from "./CentredContainer.svelte";
    import { fade } from "svelte/transition";

    let visible = false;
    export let number = "undefined page number";
    export let fadeOut = true;

    let scroll;

    let panel;
    let absPos = null;
    let fullHeight;
    let relPos;

    // determine position of panel on the site at initialisation
    onMount(() => {
        const rect = panel.getBoundingClientRect();
        absPos = (rect.top + rect.bottom) / 2 + scroll;
        fullHeight = rect.bottom - rect.top;
    });

    // update position of panel relative to viewport when user scrolls
    // sets visible to true when the centre of panel is visible on screen
    $: {
        if (absPos != null) {
            relPos = (scroll + fullHeight - absPos) / fullHeight;
            visible = relPos >= 0 && relPos < 1;
            // console.log(scroll, absPos, fullHeight, relPos, visible);
        }
    }

    // update absPos and fullHeight if bounding rectangle changes due to window resize
    $: {
        if (absPos != null) {
            const rect = panel.getBoundingClientRect();
            absPos = (rect.top + rect.bottom) / 2 + scroll;
            fullHeight = rect.bottom - rect.top;
        }
    }

    // specify transition out animation depending on whether fade prop is true or false
    const transitionOut = fadeOut
        ? (node) => fade(node, { duration: 150 })
        : () => {};
</script>

<svelte:window bind:scrollY={scroll} />

<div class="panel" bind:this={panel}>
    {#if visible}
        <div class="number" in:redact>
            {number}
        </div>
        <div class="title" out:transitionOut>
            <slot />
        </div>
    {/if}
</div>

<style>
    .panel {
        height: 100%;
        width: 100%;
    }

    .title {
        position: fixed;
        top: 40%;
        left: 15%;
        width: 30%;
    }

    .number {
        position: fixed;
        top: 8%;
        left: 5%;
    }

    @media screen and (max-width: 600px) {
        .title {
            position: relative;
            top: 40%;
            left: 15%;
            width: 70%;
        }

        .number {
            position: relative;
            top: 15%;
            left: 5%;
            width: fit-content;
        }
    }
</style>
