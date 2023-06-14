<script>
    export let imgPath = null;
    export let dummy = false;
</script>

<img
    class="icon"
    src={imgPath}
    alt="icon"
    style:visibility={dummy ? "hidden" : null}
/>

<style>
    .icon {
        height: 50%;
        width: 50%;
        padding: 8px;
        transition: all 0.3s ease 0s;
    }
</style>
