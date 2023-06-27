<script>
    import PageSegment from "../../generic/PageSegment.svelte";
    import Waves from "../Waves.svelte";
    import WavesContainer from "../WavesContainer.svelte";
</script>

<PageSegment id="home">
    <div class="panel">
        <h2>Hello!</h2>
        <h3>My name is</h3>
        <h1>Dennis Rigon</h1>

        <WavesContainer />
    </div>
</PageSegment>

<style>
    .panel {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0px 20%;
        flex: 1;
    }
</style>
