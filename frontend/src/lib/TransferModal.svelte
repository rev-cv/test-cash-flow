<script>
    import {
        isOpenModalStore,
        transferStore,
        allTypesStore,
        allStatusStore,
        allCatLevelStore,
        allCatStore,
        currentEditingTransfer,
    } from "../store";
    import SVGList from "../assets/SVGList.svelte";
    import SVGAdd from "../assets/SVGAdd.svelte";
    import { getDateForInput } from "../utils/date";

    let transfer = $state($currentEditingTransfer);

    let isNotMounted = $state(false);

    let activeAside = $state(null); // 'status', 'mark', 'cat', или null
    let inputNewTem = $state("");

    $effect(() => {
        transfer = $currentEditingTransfer;
    });

    $effect(() => {
        setTimeout(() => {
            isOpenModalStore.update((value) => ({ ...value, isView: true }));
            isNotMounted = true;
        }, 10);
    });

    $effect(() => {
        if (!$isOpenModalStore.isView && isNotMounted) {
            setTimeout(() => {
                isOpenModalStore.update((value) => ({
                    ...value,
                    isMounted: false,
                }));
            }, 300);
        }
    });

    function startUnMount() {
        isOpenModalStore.update((value) => ({ ...value, isView: false }));
    }

    function asideControl(what) {
        activeAside = activeAside && activeAside === what ? null : what;
        inputNewTem = "";
    }

    function updateMark(newMark) {
        transferStore.update((value) => {
            const newValue = value.map((el) => {
                if (el.id === transfer.id) {
                    return { ...el, mark: { ...newMark } };
                }
                return el;
            });
            return newValue;
        });
    }

    function updateStatus(newStatus) {
        transferStore.update((value) => {
            const newValue = value.map((el) => {
                if (el.id === transfer.id) {
                    return { ...el, status: { ...newStatus } };
                }
                return el;
            });
            return newValue;
        });
    }

    function updateSum(event) {
        const newSum = Number(event.target.value);
        transferStore.update((value) =>
            value.map((el) => {
                if (el.id === transfer.id) {
                    return { ...el, sum: newSum };
                }
                return el;
            }),
        );
    }

    function updateDate(event) {
        const newDate = new Date(event.target.value).toISOString();
        transferStore.update((value) =>
            value.map((el) => {
                if (el.id === transfer.id) {
                    return { ...el, created: newDate };
                }
                return el;
            }),
        );
    }

    function updateCategories(usecat) {
        transferStore.update((value) =>
            value.map((el) => {
                if (el.id === transfer.id) {
                    const isInCat = el.cat.some((c) => c.id === usecat.id);
                    const newCat = isInCat
                        ? el.cat?.filter((c) => c.id != usecat.id)
                        : [
                              ...el.cat,
                              {
                                  name: usecat.name,
                                  id: usecat.id,
                                  isActive: usecat.isActive ?? false,
                                  parent: usecat.parent ?? null,
                              },
                          ];
                    return { ...el, cat: newCat };
                }
                return el;
            }),
        );
    }

    function addNewElement(_, parentCategory = 0) {
        switch (activeAside) {
            case "status":
                const minStatusID = $allStatusStore.reduce(
                    (minId, currentItem) => {
                        return Math.min(minId, currentItem.id);
                    },
                    0,
                );
                allStatusStore.update((val) => [
                    ...val,
                    { id: minStatusID - 1, name: inputNewTem, isActive: false },
                ]);

                break;

            case "mark":
                const minMarkID = $allTypesStore.reduce(
                    (minId, currentItem) => {
                        return Math.min(minId, currentItem.id);
                    },
                    0,
                );
                allTypesStore.update((val) => [
                    ...val,
                    { id: minMarkID - 1, name: inputNewTem, isActive: false },
                ]);
                break;

            case "cat":
                const minCatID = $allCatLevelStore.reduce(
                    (minId, currentItem) => {
                        return Math.min(minId, currentItem.id);
                    },
                    0,
                );
                allCatStore.update((val) => [
                    ...val,
                    {
                        id: minCatID - 1,
                        name: inputNewTem,
                        isActive: false,
                        parent: parentCategory,
                    },
                ]);
                break;

            default:
                break;
        }

        inputNewTem = "";
    }
</script>

