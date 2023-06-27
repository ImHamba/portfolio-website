<script lang="ts">
    import { fade } from "svelte/transition";
    import SkillIcon from "./../generic/SkillIcon.svelte";
    import { flipTransition } from "../../functions/flipTransition";
    import CreateOnScrollWrapper from "../generic/CreateOnScrollWrapper.svelte";

    let pageWidth: number;
    let scroll: number;

    // paths to icons for technologies
    let iconPaths = [
        [
            { name: "Python", path: "./images/technologies/python-icon.svg" },
            {
                name: "Javascript",
                path: "./images/technologies/javascript-icon.svg",
            },
            {
                name: "Typescript",
                path: "./images/technologies/typescript-icon.svg",
            },
            { name: "Java", path: "./images/technologies/java-icon.svg" },
        ],

        [
            { name: "Html", path: "./images/technologies/html-icon.svg" },
            { name: "CSS", path: "./images/technologies/css-icon.svg" },
            { name: "Svelte", path: "./images/technologies/svelte-icon.svg" },
        ],

        [
            { name: "Git", path: "./images/technologies/git-icon.svg" },
            { name: "Github", path: "./images/technologies/github-icon.svg" },
        ],
    ];

    function easeInOutQuad(x: number): number {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
</script>

<svelte:window bind:scrollY={scroll} bind:innerWidth={pageWidth} />

<CreateOnScrollWrapper {...$$restProps} alwaysVisible={pageWidth <= 500}>
    <div class="wrapper1">
        <div class="wrapper2">
            {#each iconPaths as iconSegment, row}
                <div class="segment scroll" transition:fade={{ duration: 100 }}>
                    {#each iconSegment as icon, col}
                        <div
                            class="tile"
                            in:flipTransition={{
                                delay: 200 * row + 100 * col,
                                flipDuration1: 400,
                                flipDuration2: 400,
                                ease: easeInOutQuad,
                            }}
                            out:fade
                        >
                            <SkillIcon imgPath={icon.path} />
                            <div>{icon.name}</div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</CreateOnScrollWrapper>

<style>
    .wrapper1 {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper2 {
        display: flex;
        width: fit-content;
        height: fit-content;
        flex-direction: column;
        padding: 0;
        margin: 0;
    }

    .segment {
        width: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin: 5px;
        padding: 10px;
        background-color: #f2f2f2;
        border-radius: 20px;

        perspective: 50rem;
    }

    @media screen and (max-width: 500px) {
        .wrapper2 {
            width: 100%;
        }
        .segment {
            width: 100%;
            align-items: start;
            flex-wrap: nowrap;
        }

        .scroll {
            overflow-x: auto;
        }

        .scroll::-webkit-scrollbar {
            height: 4px;
        }

        .scroll::-webkit-scrollbar-track {
            background: none;
            margin: 0 20px;
        }

        .scroll::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #d9d9d9ff;
        }
    }

    .tile {
        --tile-size: 7vw;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #f7f7f7;
        border-radius: 15%;
        width: var(--tile-size);
        height: var(--tile-size);

        border: 2px grey solid;
        margin: 5px;
        flex-shrink: 0;

        transform-style: preserve-3d;
    }

    .tile > div {
        padding: 0;
        margin: 0;
        backface-visibility: hidden;
    }

    @media screen and (max-width: 1500px) {
        .tile {
            --tile-size: 8vw;
        }
    }
    @media screen and (max-width: 1200px) {
        .tile {
            --tile-size: 9vw;
        }
    }
    @media screen and (max-width: 900px) {
        .tile {
            --tile-size: 15vw;
        }
    }
    @media screen and (max-width: 500px) {
        .tile {
            --tile-size: 25vw;
        }
    }
</style>
