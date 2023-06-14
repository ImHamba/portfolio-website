<script lang="ts">
    export let topLimitCreate: number = 0;
    export let topLimitDestroy: number = 0;
    export let btmLimitCreate: number = 0;
    export let btmLimitDestroy: number = 0;

    export let rectBtmOverride: number = null;

    export let debug = false;

    let panel: HTMLElement = null;
    let visible = false;
    let scroll: number;
    let windowHeight: number;

    // update position of panel relative to viewport when user scrolls
    // sets visible to true when the centre of panel is visible on screen
    $: {
        scroll; // trigger updates upon scroll

        if (panel != null) {
            const rect = panel.getBoundingClientRect();
            let rectHeight: number;

            // use either rectangle bottom or the bottom override
            let rectBtm =
                rectBtmOverride != null ? rectBtmOverride : rect.bottom;

            if (debug) console.log(rectBtmOverride, rect.bottom);
            rectHeight = rectBtm - rect.top;

            const midScreenPos = windowHeight / 2;
            let topLimit: number;
            let btmLimit: number;

            // if element is already visible, determine when its visibility based on the destroy limit proportions
            if (visible) {
                topLimit = rect.top + rectHeight * topLimitDestroy;
                btmLimit = rectBtm - rectHeight * btmLimitDestroy;
            }
            // otherwise determine its visibility based on the creation limit proportions
            else {
                topLimit = rect.top + rectHeight * topLimitCreate;
                btmLimit = rectBtm - rectHeight * btmLimitCreate;
            }

            visible = btmLimit > midScreenPos && topLimit < midScreenPos;
        }
    }
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={windowHeight} />

<div class="panel" bind:this={panel}>
    {#if visible}
        <slot />
    {/if}
</div>

<style>
    .panel {
        height: 100%;
        width: 100%;
    }
</style>
