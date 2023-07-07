<script lang="ts">
    import PortfolioModal from "./PortfolioModal.svelte";

    export let title = "";
    export let description = "";
    export let imagePath: string;
    export let githubLink: string;
    export let liveLink: string;

    let showModal = false;

    const openModal = (e: Event) => {
        showModal = true;
    };

    const closeModal = (e: Event) => {
        showModal = false;
    };
</script>

<PortfolioModal
    visible={showModal}
    {title}
    {description}
    {liveLink}
    {githubLink}
    {...$$restProps}
    on:click={closeModal}
/>

<div class="tile-wrapper">
    <div class="tile">
        <img class="image" src={imagePath} alt="portfolio" />

        <div
            class="text-container dimmer"
            on:click={openModal}
            on:keypress={openModal}
        >
            <div class="title">
                <h3>{title}</h3>
            </div>
        </div>
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .tile-wrapper {
        --hover-time: 0.3s;
        --hover-scale: 1.05;
        --link-hover-time: 0.05s;
        --link-hover-scale: 1.05;

        display: flex;
        width: 100%;
        padding: 5%;
        justify-content: center;

        cursor: pointer;
    }

    .tile {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 25px;
        width: 70%;
        min-width: 200px;
        height: min-content;
        aspect-ratio: 4/3;
        border: 2px grey solid;
        overflow: hidden;
    }

    @media screen and (max-width: 1300px) {
        .tile {
            width: 100%;
        }
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        /* filter: blur(3px); */
        transition: all var(--hover-time) ease-in-out;
    }

    .text-container {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;

        justify-content: center;

        padding: 10%;
        transition: all var(--hover-time) ease-in-out;
    }

    .title {
        width: 100%;
        text-align: center;
        color: var(--txt-light);
        padding: 0 5%;
    }

    .dimmer {
        position: absolute;
        width: 101%;
        height: 101%;
        background-color: #00000088;
    }

    .dimmer:hover {
        background-color: #000000d8;
    }

    .tile:hover .image {
        transform: scale(var(--hover-scale));
    }

    .tile:hover .text-container {
        transform: scale(var(--hover-scale));
    }
</style>
