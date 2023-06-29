<script lang="ts">
    // export let primaryColor: string = "#000000"
    // export let secondaryColor: string = "#000000"
</script>

<button id="special-btn">
    <slot />
</button>

<style>
    #special-btn {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        border-radius: 15px;
        background-color: var(--color1);
        border: none;
        box-shadow: #00000066 0 2px 4px, #0000004d 0 7px 13px -3px,
            var(--color2) 0 -3px 0 inset;

        transition: all 0.1s ease-out 0s;

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    #special-btn:hover {
        transform: translateY(-3px);
        box-shadow: #00000066 0 2px 4px, #0000004d 0 7px 13px,
            var(--color2) 0 -3px 0 inset;
    }
</style>
