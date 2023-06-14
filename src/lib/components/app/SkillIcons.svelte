<script lang="ts">
    import { fade } from "svelte/transition";
    import { range } from "../../functions/util";
    import SkillIcon from "./../generic/SkillIcon.svelte";
    import { flipTransition } from "../../functions/flipTransition";
    import CreateOnScrollWrapper from "../generic/CreateOnScrollWrapper.svelte";

    let scroll: number;

    // paths to icons for technologies
    let iconPaths = [
        ["Python", "./images/technologies/python-icon.svg"],
        ["Javascript", "./images/technologies/javascript-icon.svg"],
        ["Typescript", "./images/technologies/typescript-icon.svg"],
        ["Java", "./images/technologies/java-icon.svg"],

        ["Html", "./images/technologies/html-icon.svg"],
        ["CSS", "./images/technologies/css-icon.svg"],
        ["Svelte", "./images/technologies/svelte-icon.svg"],
        null,

        ["Git", "./images/technologies/git-icon.svg"],
        ["Github", "./images/technologies/github-icon.svg"],
    ];

    const cols = 4;
    const rows = Math.ceil(iconPaths.length / cols);

    // fill iconPaths up to a multiple of cols with dummy elements to keep grid aligned
    iconPaths = iconPaths.concat(
        new Array(cols - (iconPaths.length % cols)).fill(null)
    );

    const rowColToN = (row: number, col: number) => {
        return row * cols + col;
    };
</script>

<svelte:window bind:scrollY={scroll} />

<CreateOnScrollWrapper
    topLimitCreate={0.2}
    btmLimitCreate={0.2}
    {...$$restProps}
>
    <div class="wrapper">
        <div class="grid">
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
                                        imgPath={iconPaths[
                                            rowColToN(row, col)
                                        ][1]}
                                    />
                                    {iconPaths[rowColToN(row, col)][0]}
                                </div>
                            {:else}
                                <SkillIcon dummy={true} />
                            {/if}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</CreateOnScrollWrapper>

<style>
    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
    }

    .grid {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-right: 15%;
    }

    @media screen and (max-width: 600px) {
        .grid {
            margin-right: 0px;
        }
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
        flex-direction: column;
        background-color: #f7f7f7;
        border-radius: 15%;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border: 2px grey solid;
    }
</style>
