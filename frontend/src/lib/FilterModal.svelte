<script>
    import {
        isOpenFilterModalStore,
        allTypesStore,
        allStatusStore,
        allCatLevelStore,
    } from "../store";

    import {
        createType,
        createStatus,
        createCategory,
    } from "../api/createFilter";

    import {
        removeTypeFilter,
        removeStatusFilter,
        removeCategoryFilter,
    } from "../api/removeFilter";

    import {
        updateType,
        updateCategory,
        updateStatus,
    } from "../api/updateFilter";

    import SVGAdd from "../assets/SVGAdd.svelte";
    import SVGEdit from "../assets/SVGEdit.svelte";
    import SVGDelete from "../assets/SVGDelete.svelte";

    let addFor = $state(null); // {name, id}
    let editFor = $state(null); // {name, id}
    let inputNewTem = $state("");

    let isType = $derived($isOpenFilterModalStore.typeFilter === "mark");
    let isStatus = $derived($isOpenFilterModalStore.typeFilter === "status");
    let isCat = $derived($isOpenFilterModalStore.typeFilter === "category");

    function startUnMount() {
        isOpenFilterModalStore.update((value) => ({
            ...value,
            isMounted: false,
        }));
    }

    function writeNew() {
        if (!inputNewTem.trim()) return;

        if (editFor != null) {
            if (isType) {
                updateType(inputNewTem, editFor.id);
            } else if (isStatus) {
                updateStatus(inputNewTem, editFor.id);
            } else if (isCat) {
                updateCategory(inputNewTem, editFor.id);
            }
        } else {
            if (isType) {
                createType(inputNewTem);
            } else if (isStatus) {
                createStatus(inputNewTem);
            } else if (isCat) {
                createCategory(inputNewTem, addFor === null ? null : addFor.id);
            }
        }

        inputNewTem = "";
        addFor = null;
        editFor = null;
    }

    function updateItem(name, id) {
        if (editFor?.id === id) {
            editFor = null;
            inputNewTem = "";
        } else {
            editFor = { name, id };
            inputNewTem = name;
        }
    }
</script>

<div
    class="curtain"
    class:render={$isOpenFilterModalStore.isView}
    onclick={startUnMount}
    onkeypress={(e) => {
        if (e.key === "Esc") {
            startUnMount();
        }
    }}
    aria-label="Закрыть модальное окно"
    role="button"
    tabindex="0"
>
    <div
        class="modal"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        tabindex="-1"
        aria-modal="true"
    >
        <div class="scroll">
            {#if isType}
                {#each $allTypesStore as elem (elem.id)}
                    <div class="line-point">
                        <div class="point">{elem.name}</div>
                        <button onclick={() => updateItem(elem.name, elem.id)}
                            ><SVGEdit /></button
                        >
                        <button onclick={() => removeTypeFilter(elem.id)}
                            ><SVGDelete /></button
                        >
                    </div>
                {/each}
            {:else if isStatus}
                {#each $allStatusStore as elem (elem.id)}
                    <div class="line-point">
                        <div class="point">{elem.name}</div>
                        <button onclick={() => updateItem(elem.name, elem.id)}
                            ><SVGEdit /></button
                        >
                        <button onclick={() => removeStatusFilter(elem.id)}
                            ><SVGDelete /></button
                        >
                    </div>
                {/each}
            {:else if isCat}
                {#each $allCatLevelStore as elem (elem.id)}
                    <div class="line-point">
                        <div class="point">{elem.name}</div>
                        <button
                            onclick={() => {
                                if (addFor?.id === elem.id) {
                                    addFor = null;
                                } else {
                                    addFor = { name: elem.name, id: elem.id };
                                }
                            }}><SVGAdd /></button
                        >
                        <button onclick={() => updateItem(elem.name, elem.id)}
                            ><SVGEdit /></button
                        >

                        <button onclick={() => removeCategoryFilter(elem.id)}
                            ><SVGDelete /></button
                        >
                    </div>

                    {#each elem.children as elch (elch.id)}
                        <div class="line-point cp2">
                            <div class="point">{elch.name}</div>
                            <button
                                onclick={() => updateItem(elch.name, elch.id)}
                                ><SVGEdit /></button
                            >
                            <button
                                onclick={() => removeCategoryFilter(elch.id)}
                                ><SVGDelete /></button
                            >
                        </div>
                    {/each}
                {/each}
            {/if}
        </div>

        <div class="bottom-new">
            {#if addFor != null}
                <button
                    onclick={() => {
                        addFor = null;
                    }}>for «{addFor?.name}»</button
                >
            {/if}

            {#if editFor != null}
                <button
                    onclick={() => {
                        addFor = null;
                    }}>edit «{editFor?.name}»</button
                >
            {/if}

            <input type="text" bind:value={inputNewTem} placeholder="new" />
            <button onclick={writeNew}><SVGAdd /></button>
        </div>
    </div>
</div>

<style lang="scss">
    @mixin button() {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5em;
        cursor: pointer;
        border-radius: 3px;
        user-select: none;
        overflow: hidden;
        align-self: start;

        &:hover {
            background-color: rgba($color: #000000, $alpha: 0.08);
        }
    }

    .curtain {
        z-index: 101;
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(0px);
        opacity: 0;
        transition:
            opacity 300ms ease-in-out,
            backdrop-filter 300ms ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .modal {
            background-color: var(--color-basic-white);
            min-width: 600px;
            min-height: 60vh;
            max-height: 60vh;
            height: 100%;
            cursor: default;
            scale: 0;
            transition:
                scale 300ms ease-in-out,
                grid-template-columns 300ms ease-in-out;
            border-radius: 1em;
            padding: 1em;

            display: flex;
            flex-direction: column;
            gap: 1em;

            position: relative;
        }

        .scroll {
            display: flex;
            flex-direction: column;
            justify-content: start;
            flex-grow: 1;

            overflow-y: scroll;
            max-height: 100%;
        }

        &.render {
            opacity: 1;
            backdrop-filter: blur(6px);

            .modal {
                scale: 1;
            }
        }

        input {
            padding: 0.5em 0.5em 0.5em 1em;
            border-radius: 3px;
            font-size: 1em;
            color: var(--color-dark-charcoal);
            resize: none;
            flex-grow: 1;

            &:hover {
                background-color: rgba($color: #000000, $alpha: 0.08);
            }
        }

        .point {
            display: flex;
            justify-content: start;
            align-items: center;
            padding: 0.3em 1em;
            // cursor: pointer;
            border-radius: 3px;
            user-select: none;
            position: relative;
            color: var(--color-dark-charcoal);
            white-space: nowrap;

            &::after,
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 1em;
                transform: translate(-50%, -50%);
                border-radius: 3px;
            }
        }

        .line-point {
            display: flex;

            .point {
                flex-grow: 1;
            }

            &.cp2 {
                padding-left: 2em;
            }
        }

        .bottom-new {
            display: flex;
        }

        button {
            color: var(--color-dark-charcoal);
            padding: 0.5em;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: rgba($color: #000, $alpha: 0.08);
            }
        }
    }
</style>
