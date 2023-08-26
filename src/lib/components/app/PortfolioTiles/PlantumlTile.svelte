<script lang="ts">
    import PortfolioTile from "../../generic/PortfolioTile.svelte";

    const shortDescription =
        "A plugin for IntelliJ IDEA to automatically generate PlantUML syntax from a Java project.";

    // const description =
    //     "A plugin for IntelliJ IDEA to automatically generate PlantUML syntax from a Java project. It uses the Program Structure Interface (PSI) API to model the dependencies between classes in a project in an OOP structure. It converts the analysed relationships into PlantUML syntax based on the user chosen inclusions (such as associations, attributes, methods etc), which is a tool that automatically renders UML class diagrams. The plugin is currently live on the IntelliJ marketplace.";

    const description =
        "This project is currently in progress.\n\nA plugin for IntelliJ IDEA to automatically generate PlantUML syntax from a Java project. It uses the Program Structure Interface (PSI) API to model the dependencies between classes in a project in an OOP structure. It converts the analysed relationships into PlantUML syntax based on the user chosen inclusions (such as associations, attributes, methods etc), which is a tool that automatically renders UML class diagrams.";

    const tags = ["IN PROGRESS", "Java", "OOP", "Plugin", "IntelliJ IDEA"];
</script>

<PortfolioTile
    title="PlantUML Generator Plugin for IntelliJ IDEA"
    {description}
    {shortDescription}
    imagePath="./images/portfolio/plantuml-generator.png"
    modalVisualPath="./images/portfolio/plantuml-generator.png"
    githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
    liveLink={null}
    {tags}
/>

<style>
</style>
