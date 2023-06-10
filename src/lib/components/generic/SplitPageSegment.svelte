<script>
    import OverlayPanel from "./OverlayPanel.svelte";
</script>

<div class="row">
    <div class="column">
        <OverlayPanel {...$$restProps}>
            <slot name="title" />
        </OverlayPanel>
    </div>

    <div class="column container">
        <slot name="content" />
    </div>
</div>

<style>
    .row {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .column {
        flex: 50%;
    }

    .container {
        display: flex;
        align-items: center;
        word-wrap: normal;
        margin: 100px;
    }
</style>
