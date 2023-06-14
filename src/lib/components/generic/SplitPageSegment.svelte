<script>
    import OverlayPanel from "./OverlayPanel.svelte";

    export let id;
    export let fixedHeight = true;
</script>

<div class="row row-mobile" {id} style:height={fixedHeight ? "100%" : null}>
    <div class="column">
        <OverlayPanel {...$$restProps}>
            <slot name="title" />
        </OverlayPanel>
    </div>

    <div class="column">
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
        display: flex;
        align-items: center;
        word-wrap: normal;
        padding-right: calc(3% + 70px);
        overflow: hidden;
    }

    @media screen and (max-width: 600px) {
        .row {
            flex-direction: column;
        }

        .column {
            padding-left: 7%;
            align-items: flex-start;
        }

        .column:nth-child(1){
            flex-basis: 40%;
        }
        .column:nth-child(2){
            flex-basis: 60%;
        }
    }
</style>
