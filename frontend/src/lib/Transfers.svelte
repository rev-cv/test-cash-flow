<script>
    import { transferStore } from "../store";
    import { gateString } from "../utils/date";
    let transfers = $state($transferStore);
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
    {#each transfers as t (t.id)}
        <div class="item">
            <div class="dt">{gateString(t.created)}</div>
            <div class="sm">{t.sum.toLocaleString("ru-RU") || "-"} ₽</div>
            <div class="mk">{t.mark?.name || "-"}</div>
            <div class="st">{t.status?.name || "-"}</div>
            <div>
                {#each t.cat as cat (cat.id)}
                    <div class="ct1">{cat.name || "-"}</div>
                    {#each cat?.sub as scat (scat.id)}
                        <div class="ct2">{scat.name}</div>
                    {/each}
                {/each}
            </div>
            <div class="cm">{t.comment}</div>
        </div>
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
            }

            .dt {
                white-space: nowrap;
            }

            .cm {
                // grid-column: 1 / -1;
                color: var(--color-dark-charcoal-70);
                line-height: 1.1em;
            }

            .ct2 {
                padding-left: 1em;
                position: relative;
                transform: translateX(0.3em);

                &::before {
                    content: "";
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 20v-5C4 8.925 8.925 4 15 4h5'/%3E%3C/svg%3E");
                    background-repeat: no-repeat no-repeat;
                    background-position: center center;
                    background-size: cover;
                    width: 0.9em;
                    height: 0.9em;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-80%) rotate(-90deg);
                    opacity: 0.5;
                }
            }

            &:hover {
                outline-color: var(--color-dark-charcoal);
                border-radius: 6px;
            }

            // .sum {
            //     font-weight: 600;
            // }
        }
    }
</style>
