<script>
    import { redact } from "../../functions/redactTransition";

    import { fade } from "svelte/transition";
    import CreateOnScrollWrapper from "./CreateOnScrollWrapper.svelte";

    export let number = "undefined page number";

    const transitionOut = (node) => fade(node, { duration: 150 })
</script>

<CreateOnScrollWrapper>
    <div class="number" in:redact out:transitionOut>
        {number}
    </div>
    <div class="title" out:transitionOut>
        <slot />
    </div>
</CreateOnScrollWrapper>

<style>
    .title {
        position: fixed;
        top: 40%;
        left: 15%;
        width: 30%;
    }

    .number {
        position: fixed;
        top: 8%;
        left: 5%;
    }

    @media screen and (max-width: 600px) {
        .title {
            position: relative;
            top: 40%;
            left: 15%;
            width: 70%;
        }

        .number {
            position: relative;
            top: 15%;
            left: 5%;
            width: fit-content;
        }
    }
</style>
