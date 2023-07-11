<script lang="ts">
    import { getCSSvariable } from "../../functions/util";
    import Modal from "./Modal.svelte";
    import SpecialButton from "./SpecialButton.svelte";

    export let title: string;
    export let description: string;
    export let modalVisualPath = "";

    export let liveLink: string;
    export let githubLink: string;

    export let tags: string[] = [];
</script>

<Modal {...$$restProps} on:click>
    <div class="modal-wrapper">
        <div class="modal-visual-wrapper">
            <img class="modal-visual" src={modalVisualPath} alt="portfolio" />
        </div>
        <div class="text-wrapper">
            <h2 class="title">{title}</h2>

            <div class="tags">
                {#each tags as tag}
                    <div>{tag}</div>
                {/each}
            </div>

            <h3 class="about">About</h3>

            <div class="description scroll">
                {description}
            </div>

            <div class="buttons">
                <div class="btn-wrapper">
                    <SpecialButton
                        --color1={getCSSvariable("grey-light")}
                        --color2="#b8b8b8"
                    >
                        <a
                            class="btn-content"
                            href={githubLink}
                            target="_blank"
                        >
                            <img src="./images/code-icon.svg" alt="code icon" />
                            <h4>Code</h4>
                        </a>
                    </SpecialButton>
                </div>

                <div class="btn-wrapper">
                    <SpecialButton
                        --color1={getCSSvariable("grey-light")}
                        --color2="#b8b8b8"
                    >
                        <a class="btn-content" href={liveLink} target="_blank">
                            <img src="./images/live-icon.svg" alt="code icon" />
                            <h4>Live Demo</h4>
                        </a>
                    </SpecialButton>
                </div>
            </div>
        </div>
    </div>
</Modal>

<style>
    * {
        box-sizing: border-box;
    }

    .modal-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
    }

    @media screen and (max-width: 900px) {
        .modal-wrapper {
            flex-direction: column;
        }
    }

    .modal-visual-wrapper {
        width: 100%;
        height: 100%;

        padding: 20px;
        background-color: var(--grey-light);

        flex: 1.5 1 0;
    }

    .modal-visual {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .text-wrapper {
        width: 100%;
        height: 100%;
        flex: 1 1 0;

        display: flex;
        flex-direction: column;

        padding: 3%;
        background-color: white;
    }

    @media screen and (max-width: 900px) {
        .text-wrapper {
            padding: 3% 5% 1% 5%;
        }
        .modal-visual-wrapper {
            height: 30%;
        }

        .text-wrapper {
            height: 70%;
        }
    }

    .title {
        text-align: start;
        margin: 10px 0;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0px;
    }

    .tags > div {
        margin: 7px 14px 7px 0px;
        padding: 7px 10px;
        border: 1px black solid;
        border-radius: 4px;
        font-family: "Fira Code", monospace;
        background-color: var(--grey-light);
    }

    @media screen and (max-width: 900px) {
        .tags {
            margin: 0;
        }
        .tags > div {
            margin: 4px 8px 4px 0px;
            padding: 4px 7px;
        }
    }

    .about {
        text-align: start;
        margin: 10px 0;
        color: grey;
    }

    .description {
        flex: 1;
        text-align: start;
        margin: 10px 0;
        padding-right: 10px;
        white-space: pre-wrap;
    }

    @media screen and (max-width: 900px) {
        .description {
            margin: 0;
        }
    }

    .buttons {
        display: flex;
        margin-top: 10px;

        flex-wrap: wrap;
    }

    @media screen and (max-width: 900px) {
        .buttons {
            margin: 0;
        }
    }

    .btn-wrapper {
        margin: 8px 10px;
    }

    .btn-content {
        height: 53px;
        max-height: 100%;
        cursor: pointer;
        padding: 0px 15px;
        margin: 0;
        text-align: center;

        display: flex;
        align-items: center;

        text-decoration: none;
        color: var(--txt-dark);
    }

    .btn-content img {
        width: 2.5em;
        height: 2.5em;

        padding-right: 10px;
    }

    .btn-content h4 {
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin: 0px;
    }

    @media screen and (max-width: 900px) {
        .btn-content {
            height: 45px;
            padding: 0px 10px;
        }
    }

    .scroll {
        overflow-y: auto;
    }
    .scroll::-webkit-scrollbar {
        width: 8px;
    }

    .scroll::-webkit-scrollbar-track {
        background: var(--grey-light);
        border-radius: 10px;
    }

    .scroll::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: var(--custom-scrollbar-color);
    }
</style>
