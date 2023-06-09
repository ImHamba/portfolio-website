<script>
    import SnapScroll from "./SnapScrollPanel.svelte";
    import ContactModal from "./ContactModal.svelte";

    let showContactModal = false;

    $: console.log(showContactModal);

    const toggleContactModal = () => {
        showContactModal = !showContactModal;
    };
</script>

<main>
    <ContactModal visible={showContactModal} on:click={toggleContactModal}/>
    <button on:click={toggleContactModal} />
    <SnapScroll numPages={8} />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>
