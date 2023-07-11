<script lang="ts">
    import PortfolioTile from "../../generic/PortfolioTile.svelte";

    const description =
        "This project was a crypto trading bot with a short term trading strategy based on text analysis of trading calls in popular Discord crypto servers. I made this around the peak of the 2021 cryptocurrency market to capitalise on a pattern I noticed between trading calls and price spikes on particular coins. The bot would purchase (or short) the correct coin based on language pattern analysis of trade callers before other members of the server and close the position a minute or two later.\n\nThis project was coded completely in Python. It makes use of websockets to receive a stream of messages from a Discord server in real time, regex to clean and parse the common language patterns of different trade callers in the server, and HTTP requests to the web API a crypto exchange to place and monitor trades.";

    const shortDescription =
        "A cryptocurrency trading bot with a short term trading strategy based on text analysis of trading calls in popular Discord crypto servers.";

    const tags = [
        "Python",
        "Regex",
        "Web API",
        "HTTP Requests",
        "JSON",
        "Websockets",
    ];
</script>

<PortfolioTile
    title="Discord Based Crypto Trading Bot"
    {description}
    {shortDescription}
    imagePath="./images/portfolio/frogger.png"
    githubLink="https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin"
    liveLink="https://youtube.com"
    modalVisualPath="./images/portfolio/frogger.png"
    {tags}
/>

<style>
</style>
