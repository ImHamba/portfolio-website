<script lang="ts">
    import PortfolioTile from "../../generic/PortfolioTile.svelte";

    const description =
        "A recreation of the classic arcade game Frogger. This project was implemented using a functional reactive programming (FRP) style, focusing heavily on the use of RxJS observables to trigger and react to game events such as spawning cars using pure functions and all side effects centralised in a single location in the code.";

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
