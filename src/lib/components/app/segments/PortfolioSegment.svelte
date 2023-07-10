<script>
    import { redact } from "../../../functions/redactTransition";
    import PortfolioTile from "../../generic/PortfolioTile.svelte";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";
    import FroggerTile from "../PortfolioTiles/FroggerTile.svelte";
    import PlantumlTile from "../PortfolioTiles/PlantumlTile.svelte";
</script>

<SplitPageSegment {...$$restProps} id="portfolio">
    <div class="tile-container" slot="content">
        <FroggerTile />
        <PlantumlTile />
        <PlantumlTile />
        <PlantumlTile />
    </div>

    <div slot="title">
        <h1 class="shrink" in:redact>Portfolio</h1>
        <h3 class="shrink" in:redact>
            Links to live demo and code are provided in project info
        </h3>
    </div>
</SplitPageSegment>

<style>
    .tile-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding-left: 10px;
    }
    .shrink {
        width: fit-content;
    }
</style>
