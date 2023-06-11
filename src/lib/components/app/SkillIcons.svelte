<script>
    import { fade } from "svelte/transition";
    import { range } from "../../functions/util";
    import SkillIcon from "./../generic/SkillIcon.svelte";
    import { onMount } from "svelte";
    import { flipTransition } from "../../functions/flipTransition";

    let scroll;

    // paths to icons for technologies
    let iconPaths = [
        "./images/technologies/python-icon.svg",
        "./images/technologies/javascript-icon.svg",
        "./images/technologies/typescript-icon.svg",
        "./images/technologies/java-icon.svg",

        "./images/technologies/html-icon.svg",
        "./images/technologies/css-icon.svg",
        "./images/technologies/svelte-icon.svg",
        null,

        "./images/technologies/git-icon.svg",
        "./images/technologies/github-icon.svg",
    ];

    const cols = 4;
    const rows = Math.ceil(iconPaths.length / cols);

    // fill iconPaths up to a multiple of cols with dummy elements to keep grid aligned
    iconPaths = iconPaths.concat(
        new Array(cols - (iconPaths.length % cols)).fill(null)
    );

    let visible = false;
    let grid;
    let absPos = null;
    let fullHeight;
    let relPos;

    // determine position of panel on the site at initialisation
    onMount(() => {
        const rect = grid.getBoundingClientRect();
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
            const rect = grid.getBoundingClientRect();
            absPos = (rect.top + rect.bottom) / 2 + scroll;
            fullHeight = window.innerHeight;
        }
    }

    const rowColToN = (row, col) => {
        return row * cols + col;
    };
</script>

<svelte:window bind:scrollY={scroll} />

<div class="wrapper" bind:this={grid}>
    {#if visible}
        {#each range(0, rows) as row}
            <div class="row" style:aspect-ratio={cols}>
                {#each range(0, cols) as col}
                    <div class="col">
                        {#if iconPaths[rowColToN(row, col)] != null}
                            <div
                                class="tile"
                                in:flipTransition={{
                                    delay: col * 200 + row * 400,
                                    flipDuration1: 0,
                                    flipDuration2: 500,
                                }}
                                out:fade
                            >
                                <SkillIcon
                                    imgPath={iconPaths[rowColToN(row, col)]}
                                />
                            </div>
                        {:else}
                            <SkillIcon dummy={true} />
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-right: 15%;
    }

    .row {
        display: flex;
        width: 100%;
        align-items: center;
    }

    .col {
        display: flex;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-grow: 1;
        aspect-ratio: 1;
        margin: 1%;

        transform-style: preserve-3d;
        perspective: 1000px;
    }

    .tile {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;
        border-radius: 15%;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border: 2px grey solid;
    }
</style>
