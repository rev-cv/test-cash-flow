<script>
    import { isOpenTransferModalStore, isOpenFilterModalStore } from "./store";
    import Panel from "./lib/Panel.svelte";
    import Transfers from "./lib/Transfers.svelte";
    import TransferModal from "./lib/TransferModal.svelte";
    import FilterModal from "./lib/FilterModal.svelte";
</script>

<main>
    <Panel />
    <Transfers />
    {#if $isOpenTransferModalStore.isMounted}
        <TransferModal />
    {/if}
    {#if $isOpenFilterModalStore.isMounted}
        <FilterModal />
    {/if}
</main>

<style>
    main {
        background-color: var(--color-basic-white);
        flex-grow: 1;
        position: relative;
    }
</style>
