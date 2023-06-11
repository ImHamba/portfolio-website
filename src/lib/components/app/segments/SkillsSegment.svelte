<script>
    import { redact } from "../../../functions/redactTransition";
    import SplitPageSegment from "../../generic/SplitPageSegment.svelte";
    import SkillIcons from "../SkillIcons.svelte";
</script>

<SplitPageSegment {...$$restProps} id="skills">
    <SkillIcons slot="content" />

    <div slot="title">
        <h1 class="shrink" in:redact>Skills</h1>
        <h3 class="shrink" in:redact>What I can do for you</h3>
    </div>
</SplitPageSegment>

<style>
    .shrink {
        width: fit-content;
    }
</style>
