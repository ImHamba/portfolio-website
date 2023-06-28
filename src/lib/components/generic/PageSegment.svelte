<script>
    export let id;
</script>

<div class="panel" {id}>
    <slot />
</div>

<style>
    .panel {
        min-height: 100vh;
    }
</style>
