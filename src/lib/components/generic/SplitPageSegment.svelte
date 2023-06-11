<script>
    import OverlayPanel from "./OverlayPanel.svelte";

    export let id;
</script>

<div class="row" id={id}>
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
        margin-right: 150px;
    }
</style>
