<script>
    import { redact } from "../../../functions/redactTransition";
    import PortfolioTile from "../../generic/PortfolioTile.svelte";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";

    const froggerDescription =
        "A small recreation of the classic arcade game Frogger, focusing on use of RxJS observables.";

    const plantUmlDescription =
        "An IntelliJ IDE extension to automatically generate PlantUML syntax from a Java project.";
</script>

<SplitPageSegment {...$$restProps} id="portfolio" fixedHeight={false}>
    <div class="tile-container" slot="content">
        <PortfolioTile
            title="Frogger"
            content={froggerDescription}
            imagePath="./images/portfolio/frogger.png"
            githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
            liveLink="https://youtube.com"
        />
        <PortfolioTile
            title="IntelliJ PlantUML Generator Extension"
            content={plantUmlDescription}
            imagePath="./images/portfolio/frogger.png"
            githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
            liveLink="https://youtube.com"
        />
        <PortfolioTile
            title="IntelliJ PlantUML Generator Extension"
            content={plantUmlDescription}
            imagePath="./images/portfolio/frogger.png"
            githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
            liveLink="https://youtube.com"
        />
        <PortfolioTile
            title="IntelliJ PlantUML Generator Extension"
            content={plantUmlDescription}
            imagePath="./images/portfolio/frogger.png"
            githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
            liveLink="https://youtube.com"
        />
    </div>

    <div slot="title">
        <h1 class="shrink" in:redact>Portfolio</h1>
        <h3 class="shrink" in:redact>
            All project source code can be found on Github
        </h3>
    </div>
</SplitPageSegment>

<style>
    .tile-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .shrink {
        width: fit-content;
    }
</style>
