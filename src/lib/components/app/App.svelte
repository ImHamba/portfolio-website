<script>
    import SnapScroll from "./SnapScrollPanel.svelte";
    import ContactModal from "./ContactModal.svelte";
    import LandingSegment from "./segments/LandingSegment.svelte";
    import AboutSegment from "./segments/AboutSegment.svelte";
    import ContactSegment from "./segments/ContactSegment.svelte";

    let showContactModal = false;

    $: console.log(showContactModal);

    const toggleContactModal = () => {
        showContactModal = !showContactModal;
    };
</script>

<main>
    <LandingSegment />
    <AboutSegment number="01" fadeOut={true}/>
    <AboutSegment number="02" />
    <AboutSegment number="03" fadeOut={true}/>
    <ContactSegment />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>
