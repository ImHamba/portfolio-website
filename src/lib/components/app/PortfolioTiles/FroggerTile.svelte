<script lang="ts">
    import PortfolioTile from "../../generic/PortfolioTile.svelte";

    const description =
        "A small recreation of the classic arcade game Frogger, focusing on use of RxJS observables.";

    const tags = ["Typescript", "Javascript", "RxJS", "Observables"];
</script>

<PortfolioTile
    title="Observables Frogger"
    {description}
    imagePath="./images/portfolio/frogger.png"
    githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
    liveLink="https://youtube.com"
    modalVisualPath="./images/portfolio/frogger.png"
    {tags}
/>

<style>
</style>
