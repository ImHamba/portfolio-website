<script>
    import { fade } from "svelte/transition";
    //staticforms.xyz email key
    import { EMAIL_KEY } from "../../data/staticformskey";
    import SpecialButton from "../generic/SpecialButton.svelte";
    import { getCSSvariable } from "../../functions/util";

    let name;
    let email;
    let contactMessage;
    let submitted = false;

    const handleSubmit = async (e) => {
        const ACTION_URL = e.target.action;

        const formData = new FormData(e.target);
        const data = new URLSearchParams();
        for (let field of formData) {
            data.append(field[0], field[1]);
        }

        fetch(ACTION_URL, {
            method: "POST",
            body: data,
        });

        submitted = true;
    };

    const resetSubmit = () => {
        submitted = false;
    };
</script>

<div class="container">
    {#if !submitted}
        <h1 id="title" in:fade>Contact Me</h1>
        <form
            class="form"
            on:submit|preventDefault={handleSubmit}
            action="https://api.staticforms.xyz/submit"
            method="post"
            target="container"
            in:fade
        >
            <div class="small-fields">
                <input
                    name="name"
                    class="name input"
                    type="text"
                    placeholder="Name*"
                    required
                    bind:value={name}
                />
                <input
                    name="email"
                    class="email input"
                    type="email"
                    placeholder="Email*"
                    required
                    bind:value={email}
                />
            </div>
            <textarea
                class="message input"
                placeholder="Leave your message here"
                name="message"
                required
                bind:value={contactMessage}
            />
            <div id="btn-wrapper">
                <SpecialButton
                    --color1={getCSSvariable("accent5")}
                    --color2="#a88f00"
                >
                    <h4 id="btn-text">Submit</h4>
                </SpecialButton>
            </div>

            <input type="hidden" name="accessKey" value={EMAIL_KEY} />
            <input
                type="hidden"
                name="subject"
                value="Portfolio website message from {name}"
            />
        </form>
    {:else}
        <div class="response">
            <h1 in:fade>
                Thanks for the message.
                <br />
                I'll get back to you soon.
            </h1>
        </div>

        <div
            class="icon-wrapper"
            on:click={resetSubmit}
            on:keypress={resetSubmit}
        >
            <img
                class="icon"
                src="./images/back-icon.svg"
                alt="embed pdf"
                in:fade
            />
        </div>
    {/if}
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .container {
        width: 100%;
        flex: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 900px) {
        #title {
            /* align-self: start; */
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .container form {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .small-fields {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }

    .name {
        width: 40%;
    }

    .email {
        width: 58%;
    }

    @media screen and (max-width: 900px) {
        .name {
            width: 100%;
        }

        .email {
            width: 100%;
        }

        .small-fields {
            flex-direction: column;
            padding: 0;
        }
    }

    .message {
        width: 100%;
        text-align: start;
        resize: none;
        flex: 1;
    }

    .input {
        border-radius: 8px;
    }

    #btn-text {
        margin: 0;
        padding: 20px 50px;
    }

    #btn-wrapper {
        margin: 20px;
    }

    .response {
        align-items: center;
    }

    .response h1 {
        text-align: center;
    }

    .icon {
        height: 6vh;
        width: 6vh;
        transition: all 0.1s ease 0s;
    }

    .icon:hover {
        transform: scale(1.05);
    }

    .icon-wrapper {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        padding: 10px;

        cursor: pointer;
    }
</style>
