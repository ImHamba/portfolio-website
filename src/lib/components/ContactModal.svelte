<script>
    import Modal from "./Modal.svelte";
</script>

<Modal {...$$restProps} on:click>
    <h3>Contact</h3>
    <form on:submit>
        <div>
            <input type="text" placeholder="name" />
            <input type="text" placeholder="email" />
        </div>
        <input type="text" />
        <button>Submit</button>
    </form>
</Modal>

<style>
</style>
