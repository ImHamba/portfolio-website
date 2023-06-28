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
            <div class="btn-container">
                <button class="resume-btn">
                    <a href="./resume/Test pdf.pdf">
                        <img src="./images/pdf-icon.svg" alt="resume" in:fade />
                        <h4 class="prompt-text">Download</h4>
                    </a>
                </button>

                <button
                    id="embed-btn"
                    class="resume-btn"
                    on:click={toggleMode}
                    on:keypress={toggleMode}
                >
                    <img
                        src="./images/expand-icon.svg"
                        alt="embed pdf"
                        in:fade
                    />
                    <h4 class="prompt-text">Embed</h4>
                </button>
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

    .btn-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 20%;
    }

    @media screen and (max-width: 900px) {
        .btn-container {
            flex-direction: column;
        }
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

    .resume-btn {
        margin: 10px;
        border-radius: 15px;
        background-color: var(--accent5);
        padding: 5px 20px;
        border: none;
        box-shadow: #00000066 0 2px 4px, #0000004d 0 7px 13px -3px,
            #a88f00 0 -3px 0 inset;

        transition: all 0.1s ease-out 0s;
        cursor: pointer;
        width: 100%;
        max-width: 200px;
        min-width: 150px;
    }

    .resume-btn:hover {
        transform: translateY(-3px);
        box-shadow: #00000066 0 2px 4px, #0000004d 0 7px 13px,
            #a88f00 0 -3px 0 inset;
    }

    .resume-btn a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--txt-dark);
    }

    #embed-btn {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .resume-btn img {
        overflow: hidden;
        height: 2.5em;
        width: 2.5em;
        min-height: 2.5em;
        min-width: 2.5em;
        animation: bob 5s infinite;
        transition: all 0.3s ease-in-out 0s;
        margin-right: 10px;
    }

    .icon {
        height: 7vh;
        width: 7vh;
        transition: all 0.1s ease 0s;
    }

    .icon:hover {
        transform: scale(1.1);
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

    .shrink {
        width: fit-content;
    }
</style>
