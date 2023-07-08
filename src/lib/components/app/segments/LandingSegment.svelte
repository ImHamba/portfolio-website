<script>
    import { getCSSvariable } from "../../../functions/util";
    import PageSegment from "../../generic/PageSegment.svelte";
    import SpecialButton from "../../generic/SpecialButton.svelte";
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
                <div>
                    <SpecialButton
                        --color1={getCSSvariable("accent5")}
                        --color2="#a88f00"
                    >
                        <a class="btn-content" href="#portfolio">
                            <img
                                src="./images/down-arrow-icon.svg"
                                alt="down arrow"
                            />
                            <h4 class="prompt-text">See my projects</h4>
                        </a>
                    </SpecialButton>
                </div>
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
            padding-right: var(--mobile-right-margin);
            padding-left: var(--mobile-left-margin);
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
        margin: 0;
        padding: 0;
        border: none;
        color: var(--accent5);
        margin-left: -2px;
    }

    @media screen and (max-width: 900px) {
        #name {
            font-size: 3em;
        }
    }

    .btn-content {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 5px 20px;
    }

    .btn-content img {
        overflow: hidden;
        height: 2.5em;
        width: 2.5em;
        animation: bob 5s infinite;
        transition: all 0.3s ease-in-out 0s;
        margin-right: 5px;
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
        color: var(--txt-dark);
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
        border-radius: 15px;
        border: 2px black solid;
        box-shadow: 10px 10px 3px #000000ba;
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
