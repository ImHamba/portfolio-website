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
                    <button>Code</button>
                </a>
                <a class="button-wrapper" href={liveLink} target="_blank">
                    <button>Live Demo</button>
                </a>
            </div>
        </div>
    </div>
</Modal>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

    .modal-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .modal-visual-wrapper {
        width: 100%;
        height: 100%;

        padding: 20px;
        box-sizing: border-box;
        background-color: #e5e5e5ff;
    }

    .modal-visual {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .text-wrapper {
        width: 100%;
        height: 100%;
        flex-basis: 70%;

        display: flex;
        flex-direction: column;

        box-sizing: border-box;
        padding: 3%;
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
    }

    .button-wrapper {
        margin: 0 5px;
    }

    .button-wrapper button {
        background-color: #f6f6f6ff;
        border: 1px solid black;
        border-radius: 4px;
        height: 48px;
        max-height: 100%;
        cursor: pointer;
        padding: 5px 15px;
        margin: 0;
        text-align: center;
        transition: all var(--link-hover-time) ease-in-out;
    }

    .button-wrapper button:hover {
        background-color: #e5e5e5ff;
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
