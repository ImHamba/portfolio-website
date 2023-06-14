<script lang="ts">
    import OverlayPanel from "./OverlayPanel.svelte";

    export let id: string;
    export let fixedHeight = true;

    let scroll: number;
    let row: HTMLElement;
    let rowBottom: number;

    $: {
        scroll;
        if (row != null) {
            rowBottom = row.getBoundingClientRect().bottom;
        }
    }
</script>

<svelte:window bind:scrollY={scroll} />

<div
    class="row"
    {id}
    style:height={fixedHeight ? "100%" : null}
    bind:this={row}
>
    <div class="column">
        <div>
            <OverlayPanel {...$$restProps} rectBtmOverride={rowBottom}>
                <slot name="title" />
            </OverlayPanel>
        </div>
    </div>

    <div class="column">
        <slot name="content" />
    </div>
</div>

<style>
    .row {
        display: flex;
        border: 1px black solid;
        min-height: 100%;
    }

    .column {
        flex-basis: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        word-wrap: normal;
        padding-right: calc(3% + 70px);
        overflow: hidden;
        min-height: 40vh;
    }

    .column>div{
        align-self: stretch;
        width: 100%;
    }

    @media screen and (max-width: 900px) {
        .row {
            flex-direction: column;
        }

        .column {
            padding-left: 7%;
            flex-direction: row;
        }

        .column:nth-child(1) {
            flex-basis: 40%;
        }
        .column:nth-child(2) {
            flex-basis: 60%;
        }
    }
</style>
