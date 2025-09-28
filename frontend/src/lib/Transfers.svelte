<script>
    import { transferStore, isOpenModalStore } from "../store";
    import { gateString } from "../utils/date";

    function openItem(tans) {
        isOpenModalStore.update(() => ({
            transferID: tans.id,
            isView: false,
            isMounted: true,
        }));
    }
</script>

<div class="transfer-list">
    <div class="item-title">
        <div>создано</div>
        <div>сумма</div>
        <div>метка</div>
        <div>статус</div>
        <div>теги</div>
        <div>комментарий</div>
    </div>
    {#each $transferStore as t (t.id)}
        <button class="item" onclick={() => openItem(t)}>
            <div class="dt">{gateString(t.created)}</div>
            <div class="sm">{t.sum.toLocaleString("ru-RU") || "-"} ₽</div>
            <div class="mk">{t.mark?.name || "-"}</div>
            <div class="st">{t.status?.name || "-"}</div>
            <div>
                {#each t.cat as cat (cat.id)}
                    <div>{cat.name || "-"}</div>
                {/each}
            </div>
            <div class="cm">{t.comment}</div>
        </button>
    {/each}
</div>

<style lang="scss">
    .transfer-list {
        margin: 0 auto;
        max-width: 1200px;
        padding: 5em 1em 2em 1em;

        display: flex;
        flex-direction: column;

        * {
            color: var(--color-dark-charcoal);
        }

        .item-title {
            display: grid;
            grid-template-columns: 0.6fr 0.5fr 0.5fr 0.5fr 1fr 1fr;
            gap: 0.3em;
            padding: 0.2em 0.6em 0.6em 0.6em;

            > div {
                font-size: 0.7em;
            }
        }

        .item {
            background-color: rgba($color: #000000, $alpha: 0.05);
            padding: 0.2em 0.6em;

            display: grid;
            grid-template-columns: 0.6fr 0.5fr 0.5fr 0.5fr 1fr 1fr;
            gap: 0.1em 0.3em;
            user-select: none;
            cursor: pointer;

            outline: 3px solid transparent;
            outline-offset: 5px;

            &:first-child {
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
            }

            &:last-child {
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
            }

            &:nth-child(even) {
                background-color: rgba($color: #000000, $alpha: 0.1);
            }

            > div {
                font-size: 0.8em;
                text-align: left;
            }

            .dt {
                white-space: nowrap;
            }

            .cm {
                color: var(--color-dark-charcoal-70);
                line-height: 1.1em;
            }

            &:hover {
                outline-color: var(--color-dark-charcoal);
                border-radius: 6px;
            }
        }
    }
</style>
