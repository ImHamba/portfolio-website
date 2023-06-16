<script lang="ts">
    import ContactModal from "./lib/components/app/ContactModal.svelte";
    import LandingSegment from "./lib/components/app/segments/LandingSegment.svelte";
    import AboutSegment from "./lib/components/app/segments/AboutSegment.svelte";
    import ContactSegment from "./lib/components/app/segments/ContactSegment.svelte";
    import NavBar from "./lib/components/app/NavBar.svelte";
    import SkillsSegment from "./lib/components/app/segments/SkillsSegment.svelte";
    import ResumeSegment from "./lib/components/app/segments/ResumeSegment.svelte";
    import PortfolioSegment from "./lib/components/app/segments/PortfolioSegment.svelte";
    import IconLinks from "./lib/components/app/IconLinks.svelte";

    let showContactModal = false;

    $: console.log(showContactModal);

    const toggleContactModal = () => {
        showContactModal = !showContactModal;
    };
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<main>
    <div class="navbar-bound">
        <NavBar />
    </div>

    <IconLinks />

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
