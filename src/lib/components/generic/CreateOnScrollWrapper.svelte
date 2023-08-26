<script lang="ts">
    export let topLimitCreate: number = 0;
    export let topLimitDestroy: number = 0;
    export let btmLimitCreate: number = 0;
    export let btmLimitDestroy: number = 0;

    export let rectBtmOverride: number = null;
    export let rectTopOverride: number = null;

    export let alwaysVisible = false;
    export let stayVisible = false;

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

            // use either rectangle btm/top or the override values
            const rectBtm =
                rectBtmOverride != null ? rectBtmOverride : rect.bottom;

            const rectTop =
                rectTopOverride != null ? rectTopOverride : rect.top;

            rectHeight = rectBtm - rect.top;

            const midScreenPos = windowHeight / 2;
            let topLimit: number;
            let btmLimit: number;

            // if element is already visible, determine when its visibility based on the destroy limit proportions
            if (visible) {
                topLimit = rectTop + rectHeight * topLimitDestroy;
                btmLimit = rectBtm - rectHeight * btmLimitDestroy;
            }
            // otherwise determine its visibility based on the creation limit proportions
            else {
                topLimit = rectTop + rectHeight * topLimitCreate;
                btmLimit = rectBtm - rectHeight * btmLimitCreate;
            }

            visible = btmLimit > midScreenPos && topLimit < midScreenPos;

            // if stayVisible setting is true, once element becomes visible for the first time, set it to remain visible
            if (visible && stayVisible) {
                alwaysVisible = true;
            }
        }
    }
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={windowHeight} />

<div class="panel" bind:this={panel}>
    {#if visible || alwaysVisible}
        <slot />
    {/if}
</div>

<style>
    .panel {
        height: 100%;
        width: 100%;
    }
</style>
