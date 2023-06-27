<script lang="ts">
    import { clamp } from "../../functions/util";

    let scroll: number = 0;

    let scrollHistory = [0, 0];
    $: scrollHistory = [scrollHistory[1], scroll];

    let navShift = 0;
    $: {
        navShift += scrollHistory[0] - scrollHistory[1];
        navShift = clamp(navShift, -50, 0);
    }

    // $: console.log(navShift);
</script>

<svelte:window bind:scrollY={scroll} />

<header class="navbar" style:top={`${navShift}px`}>
    <a class="logo" href="#home">
        <img src="./images/DR-icon.svg" alt="logo" />
    </a>

    <nav>
        <ul class="nav_link">
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>

<style>
    * {
        margin: 0;
    }

    .logo {
        cursor: pointer;
        margin-right: auto;
    }

    .logo img {
        height: 20px;
    }

    .navbar {
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        list-style: none;
        box-sizing: border-box;

        position: fixed;
        width: 100%;
        height: 50px;
        background-color: #f7f7f7;
        padding: 10px 20%;

        /* transition: all 0.3s ease 0s; */
    }

    .nav_link li {
        display: inline-block;
        padding: 0px 20px;
    }

    .nav_link li a {
        transition: all 0.3s ease 0s;
    }

    .nav_link li a:hover {
        color: #0088a9;
    }

    /* button {
        margin-left: 20px;
        padding: 5px 15px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        background-color: #16a9ce;
        color: white;
    }

    button:hover {
        background-color: #16a9ced4;
    } */
</style>
