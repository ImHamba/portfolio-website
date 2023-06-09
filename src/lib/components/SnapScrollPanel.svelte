<script>
    import {range} from '../functions/util'

    let scroll = 0;
    $: console.log(scroll);

    export let numPages = 1;
</script>

<div
    class="wrapper"
    on:scroll={(e) => {
        scroll = e.target.scrollTop;
    }}
>
    {#each range(0, numPages) as i}
        {@const color = 50 + (100 * i) / numPages}
        {@const inv_color = 255}

        <section
            class="section"
            style="--color:rgb({inv_color},{inv_color},{inv_color}); --background-color:rgb({color}, {color}, {color})"
            id="s{i}"
        >
            page {i + 1}
        </section>
    {/each}

    <point class="point">
        {#each range(0, numPages) as i}
            <a href="#s{i}" />
        {/each}
    </point>
</div>

<style>
    .wrapper {
        scroll-behavior: smooth;
        overflow-x: hidden;
        height: 100%;
        scroll-snap-type: y mandatory;
    }

    .section {
        color: var(--color);
        background-color: var(--background-color);
        font-size: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        scroll-snap-align: start;
    }

    .point {
        position: absolute;
        bottom: 1vh;
        right: 3vh;
        display: flex;
        flex-direction: column;
    }

    a {
        display: block;
        width: 0.8vh;
        height: 0.8vh;
        margin: 0.5vh 0;
        background-color: #fff;
    }
</style>