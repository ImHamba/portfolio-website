<script>
    import PageSegment from "../../generic/PageSegment.svelte";
    import ContactContainer from "../ContactContainer.svelte";
</script>

<PageSegment id="contact">
    <div class="panel">
        <ContactContainer />
    </div>
</PageSegment>

<style>
    .panel {
        min-height: inherit;
        height: 100%;
        width: 100%;
        padding: 5% 30% 8% 30%;
        box-sizing: border-box;
        flex: 1;

        display: flex;
        flex-flow: column;
    }

    @media screen and (max-width: 900px) {
        .panel {
            padding: 10% var(--mobile-right-margin) 20% var(--mobile-left-margin);
        }
    }
</style>
