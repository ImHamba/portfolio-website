<script>
</script>

<header class="navbar">
    <a class="logo" href="#home">
        <img src="" alt="logo" />
    </a>

    <nav>
        <ul class="nav_link">
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#resume">Resume</a></li>
        </ul>
    </nav>

    <a class="contact" href="#contact">
        <button>Contact</button>
    </a>
</header>

<style>
    * {
        margin: 0;
    }

    .logo {
        cursor: pointer;
        margin-right: auto;
    }

    .navbar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        list-style: none;
        box-sizing: border-box;

        position: sticky;
        width: 100%;
        top: 0;
        height: 60px;
        background-color: #f7f7f7;
        padding: 30px 20%;
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

    button {
        margin-left: 20px;
        padding: 9px 25px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        background-color: #16a9ce;
        color: white;
    }

    button:hover {
        background-color: #16a9ced4;
    }
</style>
