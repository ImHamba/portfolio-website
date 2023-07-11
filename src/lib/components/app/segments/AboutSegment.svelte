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
            I'm currently studying Computer Science at Monash University, but I
            started my professional career in structural engineering. While it
            was mentally stimulating and I enjoyed the inter-disciplinary team
            based work towards a unified design, in engineering I couldn't help
            but miss the satisfaction that came from seeing the direct results
            of my work like I had from my personal coding projects.
        </p>
        <p>
            Ever since I was young I have had an interest in programming and
            computers, and my mind always naturally thinks about how to automate
            and optimise everything I encounter, so in 2022 I took the plunge
            and pivoted my career to software development. I aim to bring the
            problem solving skills engineers are known for, my previous
            professional workplace experience, and my natural aptitude for
            logical thinking and coding in my new career as a software
            developer.
        </p>
        <p>
            When I'm not at my computer, I enjoy playing a casual game of
            badminton, cooking foods from different cuisines, and travelling.
        </p>
        <div class="images-backing">
            <div class="images-grid">
                <img src="../images/personal/about1.jpg" />
                <img src="../images/personal/about1.jpg" />
                <img src="../images/personal/about1.jpg" />
            </div>
        </div>
    </div>

    <div slot="title">
        <h1 class="shrink" in:redact>About Me</h1>
        <GlitchText layers={3} initialGlitchEnabled={false}>
            <h3 class="shrink sub-title" in:redact>Dennis Rigon</h3>
        </GlitchText>
    </div>
</SplitPageSegment>

<style>
    .shrink {
        width: fit-content;
    }

    .about-wrapper {
        display: flex;
        flex-direction: column;
        min-height: inherit;
        height: 100%;
        width: 100%;
        justify-content: center;
    }

    @media screen and (max-width: 900px) {
        .about-wrapper {
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
