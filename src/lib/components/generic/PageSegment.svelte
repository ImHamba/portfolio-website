<script>
    export let id;
</script>

<div class="panel" {id}>
    <slot />
</div>

<style>
    .panel {
        display: block;
        overflow: auto;
        min-height: 100vh;
        display: flex;
        flex-flow: column;
    }
</style>
