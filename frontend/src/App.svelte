<script>
    import svelteLogo from "./assets/svelte.svg";
    import viteLogo from "/vite.svg";
    import Counter from "./lib/Counter.svelte";

    import Panel from "./lib/Panel.svelte";
    import Transfers from "./lib/Transfers.svelte";
    import TransferModal from "./lib/TransferModal.svelte";
    import TypeEditorModal from "./lib/TypeEditorModal.svelte";
    import StatusEditorModal from "./lib/StatusEditorModal.svelte";
</script>

<main>
    <!-- <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} class="logo" alt="Vite Logo" />
        </a>
        <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
        </a>
    </div>
    <h1>Vite + Svelte</h1>

    <div class="card">
        <Counter />
    </div>

    <p>
        Check out <a
            href="https://github.com/sveltejs/kit#readme"
            target="_blank"
            rel="noreferrer">SvelteKit</a
        >, the official Svelte app framework powered by Vite!
    </p>

    <p class="read-the-docs">
        Click on the Vite and Svelte logos to learn more
    </p> -->
    <Panel />
    <Transfers />
    <TransferModal />
    <TypeEditorModal />
    <StatusEditorModal />
</main>

<style>
    main {
        background-color: var(--color-basic-white);
        flex-grow: 1;
    }
</style>