<div
    class="curtain"
    class:render={$isOpenModalStore.isView}
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
        class:aside-active={activeAside != null}
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        tabindex="-1"
        aria-modal="true"
    >
        <div class="left">
            <div class="label">transfer ID:</div>
            <div class="trans-id">{transfer?.id}</div>
            <div class="label">created:</div>
            <div class="create">
                <input
                    type="date"
                    value={getDateForInput(transfer?.created)}
                    onchange={updateDate}
                />
            </div>
            <div class="label">sum:</div>
            <div class="sum">
                <input type="text" value={transfer?.sum} onblur={updateSum} />
            </div>
            <div class="label">status:</div>
            <div class="status">
                <div>{transfer?.status?.name}</div>
                <button onclick={() => asideControl("status")}
                    ><SVGList /></button
                >
            </div>
            <div class="label">mark:</div>
            <div class="mark">
                <div>{transfer?.mark?.name}</div>
                <button onclick={() => asideControl("mark")}><SVGList /></button
                >
            </div>
            <div class="label">categories:</div>
            <div class="cat">
                <div>
                    {#each transfer?.cat as cat (cat.id)}
                        <div>{cat.name}</div>
                    {/each}
                </div>
                <button onclick={() => asideControl("cat")}><SVGList /></button>
            </div>
            <div class="label">comment:</div>
            <textarea class="comment">{transfer?.comment}</textarea>
        </div>

        <div class="right">
            <div class="scroll">
                {#if activeAside === "status"}
                    {#each $allStatusStore as t (t.id)}
                        <button
                            class="point"
                            class:active={t.id === transfer?.status.id}
                            onclick={() => updateStatus({ ...t })}
                            >{t.name}
                        </button>
                    {/each}
                {:else if activeAside === "mark"}
                    {#each $allTypesStore as t (t.id)}
                        <button
                            class="point"
                            class:active={t.id === transfer?.mark.id}
                            onclick={() => updateMark({ ...t })}
                            >{t.name}
                        </button>
                    {/each}
                {:else if activeAside === "cat"}
                    {#each $allCatLevelStore as cat (cat.id)}
                        <div class="ct1">
                            <button
                                class="point"
                                class:active={transfer?.cat &&
                                    transfer.cat.some((c) => c.id === cat.id)}
                                onclick={() => updateCategories(cat)}
                                >{cat.name}
                            </button>
                            <!-- <button onclick={addNewElement}><SVGAdd /></button> -->
                        </div>
                        {#each cat.children as sub}
                            <button
                                class="point ct2"
                                class:active={transfer?.cat &&
                                    transfer.cat.some((c) => c.id === sub.id)}
                                onclick={() => updateCategories(sub)}
                                >{sub.name}
                            </button>
                        {/each}
                    {/each}
                {/if}
            </div>
            <div class="input">
                <input type="text" bind:value={inputNewTem} placeholder="new" />
                <button onclick={addNewElement}><SVGAdd /></button>
            </div>
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
            min-width: 400px;
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

            display: grid;
            grid-template-columns: 1.6fr 0fr;

            &.aside-active {
                grid-template-columns: 1.6fr 1fr;
            }
        }

        &.render {
            opacity: 1;
            backdrop-filter: blur(6px);

            .modal {
                scale: 1;
            }
        }

        .left {
            // background-color: yellowgreen;
            display: grid;
            grid-template-columns: 6em 1fr;
            grid-template-rows: repeat(6, auto) 1fr;
            gap: 0.5em;
            padding-right: 1em;

            * {
                color: var(--color-dark-charcoal);
            }

            > div {
                justify-self: stretch;

                input {
                    width: 100%;
                }
            }

            .label {
                justify-self: right;
                opacity: 0.8;
                user-select: none;
                padding: 0.5em 0;
            }

            .sum {
                display: flex;
                gap: 1em;

                &::after {
                    content: "₽";
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    width: 2em;
                    font-size: 0.8em;
                }
            }

            .trans-id {
                padding: 0.5em 0.5em 0.5em 1em;
            }

            .mark,
            .status,
            .cat {
                padding: 0.5em 0.5em 0.5em 1em;
                display: flex;

                > div {
                    flex-grow: 1;
                }

                button {
                    @include button;
                }
            }
        }

        .right {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 1em;

            > div {
                overflow: hidden;
            }

            .point {
                display: flex;
                justify-content: start;
                align-items: center;
                // flex-grow: 1;
                width: 100%;
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

                &.ct2 {
                    margin-left: 2em;
                }
            }

            .ct1 {
                display: flex;

                // button:last-child {
                //     @include button;
                // }
            }

            .scroll {
                display: flex;
                flex-direction: column;
                justify-content: start;
                flex-grow: 1;

                overflow-y: scroll;
                max-height: 100%;
            }

            .input {
                display: flex;
                align-items: center;
                gap: 0.5em;
                flex-shrink: 0;

                input {
                    flex-grow: 1;
                }

                button {
                    @include button;
                }
            }
        }

        input,
        textarea {
            padding: 0.5em 0.5em 0.5em 1em;
            border-radius: 3px;
            font-size: 1em;
            color: var(--color-dark-charcoal);
            resize: none;

            &:hover {
                background-color: rgba($color: #000000, $alpha: 0.08);
            }
        }
    }
</style>
