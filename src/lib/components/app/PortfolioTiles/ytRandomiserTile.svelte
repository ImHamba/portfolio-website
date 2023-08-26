<script lang="ts">
    import PortfolioTile from "../../generic/PortfolioTile.svelte";

    const description =
        "This project is a website that lets users create mixes of Youtube playlists and videos, and then shuffle and play them. I made this as Youtube's native playlist shuffle feature often does not work properly and repeats videos.\n\nThe website uses a backend server to relay requests to Youtube's API in order to keep the API key secret from the user's client. An account creation and authentication system is also in place to allow users to save their mixes and access them from other devices. The authentication uses bcrypt hashing for password storage and JSON Web Tokens (JWT) for persistent logins. Account data and saved mixes are stored in a remote hosted Postgresql database, which is interfaced with using Prisma.";

    const shortDescription =
        "A full stack website made using Sveltekit that allows users to play shuffled mixes of Youtube playlists and videos. Also features ability to save mixes locally or to an account.";

    const tags = [
        "Sveltekit",
        "Typescript",
        "HTML/CSS",
        "SASS",
        "Youtube API",
        "Postgresql",
    ];
</script>

<PortfolioTile
    title="Youtube Randomiser Website"
    {description}
    {shortDescription}
    imagePath="./images/portfolio/ytRandomiser.png"
    githubLink="https://github.com/ImHamba/youtube-randomiser"
    liveLink="https://youtube-randomiser.vercel.app/?demo=true"
    modalVisualPath="./images/portfolio/ytRandomiser.png"
    {tags}
/>

<style>
</style>
