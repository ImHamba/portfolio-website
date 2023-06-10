<script>
    import { onMount } from "svelte";
    import { redact } from "../../functions/redactTransition";

    import CentredContainer from "./CentredContainer.svelte";
    import { fade } from "svelte/transition";

    let visible = false;
    export let number = "undefined page number";

    let scroll;

    let panel;
    let absPos = null;
    let fullHeight;
    let relPos;

    // determine position of panel on the site at initialisation
    onMount(() => {
        const rect = panel.getBoundingClientRect();
        console.log(rect.top, rect.bottom);
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
</script>

<svelte:window bind:scrollY={scroll} />

<div class="panel" bind:this={panel}>
    {#if visible}
        <CentredContainer>
            <div class="title">
                <slot />
            </div>
        </CentredContainer>

        <div class="number" in:redact>
            {number}
        </div>
    {/if}
</div>

<style>
    .panel {
        height: 100%;
    }

    .title {
        position: fixed;
        top: 43%;
    }

    .number {
        position: fixed;
        top: 5%;
        left: 3%;
    }
</style>
