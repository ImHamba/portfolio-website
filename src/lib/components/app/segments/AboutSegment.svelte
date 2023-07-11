<script>
    import { redact } from "../../../functions/redactTransition";
    import GlitchText from "../../generic/GlitchText.svelte";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";
</script>

<SplitPageSegment {...$$restProps} id="about">
    <div class="about-wrapper" slot="content">
        <p>
            Hi, I'm Dennis. Thanks for taking the time to look around my
            website.
        </p>
        <p>
            I'm a junior software developer but my professional career started
            in structural engineering. In engineering I missed the satisfaction
            that came from seeing the direct results of my work, like I
            experienced in my coding projects, so in 2022 I pivoted my career to
            software development. I bring the problem solving skills engineers
            are known for, and my natural aptitude for logical thinking to build
            smart and elegant code.
        </p>
        <p>
            When I'm not at my computer, I enjoy playing a casual game of
            badminton, cooking foods from different cuisines, and travelling.
        </p>
        <div class="images-backing">
            <div class="images-grid">
                <img src="./images/personal/about1.jpg" />
                <img src="./images/personal/about1.jpg" />
                <img src="./images/personal/about1.jpg" />
            </div>
        </div>

        <!-- <div class="images-container">
            <div class="card" />
            <div class="card" />
            <div class="card" />
        </div> -->
    </div>

    <div slot="title">
        <h1 class="shrink" in:redact>About Me</h1>
        <GlitchText layers={3} initialGlitchEnabled={false}>
            <h3 class="shrink sub-title" in:redact>Dennis Rigon</h3>
        </GlitchText>
    </div>
</SplitPageSegment>

<style>
    /* .images-container {
        width: 100%;
        height: 400px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        place-items: center;

        overflow: visible;
        margin: 50px 0px;
    }

    .card {
        grid-row-start: 1;
        grid-column-start: 1;
        height: 80%;
        width: min(40vw, 250px);
        border-radius: 10px;
        background-image: url("../images/personal/about1.jpg");
        background-size: cover;
        background-position: center;
        background-color: #00000022;
        box-shadow: 0 0 8px #000000b1;

        transition: transform 500ms cubic-bezier(0.05, 0.43, 0.25, 0.95);
    }

    .card:nth-child(1) {
        transform: translate(45%, 5%) rotate(20deg);
    }
    .card:nth-child(2) {
        transform: translate(0%, -4%) rotate(2deg);
    }
    .card:nth-child(3) {
        transform: translate(-45%, 6%) rotate(-20deg);
    }

    .images-container:hover > .card:nth-child(1) {
        transform: translate(100%, -15%) rotate(10deg);
    }
    .images-container:hover > .card:nth-child(2) {
        transform: translate(0%, 15%) rotate(5deg);
    }
    .images-container:hover > .card:nth-child(3) {
        transform: translate(-100%, -15%) rotate(-10deg);
    }

    @media screen and (max-width: 900px) {
        .card:nth-child(1) {
            transform: translate(45%, 5%) rotate(12deg);
        }
        .card:nth-child(2) {
            transform: translate(0%, -4%) rotate(2deg);
        }
        .card:nth-child(3) {
            transform: translate(-45%, 6%) rotate(-12deg);
        }

        .images-container:hover > .card:nth-child(1) {
            transform: translate(55%, -25%) rotate(5deg);
        }
        .images-container:hover > .card:nth-child(2) {
            transform: translate(5%, 15%) rotate(7deg);
        }
        .images-container:hover > .card:nth-child(3) {
            transform: translate(-55%, -15%) rotate(-5deg);
        }
    } */

    .shrink {
        width: fit-content;
    }

    .about-wrapper {
        font-size: 1.3em;
        line-height: 1.3em;
        display: flex;
        flex-direction: column;
        min-height: inherit;
        height: 100%;
        width: 100%;
        justify-content: center;
    }

    @media screen and (max-width: 900px) {
        .about-wrapper {
            font-size: 1em;
            line-height: 1.25em;
            justify-content: start;
        }

        .about-wrapper p {
            font-size: 1em;
        }
    }

    .images-backing {
        margin: 30px 20px 10px 20px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 0 8px #000000b1;
    }

    .images-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 400px;
    }

    .images-grid img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 900px) {
        .images-backing {
            margin: 15px 8px 10px 8px;
        }
        .images-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 180px;
        }

        .images-grid img:nth-child(2) {
            grid-row: span 2;
        }
    }

    .sub-title {
        margin: 0px;
    }
</style>
