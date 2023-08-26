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
        <!-- <div class="images-backing">
            <div class="images-grid">
                <img src="./images/personal/about1.jpg" />
                <img src="./images/personal/about1.jpg" />
                <img src="./images/personal/about1.jpg" />
            </div>
        </div> -->

        <div class="single-image-backing">
            <img src="./images/personal/about1.jpg" />
        </div>
    </div>

    <div slot="title">
        <h1 class="shrink" in:redact>About Me</h1>
        <!-- <GlitchText layers={3} initialGlitchEnabled={false}> -->
        <h3 class="shrink sub-title" in:redact>Dennis Rigon</h3>
        <!-- </GlitchText> -->
    </div>
</SplitPageSegment>

<style>
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

    .single-image-backing {
        margin: 30px 20px 10px 20px;
        align-self: center;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 0 8px #000000b1;
        height: 400px;
        width: 70%;
    }

    .single-image-backing img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 65%;
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
        .single-image-backing {
            margin: 15px 8px 10px 8px;
            width: 100%;
        }

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
