<script>
    import {
        allTypesStore,
        allStatusStore,
        allCatStore,
        allCatLevelStore,
        allSortStore,
        dateFilter,
        isOpenModalStore,
    } from "../store";
    import { getDateForInput } from "../utils/date";
    import { loadTransferFiters } from "../api/loadTransferFiters";

    import Filter from "./Filter.svelte";
    import SVGDate from "../assets/SVGDate.svelte";
    import SVGTags from "../assets/SVGTags.svelte";
    import SVGStatus from "../assets/SVGStatus.svelte";
    import SVGType from "../assets/SVGType.svelte";
    import SVGSort from "../assets/SVGSort.svelte";
    import SVGStart from "../assets/SVGStart.svelte";
    import SVGAdd from "../assets/SVGAdd.svelte";

    let isDate = $derived($dateFilter[0] || $dateFilter[1] ? true : false);
    let isType = $derived($allTypesStore.some((el) => el.isActive));
    let isStat = $derived($allStatusStore.some((el) => el.isActive));
    let isCat = $derived($allCatStore.some((el) => el.isActive));
    let isSort = $derived($allSortStore.some((el) => el.isActive));

    function updateFilters(store, elemID) {
        store.update((value) =>
            value.map((elem) => {
                if (elem.id === elemID) {
                    return { ...elem, isActive: !elem.isActive };
                }
                return elem;
            }),
        );
    }

    function updateDate(event, isStart = false) {
        const ds = event.currentTarget.value;
        if (!ds) return;
        const dateObject = new Date(ds + "T00:00:00Z");

        dateFilter.update((value) => {
            if (isStart) {
                return [getDateForInput(dateObject), value[1]];
            }
            return [value[0], getDateForInput(dateObject)];
        });
    }

    function removeFilter(store) {
        store.update((value) =>
            value.map((elem) => ({ ...elem, isActive: false })),
        );
    }

    function openNewTransfer() {
        isOpenModalStore.update((value) => ({
            ...value,
            transferID: -1,
            isMounted: true,
        }));
    }
</script>

<div class="panel">
    <button class="new-transfer" onclick={openNewTransfer}><SVGAdd /></button>

    <div class="line"></div>

    <Filter
        name="время перевода"
        title="Переводы за период"
        svg={SVGDate}
        onDelete={() => dateFilter.set(["", ""])}
        onStart={() => loadTransferFiters()}
        isActive={isDate}
    >
        <div class="scroll">
            <input
                type="date"
                name=""
                id="date-start"
                value={$dateFilter[0]}
                onchange={(e) => updateDate(e, true)}
            />
            <input
                type="date"
                name=""
                id="date-end"
                value={$dateFilter[1]}
                onchange={(e) => updateDate(e, false)}
            />
        </div>
    </Filter>

    <Filter
        name="типы перевода"
        title="Фильтровать по типу перевода"
        svg={SVGType}
        onDelete={() => removeFilter(allTypesStore)}
        onStart={() => loadTransferFiters()}
        onOpen={() => {}}
        isActive={isType}
    >
        <div class="scroll">
            {#each $allTypesStore as t (t.id)}
                <button
                    class="point"
                    class:active={t.isActive}
                    onclick={() => updateFilters(allTypesStore, t.id)}
                    >{t.name}
                </button>
            {/each}
        </div>
    </Filter>

    <Filter
        name="статусы переводов"
        title="Фильтровать по статусу перевода"
        svg={SVGStatus}
        onDelete={() => removeFilter(allStatusStore)}
        onStart={() => loadTransferFiters()}
        onOpen={() => {}}
        isActive={isStat}
    >
        <div class="scroll">
            {#each $allStatusStore as t (t.id)}
                <button
                    class="point"
                    class:active={t.isActive}
                    onclick={() => updateFilters(allStatusStore, t.id)}
                    >{t.name}
                </button>
            {/each}
        </div>
    </Filter>

    <Filter
        name="категории переводов"
        title="Фильтровать по категориям"
        svg={SVGTags}
        onDelete={() => removeFilter(allCatStore)}
        onStart={() => loadTransferFiters()}
        onOpen={() => {}}
        isActive={isCat}
    >
        <div class="scroll">
            {#each $allCatLevelStore as t (t.id)}
                <button
                    class="point"
                    class:active={t.isActive}
                    onclick={() => updateFilters(allCatStore, t.id)}
                    >{t.name}
                </button>
                {#each t.children as ch (ch.id)}
                    <button
                        class="point cp2"
                        class:active={ch.isActive}
                        onclick={() => updateFilters(allCatStore, ch.id)}
                        >{ch.name}
                    </button>
                {/each}
            {/each}
        </div>
    </Filter>

    <div class="line"></div>

    <Filter
        name="сортировать"
        title="Сортировать"
        svg={SVGSort}
        onDelete={() => removeFilter(allSortStore)}
        onStart={() => loadTransferFiters()}
        onOpen={() => {}}
        isActive={isSort}
    >
        <div class="scroll">
            {#each $allSortStore as t (t.id)}
                <button
                    class="point"
                    class:active={t.isActive}
                    onclick={() => updateFilters(allSortStore, t.id)}
                    >{t.name}
                </button>
            {/each}
        </div>
    </Filter>

    <div class="line"></div>

    <button class="start" onclick={loadTransferFiters}><SVGStart /></button>
</div>

<style lang="scss">
    .panel {
        position: fixed;
        width: 100%;
        background-color: var(--color-basic-white-80);
        padding: 0.8em;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;

        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);

        backdrop-filter: blur(6px);
        z-index: 100;
    }

    .line {
        height: 1em;
        width: 1px;
        background-color: var(--color-dark-charcoal);
        display: flex;
        opacity: 0.4;
    }

    .point {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0.1em 1em 0.1em 2em;
        cursor: pointer;
        border-radius: 3px;
        user-select: none;
        position: relative;
        color: var(--color-dark-charcoal);
        white-space: nowrap;

        &:hover {
            background-color: rgba($color: #000, $alpha: 0.08);
        }

        &::after,
        &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 1em;
            transform: translate(-50%, -50%);
            border-radius: 3px;
        }

        &::after {
            width: 1em;
            height: 1em;
            border: 1px solid var(--color-dark-charcoal);
            background-color: transparent;
        }

        &::before {
            width: 0.4em;
            height: 0.4em;
            background-color: var(--color-dark-charcoal);
            scale: 0;
        }

        &.active::before {
            scale: 1;
        }

        &.cp2 {
            margin-left: 2em;
        }
    }

    #date-start,
    #date-end {
        padding: 0.5em 0.5em 0.5em 1em;
        border-radius: 3px;
        font-size: 1em;
        color: var(--color-dark-charcoal);

        &:hover {
            background-color: rgba($color: #000000, $alpha: 0.08);
        }
    }

    .start,
    .new-transfer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5em;
        cursor: pointer;
        border-radius: 3px;
        user-select: none;
        overflow: hidden;

        &:hover {
            background-color: rgba($color: #000000, $alpha: 0.08);
        }
    }

    .scroll {
        max-height: 30vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.3em;
    }
</style>
