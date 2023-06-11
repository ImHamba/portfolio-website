<script>
    export let imgPath;
    export let link;
</script>

<a class="icon" href={link} target="_blank">
    <img src={imgPath} alt="github" />
</a>

<style>
    .icon {
        position: relative;
        padding: 8px;
    }

    .icon img {
        height: 30px;
        width: 30px;
    }

    .icon:hover {
        fill-opacity: "0.8";
    }
</style>
