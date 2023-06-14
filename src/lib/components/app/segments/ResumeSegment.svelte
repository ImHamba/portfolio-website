<script>
    import { fade } from "svelte/transition";
    import { redact } from "../../../functions/redactTransition";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";
</script>

<SplitPageSegment
    {...$$restProps}
    id="resume"
    topLimitDestroy={0.1}
    topLimitCreate={0.1}
    btmLimitDestroy={0.2}
    btmLimitCreate={0.2}
>
    <div class="content" slot="content">
        <div />
    </div>

    <div class="title" slot="title">
        <div>
            <h1 class="shrink" in:redact>Resume</h1>
            <h3 class="shrink" in:redact>References available upon request</h3>
        </div>

        <div class="icon-container">
            <a href="./resume/Test pdf.pdf" target="_blank">
                <img
                    class="icon"
                    src="./images/pdf-icon.svg"
                    alt="resume"
                    in:fade
                />
            </a>
        </div>
    </div>
</SplitPageSegment>

<style>
    .title {
        display: flex;
    }

    .icon-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        padding-top: 5%;
    }

    .icon {
        height: 7vh;
        width: 7vh;
    }

    .shrink {
        width: fit-content;
        white-space: nowrap;
    }
</style>
