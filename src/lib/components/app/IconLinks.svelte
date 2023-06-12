<script>
    import IconLink from "../generic/IconLink.svelte";
</script>

<div class="icon-links">
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
        right: 1%;
    }
</style>
