<script>
    import { fade } from 'svelte/transition'

    export let visible = false;
    
</script>

{#if visible}
    <div transition:fade class="backdrop" on:click|self on:keypress|self>
        <div class="modal">
            <button on:click>x</button>
            <slot/>
        </div>
    </div>
{/if}

<style>
    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
    }

    .modal {
        padding: 10px;
        border-radius: 10px;
        width: 50%;
        text-align: center;
        background: white;

        position: absolute;
        float: left;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
    }
</style>
