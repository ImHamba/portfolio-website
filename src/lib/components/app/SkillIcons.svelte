<script lang="ts">
    import { fade } from "svelte/transition";
    import SkillIcon from "./../generic/SkillIcon.svelte";
    import { flipTransition } from "../../functions/flipTransition";
    import CreateOnScrollWrapper from "../generic/CreateOnScrollWrapper.svelte";

    let pageWidth: number;
    let scroll: number;

    // paths to icons for technologies
    let iconPaths = [
        {
            title: "Languages",
            links: [
                {
                    name: "Python",
                    path: "./images/technologies/python-icon.svg",
                },
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
        },

        {
            title: "Web",
            links: [
                { name: "Html", path: "./images/technologies/html-icon.svg" },
                { name: "CSS", path: "./images/technologies/css-icon.svg" },
                {
                    name: "Svelte",
                    path: "./images/technologies/svelte-icon.svg",
                },
            ],
        },

        {
            title: "Other tools",
            links: [
                { name: "Git", path: "./images/technologies/git-icon.svg" },
                {
                    name: "Github",
                    path: "./images/technologies/github-icon.svg",
                },
            ],
        },
    ];

    function easeInOutQuad(x: number): number {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
</script>

<svelte:window bind:scrollY={scroll} bind:innerWidth={pageWidth} />

<CreateOnScrollWrapper {...$$restProps} alwaysVisible={pageWidth <= 500}>
    <div class="wrapper1" out:fade>
        <div class="wrapper2">
            {#each iconPaths as iconSegment, row}
                <div class="segment">
                    <h3>{iconSegment.title}</h3>
                    <div class="icon-container scroll">
                        {#each iconSegment.links as icon, col}
                            <div
                                class="tile"
                                in:flipTransition={{
                                    delay: 200 * row + 100 * col,
                                    flipDuration1: 400,
                                    flipDuration2: 400,
                                    ease: easeInOutQuad,
                                }}
                            >
                                <SkillIcon imgPath={icon.path} />
                                <div id="skill-name">{icon.name}</div>
                            </div>
                        {/each}
                    </div>
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

        /* border-radius: 20px;
        box-shadow: 0 0 8px #0000009d; */
    }

    .segment {
        margin: 15px 0px 15px 10px;
        /* background: var(--grey-light); */
        background: linear-gradient(
            60deg,
            var(--grey-light) 80%,
            #f7f7f7b6 90%,
            #f7f7f7b6
        );
        /* background-image: linear-gradient(120deg, #ffd90093 0%, #ffd90093 80%, #ffd90015 80%, #ffd90015); */
        border-radius: 20px;
        box-shadow: 0 0 8px #00000075;
        overflow: hidden;

        animation: scroll-effect 1s ease-out;
    }

    @keyframes scroll-effect {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .segment h3 {
        margin: 15px 25px 0px;
        padding-right: 5px;

        width: fit-content;
        border-bottom: 4px var(--accent5) dashed;
    }

    .icon-container {
        width: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        perspective: 50rem;
        padding: 10px;
    }

    @media screen and (max-width: 500px) {
        .wrapper2 {
            width: 100%;
        }
        .icon-container {
            width: 100%;
            box-sizing: border-box;
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
            background: var(--custom-scrollbar-color);
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
