<script lang="ts">
    export let title = "";
    export let content = "";
    export let imagePath: string;
    export let githubLink: string;
    export let liveLink: string;
</script>

<div class="tile-wrapper">
    <div class="tile">
        <img class="image" src={imagePath} alt="portfolio" />

        <div class="text-container dimmer">
            <div class="title">
                <h3>{title}</h3>
            </div>
            <div class="content">
                {content}
            </div>

            <div class="links">
                <a href={githubLink} target="_blank">
                    <img
                        class="link-img"
                        src="./images/github-white-icon.svg"
                        alt="github"
                    />
                </a>

                <a class="button-wrapper" href={liveLink} target="_blank">
                    <button>Live Demo</button>
                </a>
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
    }

    .tile {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #f7f7f7;
        border-radius: 25px;
        width: 70%;
        min-width: 200px;
        height: min-content;
        aspect-ratio: 4/3;
        border: 2px grey solid;
        overflow: hidden;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: blur(3px);
        transition: all var(--hover-time) ease-in-out;
    }

    .text-container {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: 0 10% 10% 10%;
        text-align: center;
        transition: all var(--hover-time) ease-in-out;
    }

    .title {
        height: 30%;
        width: 100%;
        text-align: center;
        color: white;
    }

    .content {
        display: block;
        height: 50%;
        width: 100%;
        color: white;
        overflow: hidden;
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

    .links {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 20%;
    }

    .link-img {
        width: 100%;
        height: 100%;
        padding: 0 10px 0 10px;
        transition: all var(--link-hover-time) ease-in-out;
    }

    .link-img:hover {
        transform: scale(var(--link-hover-scale));
    }

    .button-wrapper {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .button-wrapper button {
        background-color: #23b1ca;
        border: none;
        border-radius: 25px;
        height: 48px;
        max-height: 100%;
        cursor: pointer;
        color: white;
        padding: 5px 15px;
        margin: 0;
        text-align: center;
        transition: all var(--link-hover-time) ease-in-out;
    }

    .button-wrapper button:hover {
        transform: scale(var(--link-hover-scale));
    }
</style>
