<script>
    import PageSegment from "../../generic/PageSegment.svelte";
    import Waves from "../Waves.svelte";
</script>

<PageSegment id="home">
    <div class="panel">
        <h1>Welcome!</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <Waves />
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
    }
</style>
