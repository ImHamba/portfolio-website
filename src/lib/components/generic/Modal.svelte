<script>
    export let visible = false;
</script>

{#if visible}
    <div class="backdrop">
        <div class="modal">
            <img
                on:click
                on:keypress
                src="./images/close-icon.svg"
                alt="close"
                class="close-btn"
            />
            <slot />
        </div>
    </div>
{/if}

<style>
    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.25);

        top: 0;
        left: 0;
        z-index: 1;
    }

    .modal {
        border-radius: 10px;
        box-shadow: 0 0 10px #0000007b;
        width: 65%;
        height: 70%;
        text-align: center;
        background: white;

        position: absolute;
        float: left;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
    }

    @media screen and (max-width: 900px), screen and (max-height: 700px) {
        .modal {
            width: 90%;
            height: 90%;
        }
    }

    .close-btn {
        position: absolute;
        width: 3.5vh;
        height: 3.5vh;
        top: 0;
        right: 0;
        margin: 10px;
        cursor: pointer;
        opacity: 0.4;
    }
</style>
