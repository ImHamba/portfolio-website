<script>
    import OverlayPanel from "./OverlayPanel.svelte";

    export let id;
</script>

<div class="row" {id}>
    <div class="column">
        <OverlayPanel {...$$restProps}>
            <slot name="title" />
        </OverlayPanel>
    </div>

    <div class="column content">
        <slot name="content" />
    </div>
</div>

<style>
    .row {
        display: flex;
        height: 100%;
    }

    .column {
        flex-basis: 50%;
        box-sizing: border-box;
    }

    .content {
        display: flex;
        align-items: center;
        word-wrap: normal;
        padding-right: calc(3% + 70px);
    }
</style>
