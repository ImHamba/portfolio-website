<script>
    export let id;
</script>

<div class="panel" {id}>
    <slot />
</div>

<style>
    .panel {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 20%;
    }
</style>
