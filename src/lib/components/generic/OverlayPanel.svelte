<script>
    import { redact } from "../../functions/redactTransition";

    import { fade } from "svelte/transition";
    import CreateOnScrollWrapper from "./CreateOnScrollWrapper.svelte";

    export let number = "undefined page number";

    const transitionOut = (node) => fade(node, { duration: 150 });
</script>

<CreateOnScrollWrapper {...$$restProps}>
    <div class="overlay-wrapper">
        <div class="number" in:redact out:transitionOut>
            {number}
        </div>
        <div class="title" out:transitionOut>
            <slot />
        </div>
    </div>
</CreateOnScrollWrapper>

<style>
    .overlay-wrapper {
        width: 100%;
        height: 100%;

        word-wrap: break-word;
    }

    .title {
        position: fixed;
        top: 40%;
        left: 15%;
        width: 32%;
        overflow-wrap: break-word;
    }

    .number {
        position: fixed;
        top: 8%;
        left: 5%;
    }

    @media screen and (max-width: 900px) {
        .overlay-wrapper {
            position: relative;
            top: 0%;
            box-sizing: border-box;
        }

        .title {
            position: absolute;
            left: 0;
            top: auto;
            bottom: 5%;
            width: 100%;
            overflow-wrap: break-word;
        }

        .number {
            position: absolute;
            top: 15%;
            left: 0;
            width: fit-content;
        }
    }
</style>
