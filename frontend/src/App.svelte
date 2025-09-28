<script>
    import { isOpenModalStore } from "./store";
    import Panel from "./lib/Panel.svelte";
    import Transfers from "./lib/Transfers.svelte";
    import TransferModal from "./lib/TransferModal.svelte";
</script>

<main>
    <Panel />
    <Transfers />
    {#if $isOpenModalStore.isMounted}
        <TransferModal />
    {/if}
</main>

<style>
    main {
        background-color: var(--color-basic-white);
        flex-grow: 1;
        position: relative;
    }
</style>
