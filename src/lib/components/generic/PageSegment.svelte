<script>
    export let id;
</script>

<div class="panel" {id}>
    <slot />
</div>

<style>
    .panel {
        height: 100%;
    }
</style>
