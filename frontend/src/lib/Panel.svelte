<script>
    import {
        allTypesStore,
        allStatusStore,
        allCatStore,
        allSortStore,
    } from "../store";

    import Filter from "./Filter.svelte";
    import SVGDate from "../assets/SVGDate.svelte";
    import SVGTags from "../assets/SVGTags.svelte";
    import SVGStatus from "../assets/SVGStatus.svelte";
    import SVGType from "../assets/SVGType.svelte";
    import SVGSort from "../assets/SVGSort.svelte";
    import SVGStart from "../assets/SVGStart.svelte";

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    let allTypes = $state($allTypesStore);
    let allStatus = $state($allStatusStore);
    let allCat = $state($allCatStore);
    let allSort = $state($allSortStore);
    let currentCat = $state(1);

    let isType = $derived(allTypes.some((el) => el.isActive));
    let isStat = $derived(allStatus.some((el) => el.isActive));
    let isCat = $derived(allCat.some((el) => el.isActive));
    let isSort = $derived(allSort.some((el) => el.isActive));

    let allCategoryOne = $derived(
        allCat?.filter((elem) => elem.parent === 0) || [],
    );

    let allCategoryTwo = $derived(
        allCat?.filter((elem) => elem.parent === currentCat) || [],
    );

    $effect(() => {
        allTypes = $allTypesStore;
    });

    $effect(() => {
        allStatus = $allStatusStore;
    });

    $effect(() => {
        allCat = $allCatStore;
    });

    $effect(() => {
        allSort = $allSortStore;
    });

    function updateFilters(store, elemID) {
        store.update((value) =>
            value.map((elem) => {
                if (elem.id === elemID) {
                    console.log(elem.id, elemID);
                    return { ...elem, isActive: !elem.isActive };
                }
                return elem;
            }),
        );
    }

    function removeFilter(store) {
        store.update((value) =>
            value.map((elem) => ({ ...elem, isActive: false })),
        );
    }
</script>

<div class="panel">
    <Filter
        name="время перевода"
        title="Переводы за период"
        svg={SVGDate}
        onDelete={() => {}}
        onStart={() => {}}
    >
        <div class="scroll">
            <input type="date" name="" id="date-start" value={date} />
            <input type="date" name="" id="date-end" value={date} />
        </div>
    </Filter>

    <Filter
        name="типы перевода"
        title="Фильтровать по типу перевода"
        svg={SVGType}
        onDelete={() => removeFilter(allTypesStore)}
        onStart={() => {}}
        onOpen={() => {}}
        isActive={isType}
    >
        <div class="scroll">
            {#each allTypes as t (t.id)}
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
        onStart={() => {}}
        onOpen={() => {}}
        isActive={isStat}
    >
        <div class="scroll">
            {#each allStatus as t (t.id)}
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
        onStart={() => {}}
        onOpen={() => {}}
        isActive={isCat}
    >
        <div class="category-panel">
            <div class="left">
                {#each allCategoryOne as t (t.id)}
                    <button
                        class="point"
                        class:active={t.id === currentCat}
                        onclick={() => (currentCat = t.id)}
                        >{t.name}
                    </button>
                {/each}
            </div>
            <div class="right">
                {#each allCategoryTwo as t (t.id)}
                    <button
                        class="point"
                        class:active={t.isActive}
                        onclick={() => updateFilters(allCatStore, t.id)}
                        >{t.name}
                    </button>
                {/each}
            </div>
        </div>
    </Filter>

    <div class="line"></div>

    <Filter
        name="сортировать"
        title="Сортировать"
        svg={SVGSort}
        onDelete={() => removeFilter(allSortStore)}
        onStart={() => {}}
        onOpen={() => {}}
        isActive={isSort}
    >
        <div class="scroll">
            {#each allSort as t (t.id)}
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

    <button class="start"><SVGStart /></button>
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
        // background-color: rgba($color: #000, $alpha: 0.1);
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0.1em 1em 0.1em 2em;
        cursor: pointer;
        border-radius: 3px;
        user-select: none;
        position: relative;
        color: var(--color-dark-charcoal);

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

    .start {
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

    .category-panel {
        min-height: 30vh;

        display: grid;
        grid-template-columns: 1fr 1fr;

        width: 500px;

        .right,
        .left {
            overflow: hidden;
            max-height: 30vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.3em;
        }

        .left {
            padding-right: calc(0.5em - 1px);
        }

        .right {
            padding-left: 0.5em;
            border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
        }

        .left .point {
            padding-left: 1em;

            &::after,
            &::before {
                display: none;
            }

            &.active {
                background-color: var(--color-dark-charcoal);
                color: var(--color-basic-white);
            }
        }
    }
</style>
