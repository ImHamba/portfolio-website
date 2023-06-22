<script lang="ts">
    import Modal from "./Modal.svelte";

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
                <a class="button-wrapper" href={githubLink} target="_blank">
                    <button>
                        <img src="./images/code-icon.svg" alt="code icon" />
                        <p>Code</p>
                    </button>
                </a>
                <a class="button-wrapper" href={liveLink} target="_blank">
                    <button>
                        <img src="./images/live-icon.svg" alt="code icon" />
                        <p>Live Demo</p>
                    </button>
                </a>
            </div>
        </div>
    </div>
</Modal>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

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
        background-color: #e5e5e5ff;

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
    }

    @media screen and (max-width: 900px) {
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
    }

    .tags > div {
        margin: 7px;
        padding: 7px;
        border: 1px black solid;
        border-radius: 4px;
        font-family: "Fira Code", monospace;
        background-color: #f1f1f1ff;
        /* color: white; */
    }

    .about {
        text-align: start;
        margin: 10px 0;
        color: grey;
    }

    .description {
        flex: 1;
        font-family: "Fira Code", monospace;
        text-align: start;
        margin: 10px 0;
    }

    .buttons {
        display: flex;
        margin: 10px 0;

        flex-wrap: wrap;
    }

    @media screen and (max-width: 900px) {
        .buttons {
            margin: 0;
        }
    }

    .button-wrapper {
        margin: 5px;
    }

    .button-wrapper button {
        background-color: #f6f6f6ff;
        border: 1px solid black;
        border-radius: 4px;
        height: 48px;
        max-height: 100%;
        cursor: pointer;
        padding: 5px 0;
        margin: 0;
        text-align: center;
        transition: all var(--link-hover-time) ease-in-out;

        display: flex;
        align-items: center;
    }

    .button-wrapper button:hover {
        background-color: #e5e5e5ff;
    }

    .button-wrapper button img {
        width: 80%;
        height: 80%;

        padding: 0 10px 0 15px;
    }

    .button-wrapper button p {
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        white-space: nowrap;

        padding: 0 15px 0 0;
    }

    .scroll {
        overflow-y: auto;
    }
    .scroll::-webkit-scrollbar {
        width: 8px;
    }

    .scroll::-webkit-scrollbar-track {
        background: #f2f2f2ff;
        border-radius: 10px;
    }

    .scroll::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #d9d9d9ff;
    }
</style>
