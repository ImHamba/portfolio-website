<script lang="ts">
    import { range } from "../../functions/util";

    export let layers: number;
    export let initialGlitchEnabled = true;
    export let glitchSize = 10;
    export let glitchShift = 20;
</script>

<div class="glitch-container" style:--stacks={layers}>
    {#each range(0, layers) as index}
        <div
            class={initialGlitchEnabled
                ? "glitch-text initial-glitch"
                : "glitch-text"}
            style:--index={index}
            style:--glitch-size={glitchSize}
            style:--glitch-shift={glitchShift}
        >
            <slot />
        </div>
    {/each}
</div>

<style>
    .glitch-container {
        width: fit-content;
        display: grid;
        grid-template-columns: 1fr;
    }

    .glitch-text {
        grid-row-start: 1;
        grid-column-start: 1;

        text-shadow: none;
        transform: none;

        --glitch-size-px: calc(1px * var(--glitch-size));
        --glitch-size-neg-px: calc(-1px * var(--glitch-size));

        --glitch-size-vert-px: calc(1px * (var(--glitch-size) / 2));
        --glitch-size-vert-neg-px: calc(-1px * (var(--glitch-size) / 2));

        --stack-height: calc((100% - 1px) / var(--stacks));
        --inverse-index: calc(var(--stacks) - 1 - var(--index));
        --clip-top: calc(var(--stack-height) * var(--index));
        --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
        clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
        animation: glitch 3s 2 alternate 1s;
    }

    .initial-glitch {
        animation: stack calc(150ms) cubic-bezier(0.46, 0.29, 0, 1.24) 1
                backwards calc(var(--index) * 600ms / var(--stacks) + 1s),
            glitch 3s infinite alternate 2.1s;
    }

    .glitch-text:nth-child(odd) {
        --glitch-translate: calc(var(--glitch-shift) * -1px);
    }
    .glitch-text:nth-child(even) {
        --glitch-translate: calc(var(--glitch-shift) * 1px);
    }

    @keyframes stack {
        0% {
            opacity: 0;
            transform: translateX(-50%);
            text-shadow: var(--glitch-size-neg-px) var(--glitch-size-px) 0 red,
                var(--glitch-size-px) var(--glitch-size-neg-px) 0 cyan,
                var(--glitch-size-neg-px) var(--glitch-size-neg-px) 0 purple;
        }
        60% {
            opacity: 0.5;
            transform: translateX(60%);
        }
        80% {
            transform: none;
            opacity: 1;
            text-shadow: var(--glitch-size-px) var(--glitch-size-neg-px) 0 red,
                var(--glitch-size-neg-px) var(--glitch-size-px) 0 cyan,
                var(--glitch-size-px) var(--glitch-size-px) 0 purple;
        }
        100% {
            text-shadow: none;
            transform: none;
        }
    }

    @keyframes glitch {
        0% {
            text-shadow: var(--glitch-size-neg-px) var(--glitch-size-vert-px) 0
                    red,
                var(--glitch-size-px) var(--glitch-size-vert-neg-px) 0 cyan,
                var(--glitch-size-neg-px) var(--glitch-size-vert-neg-px) 0
                    purple;
            transform: translate(var(--glitch-translate));
        }
        1% {
            text-shadow: var(--glitch-size-px) var(--glitch-size-vert-neg-px) 0
                    red,
                var(--glitch-size-neg-px) var(--glitch-size-vert-px) 0 cyan,
                var(--glitch-size-px) var(--glitch-size-vert-px) 0 purple;
        }
        2%,
        100% {
            text-shadow: none;
            transform: none;
        }
    }
</style>
