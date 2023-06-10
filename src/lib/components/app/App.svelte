<script>
    import ContactModal from "./ContactModal.svelte";
    import LandingSegment from "./segments/LandingSegment.svelte";
    import AboutSegment from "./segments/AboutSegment.svelte";
    import ContactSegment from "./segments/ContactSegment.svelte";
    import NavBar from "./NavBar.svelte";
    import SkillsSegment from "./segments/SkillsSegment.svelte";
    import ResumeSegment from "./segments/ResumeSegment.svelte";
    import PortfolioSegment from "./segments/PortfolioSegment.svelte";

    let showContactModal = false;

    $: console.log(showContactModal);

    const toggleContactModal = () => {
        showContactModal = !showContactModal;
    };
</script>

<main>
    <div class="navbar-bound">
        <NavBar />
    </div>
    <LandingSegment />
    <AboutSegment number="01" fadeOut={true} />
    <SkillsSegment number="02" />
    <PortfolioSegment number="03" />
    <ResumeSegment number="04" fadeOut={true} />
    <ContactSegment />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }

    .navbar-bound {
        position: absolute;
        height: 50%;
        width: 100%;
    }
</style>
