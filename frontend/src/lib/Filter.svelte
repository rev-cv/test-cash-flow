<script>
    import { clickOutside } from "../actions/clickOutSide";
    import { scrollOutside } from "../actions/scrollOutside";
    import SVGStart from "../assets/SVGStart.svelte";
    import SVGDelete from "../assets/SVGDelete.svelte";
    import SVGList from "../assets/SVGList.svelte";

    let {
        name = "",
        title = "",
        svg = SVGDelete,
        onDelete = null,
        onStart = null,
        onOpen = null,
        isActive = false,
        children,
    } = $props();

    const SVG = svg;
    let isOpen = $state(false);
</script>

<div
    class="filter"
    class:view={isOpen}
    class:active={isActive}
    use:clickOutside={() => (isOpen = false)}
    use:scrollOutside={() => (isOpen = false)}
>
    <button aria-label={name} onclick={() => (isOpen = !isOpen)} title={name}>
        <SVG />
    </button>

    <div class="viewer">
        <div class="title">{title}</div>

        {@render children()}

        <div class="btns">
            {#if onOpen}
                <button
                    onclick={() => {
                        if (typeof onOpen === "function") {
                            onOpen();
                            isOpen = false;
                        }
                    }}
                    ><SVGList />
                </button>
            {/if}
            <button
                onclick={() => {
                    if (typeof onDelete === "function") {
                        onDelete();
                        isOpen = false;
                    }
                }}
                ><SVGDelete />
            </button>
            <button
                onclick={() => {
                    if (typeof onStart === "function") {
                        onStart();
                        isOpen = false;
                    }
                }}
                ><SVGStart />
            </button>
        </div>
    </div>
</div>

<style lang="scss">
    .filter {
        position: relative;

        * {
            color: var(--color-dark-charcoal);
        }

        button {
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

        &:not(.view) .viewer {
            display: none;
        }

        &.active > button {
            color: var(--color-basic-white);
            background-color: var(--color-dark-charcoal);
        }

        .viewer {
            position: absolute;
            top: 125%;
            background-color: var(--color-basic-white);
            min-width: 16em;
            padding: 1em;
            border-radius: 3px;

            display: flex;
            flex-direction: column;
            gap: 0.3em;
            box-shadow: 0px 10px 29px 10px rgba(0, 0, 0, 0.2);
        }

        .title {
            font-size: 0.8em;
            display: flex;
            justify-content: space-between;
            gap: 0.3em;
        }

        .btns {
            display: flex;
            gap: 0.3em;
            justify-content: start;

            button {
                padding: 0.7em;
                font-size: 0.8em;
            }

            button:last-child {
                flex-grow: 1;
            }
        }
    }
</style>
