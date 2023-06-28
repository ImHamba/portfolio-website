<script>
    import PageSegment from "../../generic/PageSegment.svelte";
    import WavesContainer from "../WavesContainer.svelte";
</script>

<PageSegment id="home">
    <div class="landing-wrapper">
        <div class="panel-wrapper">
            <div class="text-panel">
                <div id="pre-name">
                    <h2>Hey there!</h2>
                    <h3>My name is</h3>
                </div>
                <h1 id="name">Dennis Rigon</h1>
                <h3 id="post-name">
                    I'm a developer with a passion for all things coding and
                    tech, with a previous background in engineering.
                </h3>
                <button class="projects-btn">
                    <a href="#portfolio">
                        <img
                            src="./images/down-arrow-icon.svg"
                            alt="down arrow"
                        />
                        <h4 class="prompt-text">See my projects</h4>
                    </a>
                </button>
            </div>
            <div class="image-panel">
                <img
                    class="portrait hexagon"
                    src="./images/portrait.jpg"
                    alt="portrait of Dennis"
                />
            </div>
        </div>
        <WavesContainer />
    </div>
</PageSegment>

<style>
    .landing-wrapper {
        width: 100%;
        min-height: inherit;
        display: grid;
        grid-template-columns: 1fr;
    }

    /* grid layout used to underlay waves canvas */
    .landing-wrapper > div {
        grid-row-start: 1;
        grid-column-start: 1;
    }

    .panel-wrapper {
        min-height: inherit;
        display: flex;
        padding: 0 15%;
        padding-bottom: 10%;

        margin-top: 60px;
        box-sizing: border-box;
    }

    @media screen and (max-width: 900px) {
        .panel-wrapper {
            flex-direction: column-reverse;
            justify-content: start;

            padding-bottom: 40%;
        }
    }

    .text-panel {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: end;
        text-align: end;
        flex-direction: column;

        /* color: var(--txt-light); */
    }

    @media screen and (max-width: 900px) {
        .text-panel {
            align-items: start;
            text-align: start;
        }
    }

    #pre-name {
        margin-bottom: 5px;
    }

    #name {
        font-size: 5em;
        margin-top: 0;
        color: var(--accent5);
    }

    @media screen and (max-width: 900px) {
        #name {
            font-size: 3em;
        }
    }

    .projects-btn {
        margin: 10px;
        border-radius: 15px;
        background-color: var(--accent5);
        padding: 5px 20px;
        border: none;
        box-shadow: #00000066 0 2px 4px, #0000004d 0 7px 13px -3px,
            #a88f00 0 -3px 0 inset;

        transition: all 0.1s ease-out 0s;
    }

    .projects-btn:hover {
        transform: translateY(-3px);
        box-shadow: #00000066 0 2px 4px, #0000004d 0 7px 13px,
            #a88f00 0 -3px 0 inset;
    }

    .projects-btn a {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .projects-btn img {
        overflow: hidden;
        height: 2.5em;
        width: 2.5em;
        animation: bob 5s infinite;
        transition: all 0.3s ease-in-out 0s;
    }

    @keyframes bob {
        0% {
            transform: translateY(-2px);
        }
        50% {
            transform: translateY(2px);
        }
        100% {
            transform: translateY(-2px);
        }
    }

    .prompt-text {
        color: black;
    }

    .image-panel {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .portrait {
        max-height: 60%;
        max-width: 60%;
        width: auto;
        height: auto;
        border-radius: 25px;
        box-shadow: 15px 15px 30px var(--accent1);
    }

    @media screen and (max-width: 1200px) {
        .portrait {
            max-height: 80%;
            max-width: 80%;
        }
    }

    @media screen and (max-width: 900px) {
        .portrait {
            max-height: 70%;
            max-width: 70%;
        }
    }

    @media screen and (max-width: 700px) {
        .portrait {
            max-height: 80%;
            max-width: 80%;
        }
    }

    @media screen and (max-width: 500px) {
        .portrait {
            max-height: 90%;
            max-width: 90%;
        }
    }
</style>
