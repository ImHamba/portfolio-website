<script>
    export let imgPath;
    export let dummy = false;
</script>

<img
    class="icon"
    src={imgPath}
    alt="icon"
    style:visibility={dummy ? "hidden" : "auto"}
/>

<style>
    .icon {
        height: 10vh;
        width: 10vh;
        padding: 8px;
        transition: all 0.3s ease 0s;
    }
</style>
