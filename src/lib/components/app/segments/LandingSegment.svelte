<script>
    import { onMount } from "svelte";
    import { getCSSvariable } from "../../../functions/util";
    import GlitchText from "../../generic/GlitchText.svelte";
    import PageSegment from "../../generic/PageSegment.svelte";
    import SpecialButton from "../../generic/SpecialButton.svelte";
    import WavesContainer from "../WavesContainer.svelte";
</script>

<PageSegment id="home">
    <div class="landing-wrapper">
        <div class="panel-wrapper">
            <div class="text-panel">
                <div id="pre-name">
                    <!-- <h2>Welcome!</h2> -->
                    <h2>Hello! My name is</h2>
                </div>
                <div class="name-wrapper">
                    <div>
                        <GlitchText layers="5" glitchSize="15" glitchShift="30">
                            <div class="name-wrapper">
                                <h1 class="name">DENNIS RIGON</h1>
                                <h1 class="name shadow1">DENNIS RIGON</h1>
                            </div>
                        </GlitchText>
                    </div>
                    <h1 class="name shadow2">DENNIS RIGON</h1>
                </div>

                <h3 id="post-name">
                    I'm a software developer with a passion for all things
                    coding and tech, with a previous background in engineering
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
                    class="portrait"
                    src="./images/portrait.jpg"
                    alt="portrait of Dennis"
                />
            </div>
        </div>

        <WavesContainer />

        <div class="dot-matrix-layer1">
            <div class="dot-matrix-layer2">
                <div class="vcr-mask">
                    <div class="vcr-layer" />
                </div>
            </div>
        </div>
    </div>
</PageSegment>

<style>
    .landing-wrapper {
        width: 100%;
        min-height: inherit;
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;
    }

    .dot-matrix-layer1 {
        z-index: -1;
        height: 100%;
        width: 100%;

        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        -webkit-mask-image: linear-gradient(
            to right,
            black,
            #00000020 15%,
            transparent 30%,
            transparent 70%,
            #00000020 85%,
            black
        );
    }
    .dot-matrix-layer2 {
        height: 100%;
        width: 100%;

        -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 10%,
            black 50%,
            transparent 70%,
            transparent 80%
        );

        background-image: radial-gradient(var(--accent3) 20%, transparent 28%);
        background-size: 3vh 3vh;
    }

    @media screen and (max-width: 900px) {
        .dot-matrix-layer1 {
            -webkit-mask-image: linear-gradient(
                to right,
                black,
                transparent 35%,
                transparent 65%,
                black
            );
        }
        .dot-matrix-layer2 {
            -webkit-mask-image: linear-gradient(
                to bottom,
                transparent 0%,
                transparent 10%,
                black 50%,
                transparent 80%,
                transparent 100%
            );
        }
    }

    .vcr-layer {
        height: 100%;
        width: 100%;
        filter: blur(2px);

        --stripe-size: 4px;

        background: linear-gradient(
            #ffffff50,
            #ffffff99 var(--stripe-size),
            transparent var(--stripe-size),
            transparent calc(3 * var(--stripe-size))
        );
        background-size: 100% calc(3 * var(--stripe-size));

        animation: scroll-vcr 200s infinite linear,
            pulse-opacity 10s infinite linear;
    }

    .vcr-mask {
        height: 100%;
        width: 100%;

        animation: scroll-mask 4s infinite linear;

        -webkit-mask-image: linear-gradient(
            to bottom,
            black 0% 35%,
            #00000011 50%,
            black 65% 100%
        );

        -webkit-mask-size: 100% 250%;
    }

    @keyframes scroll-vcr {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: 0% 100%;
        }
    }

    @keyframes pulse-opacity {
        0% {
            opacity: 100%;
        }
        50% {
            opacity: 50%;
        }
        100% {
            opacity: 100%;
        }
    }

    @keyframes scroll-mask {
        0% {
            -webkit-mask-position: 0% 0%;
        }
        100% {
            -webkit-mask-position: 0% 100%;
        }
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

    #pre-name * {
        font-family: "Fira Code";
    }

    #pre-name h2::before {
        content: "⚡";
        margin-right: 0.3em;
    }

    .name-wrapper {
        width: fit-content;
        display: grid;
        grid-template-columns: 1fr;
    }

    .name-wrapper > * {
        grid-row-start: 1;
        grid-column-start: 1;
    }

    .name {
        font-size: 4.9em;
        /* letter-spacing: 0.12em; */
        margin: 0;
        padding: 0px 20px 10px 20px;
        color: var(--accent5);
        margin-left: -2px;
        /* font-family: "GlitchGoblin"; */
    }

    .shadow1 {
        text-shadow: #11d2d2ff 3px 3px 0px;
    }

    .shadow2 {
        color: #00000000;
        text-shadow: black 2px 2px 30px, black 2px 2px 20px;
    }

    @media screen and (max-width: 900px) {
        .name {
            font-size: 4em;
            padding: 0px 10px 10px 10px;
        }
    }

    #post-name {
        font-family: "Fira Code";
    }

    #post-name::after {
        margin-left: 3px;
        content: "_";
        animation: blink 1.5s infinite;
    }

    @keyframes blink {
        0%,
        50% {
            opacity: 1;
        }

        51%,
        100% {
            opacity: 0;
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
