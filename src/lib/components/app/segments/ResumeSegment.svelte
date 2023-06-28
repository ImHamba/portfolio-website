<script lang="ts">
    import { fade } from "svelte/transition";
    import { redact } from "../../../functions/redactTransition";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";

    let iconMode = true;

    const toggleMode = () => {
        iconMode = !iconMode;
    };
</script>

<SplitPageSegment
    {...$$restProps}
    id="resume"
    topLimitDestroy={0.1}
    topLimitCreate={0.1}
    btmLimitDestroy={0.2}
    btmLimitCreate={0.2}
>
    <div class="title" slot="title">
        <div>
            <h1 class="shrink" in:redact>Resume</h1>
            <h3 class="shrink" in:redact>References available upon request</h3>
        </div>
    </div>

    <div class="content-container" slot="content">
        {#if iconMode}
            <div class="icon-container">
                <a class="icon-wrapper" href="./resume/Test pdf.pdf" download>
                    <img
                        class="icon"
                        src="./images/pdf-icon.svg"
                        alt="resume"
                        in:fade
                    />
                    <p class="icon-label">Download</p>
                </a>

                <div
                    class="icon-wrapper"
                    on:click={toggleMode}
                    on:keypress={toggleMode}
                >
                    <img
                        class="icon"
                        src="./images/expand-icon.svg"
                        alt="embed pdf"
                        in:fade
                    />
                    <p class="icon-label">Embed</p>
                </div>
            </div>
        {:else}
            <div class="pdf-wrapper">
                <div
                    class="icon-wrapper"
                    on:click={toggleMode}
                    on:keypress={toggleMode}
                >
                    <img
                        class="icon"
                        src="./images/back-icon.svg"
                        alt="embed pdf"
                        style:transform="scale(0.65)"
                        in:fade
                    />
                </div>

                <object
                    class="embed-pdf"
                    data="./resume/Test pdf.pdf#zoom=75"
                    type="application/pdf"
                    title="Resume"
                    in:fade
                />
            </div>
        {/if}
    </div>
</SplitPageSegment>

<style>
    * {
        box-sizing: border-box;
    }
    .title {
        display: flex;
        width: fit-content;
    }

    .content-container {
        width: 100%;
        height: 100%;
        min-height: inherit;
        display: flex;
    }

    .icon-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 20%;

        transition: all 1 ease-in-out 0s;
    }

    .pdf-wrapper {
        width: 100%;
        height: 100%;
        min-height: inherit;
        display: flex;
        flex-direction: column;

        padding: 10% 0;
        box-sizing: border-box;
    }

    .embed-pdf {
        width: 100%;
        height: 100%;

        border-radius: 10px;

        border: 2px black solid;
    }

    @media screen and (max-width: 900px) {
        .title {
            flex-direction: column;
        }

        .pdf-wrapper {
            height: 1px;
            padding: 0;
        }
    }

    .icon {
        height: 7vh;
        width: 7vh;
        transition: all 0.1s ease 0s;
    }

    .icon:hover {
        transform: scale(1.05);
    }

    .icon-wrapper {
        display: flex;
        width: fit-content;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        padding: 10px;
        color: var(--txt-dark);

        cursor: pointer;
    }

    .icon-label {
        text-align: center;
    }

    .shrink {
        width: fit-content;
    }
</style>
