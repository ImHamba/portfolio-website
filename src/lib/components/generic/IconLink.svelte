<script>
    export let imgPath = null;
    export let link = null;
    export let openInNewTab = true;
    export let description = null;
</script>

<a
    class="icon"
    href={link}
    target={openInNewTab ? "_blank" : null}
    title={description}
>
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
