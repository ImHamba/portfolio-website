<script>
    import { fade } from "svelte/transition";
    import { redact } from "../../../functions/redactTransition";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";

    export let fadeOut = false;
    // specify transition out animation depending on whether fade prop is true or false
    const transitionOut = fadeOut ? (node) => fade(node, {duration: 100}) : () => {};
</script>

<SplitPageSegment {...$$restProps}>
    <div slot="content">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </div>

    <div slot="title">
        <h1 class="shrink" in:redact out:transitionOut>Overlay for About</h1>
        <h3 class="shrink" in:redact out:transitionOut>About subheading</h3>
    </div>
</SplitPageSegment>

<style>
    .shrink {
        width: fit-content;
    }
</style>
