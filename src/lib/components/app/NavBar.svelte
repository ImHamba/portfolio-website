<script lang="ts">
    import { clamp } from "../../functions/util";

    let scroll: number = 0;

    let scrollHistory = [0, 0];
    $: scrollHistory = [scrollHistory[1], scroll];

    // used to move the navbar into and out of view as the user scrolls up or down
    let navShift = 0;
    let navShiftChange: number;
    $: {
        if (expanded) {
            navShift = 0;
            scrollHistory[0] = scrollHistory[1];
        } else {
            navShiftChange = scrollHistory[0] - scrollHistory[1];
            navShift = clamp(navShift + navShiftChange, -65, 0);
        }
    }

    let menuHeight: number;
    let innerWidth: number;
    $: if (menu != null) {
        innerWidth;
        menuHeight = menu.scrollHeight;
    }

    // toggles hamburger menu in mobile view
    let menu: HTMLElement;
    let expanded = false;
    const toggleMenu = () => {
        expanded = !expanded;
    };

    const collapseMenu = () => {
        expanded = false;
    };
</script>

<svelte:window bind:scrollY={scroll} bind:innerWidth />

<header class="navbar" style:top={`${navShift}px`}>
    <div class="mobile-header">
        <a class="logo" href="#home">
            <img
                class="icon"
                src="./images/DR-icon.svg"
                alt="logo"
                on:click={collapseMenu}
                on:keypress={collapseMenu}
            />
        </a>

        <img
            id="hamburger"
            src="./images/hamburger-menu-icon.svg"
            alt="open menu"
            on:click={toggleMenu}
            on:keypress={toggleMenu}
        />
    </div>

    <nav>
        <ul
            class="nav-links expanded"
            style:--expanded-height={expanded ? `${menuHeight}px` : 0}
            bind:this={menu}
            on:click={collapseMenu}
            on:keypress={collapseMenu}
        >
            <li><a href="#skills">Skills</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .logo {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        /* margin-right: auto; */
    }

    .logo img {
        height: 20px;
    }

    .navbar {
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        box-sizing: border-box;

        position: fixed;
        width: 100%;
        height: 50px;
        background-color: #ffffff73;
        padding: 10px 20%;

        box-shadow: 0px 2px 10px #70707057;
        backdrop-filter: blur(8px);
    }

    .nav-links {
        display: grid;
        grid-auto-flow: column;
        list-style-type: none;
        column-gap: 40px;
        padding: 0;
    }

    .nav-links li {
        width: min-content;
        white-space: nowrap;
    }

    .nav-links li a {
        transition: all 0.3s ease 0s;
        text-decoration: none;
        color: var(--txt-dark);
        font-weight: 600;
    }

    #hamburger {
        display: none;
    }

    @media screen and (max-width: 900px) {
        #hamburger {
            display: block;
            cursor: pointer;
            height: 30px;
        }

        .mobile-header {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 40px 10px 40px;
            box-sizing: border-box;
        }

        .navbar {
            flex-direction: column;
            min-height: 50px;
            height: fit-content;
            padding: 0;
            padding-top: 10px;
        }

        nav {
            width: 100%;
        }

        .nav-links {
            grid-auto-flow: row;
            /* row-gap: 20px; */
            column-gap: 0;
            justify-items: center;
            overflow: hidden;

            width: 100%;
            transition: all 0.3s ease-in-out 0s;
            max-height: 0px;
        }

        .expanded {
            max-height: var(--expanded-height);
        }

        .nav-links li {
            text-align: center;
            width: 100%;

            z-index: 2;
            border-top: 1px #00000022 solid;
            margin-top: -1px;
            display: flex;
        }

        .nav-links li:nth-child(1) {
            margin-top: 0px;
        }

        .nav-links li a {
            width: 100%;
            height: 100%;
            padding: 13px;
            box-sizing: border-box;
        }
    }
</style>
