<script lang="ts">
    import { onMount } from "svelte";
    import IconLink from "../generic/IconLink.svelte";

    function getScrollBarWidth() {
        let el = document.createElement("div");
        el.style.cssText =
            "overflow:scroll; visibility:hidden; position:absolute;";
        document.body.appendChild(el);
        let width = el.offsetWidth - el.clientWidth;
        el.remove();
        return width;
    }

    // get the default scrollbar width and pass into css as a variable
    let scrollbarWidth: number;
    let innerWidth: number;
    $: {
        innerWidth;
        scrollbarWidth = getScrollBarWidth();
    }
</script>

<svelte:window bind:innerWidth />

<div class="icon-links" style="--scrollbar-width:{scrollbarWidth}px">
    <IconLink
        imgPath="./images/up-icon.svg"
        link="#home"
        openInNewTab={false}
    />
    <IconLink
        imgPath="./images/github-mark.svg"
        link="https://github.com/ImHamba"
        description="Github"
    />
    <IconLink
        imgPath="./images/linkedin-icon.svg"
        link="https://www.linkedin.com/in/dennis-rigon-68aa521a5/"
        description="LinkedIn"
    />
    <IconLink
        imgPath="./images/email-icon.svg"
        link="mailto:dennisrigondr@gmail.com"
        description="Email"
    />
    <IconLink
        imgPath="./images/document-icon.svg"
        link="./resume/Test pdf.pdf"
        description="Resume"
    />
</div>

<style>
    .icon-links {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 3%;
        
        /* fixes the icons in place even when the scrollbar disappears when modals are opened */
        left: calc(99vw - 46px - var(--scrollbar-width));
    }
</style>
