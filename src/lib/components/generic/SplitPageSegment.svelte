<script>
    import OverlayPanel from "./OverlayPanel.svelte";

    export let id;
    export let fixedHeight = true;
</script>

<div class="row" {id} style:height={fixedHeight ? "100%" : null}>
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
        border: 1px black solid;
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
