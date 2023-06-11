<script>
    import { range } from "../../functions/util";
    import SkillIcon from "./../generic/SkillIcon.svelte";

    let iconPaths = [
        "./images/python-icon.svg",
        "./images/javascript-icon.svg",
        "./images/java-icon.svg",
        "./images/svelte-icon.svg",
    ];

    const cols = 4;
    const rows = Math.ceil(iconPaths.length / cols);

    // fill iconPaths up to a multiple of cols with dummy elements to keep grid aligned
    iconPaths = iconPaths.concat(
        new Array(cols - (iconPaths.length % cols)).fill(null)
    );
</script>

<div class="wrapper">
    {#each range(0, rows) as row}
        <div class="row" style:aspect-ratio={cols}>
            {#each iconPaths.slice(row * cols, (row + 1) * cols) as iconPath}
                <div class="col">
                    {#if iconPath != null}
                        <div class="tile">
                            <SkillIcon imgPath={iconPath} />
                        </div>
                    {:else}
                        <SkillIcon dummy={true} />
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-right: 15%;
    }

    .row {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
    }

    .col {
        display: flex;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 92%;
    }

    .tile {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;
        border-radius: 25px;
        width: 92%;
        height: 100%;
    }
</style>
