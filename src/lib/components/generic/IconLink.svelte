<script>
    export let imgPath;
    export let link;
    export let openInNewTab = true;
</script>

<a class="icon" href={link} target={openInNewTab ? "_blank" : null}>
    <img src={imgPath} alt="icon" />
</a>

<style>
    .icon {
        position: relative;
        margin: 8px;
        transition: all 0.1s ease-in-out;
        opacity: 0.7;
    }

    .icon img {
        height: 30px;
        width: 30px;
    }

    .icon:hover {
        opacity: 1;
        transform: scale(1.05);
    }
</style>
