<script lang="ts">
    import { getCSSvariable } from "../../functions/util";
    import PortfolioModal from "./PortfolioModal.svelte";
    import SpecialButton from "./SpecialButton.svelte";

    export let title = "";
    export let shortDescription = "";
    export let description = "";
    export let imagePath: string;
    export let githubLink: string;
    export let liveLink: string;
    export let tags: string[] = [];

    let showModal = false;
    const body = document.body;

    const openModal = () => {
        showModal = true;

        body.style.overflowY = "hidden";

        // scroll = document.documentElement.scrollTop;
        // body.style.position = "fixed";
        // body.style.top = `-${scroll}px`;
        // body.style.overflowY = "scroll";
    };

    const closeModal = () => {
        showModal = false;

        // body.style.position = "static";
        body.style.overflowY = "auto";

        // document.documentElement.style.scrollBehavior = "auto";
        // document.documentElement.scrollTop = scroll + 100;
        // document.documentElement.scrollTop = scroll;
        // document.documentElement.style.scrollBehavior = "smooth";
    };
</script>

<PortfolioModal
    visible={showModal}
    {title}
    {description}
    {liveLink}
    {githubLink}
    {tags}
    {...$$restProps}
    on:click={closeModal}
/>

<div class="tile-box">
    <img src={imagePath} alt="screenshot of project" />
    <h3 class="title">{title}</h3>
    <div class="tags">
        {#each tags as tag}
            <div>{tag}</div>
        {/each}
    </div>
    <div class="description">
        {shortDescription}
    </div>
    <div class="btn-wrapper" on:click={openModal} on:keypress={openModal}>
        <SpecialButton --color1="#f4de61" --color2="#a49020">
            <h4 class="btn-txt">More Info</h4>
        </SpecialButton>
    </div>
</div>

<style>
    * {
        padding: 0;
        margin: 0;
        /* border: 1px black solid; */
    }

    .tile-box {
        display: flex;
        flex-direction: column;
        width: 70%;
        max-width: 500px;
        min-width: 350px;
        justify-content: center;
        align-items: center;
        margin: 30px 0px;
        border-radius: 15px;
        overflow: hidden;

        /* border: 3px grey solid; */
        box-shadow: 0 0 8px #0000009d;
    }

    @media screen and (max-width: 550px) {
        .tile-box {
            min-width: auto;
            width: 100%;
        }
    }

    .tile-box img {
        width: 100%;
        max-height: 250px;
        object-fit: cover;
        object-position: bottom;
    }

    .title {
        text-align: center;
        margin: 10px 20px 0px 20px;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        margin: 5px 20px;
        justify-content: center;
    }

    .tags > div {
        margin: 3px;
        padding: 3px 5px;
        border: 1px black solid;
        border-radius: 4px;
        font-family: "Fira Code", monospace;
        background-color: var(--grey-light);
    }

    .description {
        margin: 0 20px 10px 20px;
    }

    .btn-wrapper {
        max-width: 130px;
        margin: 0 15px 15px 15px;
    }

    .btn-txt {
        padding: 15px 20px;
    }
</style>
