<script lang="ts">
    import { redact } from "../../../functions/redactTransition";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";
    import SkillIcons from "../SkillIcons.svelte";

    let scroll: number;
    let pageWidth: number;
    let specifiedHeight: number;
    $: specifiedHeight = pageWidth <= 900 ? 100 : 100;
    let outer: HTMLElement;
    let rowBottom: number;
    let rowTop: number;

    $: {
        scroll;
        if (outer != null) {
            const rect = outer.getBoundingClientRect();
            rowBottom = rect.bottom;
            rowTop = rect.top;
        }
    }
</script>

<svelte:window bind:scrollY={scroll} bind:innerWidth={pageWidth} />

<div class="outer" bind:this={outer}>
    <SplitPageSegment
        {...$$restProps}
        id="skills"
        rectTopOverride={100}
        {specifiedHeight}
    >
        <SkillIcons
            slot="content"
            rectBtmOverride={rowBottom}
            rectTopOverride={rowTop}
        />

        <div slot="title">
            <h1 class="shrink" in:redact>Skills and Technologies</h1>
            <h3 class="shrink" in:redact>Languages and tools I use</h3>
        </div>
    </SplitPageSegment>
</div>

<style>
    .outer {
        height: 100%;
        width: 100%;
    }
    .shrink {
        width: fit-content;
    }
</style>
