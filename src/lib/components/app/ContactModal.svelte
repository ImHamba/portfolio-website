<script>
    import Modal from "../generic/Modal.svelte";

    //staticforms.xyz email key
    import { EMAIL_KEY } from "../../data/staticformskey";

    let name;
    let email;
    let contactMessage;

    async function handleSubmit() {
        console.log(name, email, contactMessage);
    }
</script>

<Modal {...$$restProps} on:click>
    <h3>Contact</h3>
    <form on:submit={handleSubmit}>
        <div>
            <input type="text" placeholder="name" bind:value={name} />
            <input type="text" placeholder="email" bind:value={email} />
        </div>
        <input type="text" bind:value={contactMessage} />
        <button>Submit</button>
    </form>
</Modal>

<style>
</style>
