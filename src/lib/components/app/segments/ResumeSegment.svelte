<script lang="ts">
    import { fade } from "svelte/transition";
    import { redact } from "../../../functions/redactTransition";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";
    import SpecialButton from "../../generic/SpecialButton.svelte";
    import { getCSSvariable } from "../../../functions/util";

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
                <div>
                    <SpecialButton
                        --color1={getCSSvariable("accent5")}
                        --color2="#a88f00"
                    >
                        <a
                            class="resume-btn"
                            href="./resume/Test pdf.pdf"
                            download
                        >
                            <img
                                src="./images/pdf-icon.svg"
                                alt="resume"
                                in:fade
                            />
                            <h4 class="prompt-text">Download</h4>
                        </a>
                    </SpecialButton>
                </div>
                <div on:click={toggleMode} on:keypress={toggleMode}>
                    <SpecialButton
                        --color1={getCSSvariable("accent5")}
                        --color2="#a88f00"
                    >
                        <div id="embed-btn" class="resume-btn">
                            <img
                                src="./images/expand-icon.svg"
                                alt="embed pdf"
                                in:fade
                            />
                            <h4 class="prompt-text">Embed</h4>
                        </div>
                    </SpecialButton>
                </div>
            </div>
        {:else}
            <div class="pdf-wrapper">
                <img
                    id="back-icon"
                    src="./images/back-icon.svg"
                    alt="embed pdf"
                    in:fade
                    on:click={toggleMode}
                    on:keypress={toggleMode}
                />

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
        align-items: center;
    }

    @media screen and (max-width: 900px) {
        .content-container {
            align-items: start;
        }
    }

    .btn-container {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 10%;
    }

    @media screen and (max-width: 900px) {
        .btn-container {
            flex-direction: column;
        }
    }

    .btn-container > div {
        margin: 10px;
        flex: 1 1 0px;
        min-width: 185px;
        max-width: 200px;
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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--txt-dark);

        padding: 5px 20px;
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
        animation: bob 5s infinite;
        transition: all 0.3s ease-in-out 0s;
        margin-right: 20px;
    }

    #embed-btn img {
        height: 2em;
        width: 2em;
    }

    #back-icon {
        width: 5vh;
        height: 5vh;
        transition: all 0.2s ease 0s;
        cursor: pointer;
        margin: 10px;
    }

    #back-icon:hover {
        transform: scale(1.05);
    }

    .shrink {
        width: fit-content;
    }
</style>
