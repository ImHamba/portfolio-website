<script lang="ts">
    import PortfolioTile from "../../generic/PortfolioTile.svelte";

    const description =
        "An IntelliJ IDE plugin to automatically generate PlantUML syntax from a Java project.";

    const tags = ["Java", "OOP", "Plugin"];
</script>

<PortfolioTile
    title="IntelliJ IDEA PlantUML Generator Plugin"
    {description}
    imagePath="./images/portfolio/frogger.png"
    modalVisualPath="./images/portfolio/frogger.png"
    githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
    liveLink="https://youtube.com"
    {tags}
/>

<style>
</style>
