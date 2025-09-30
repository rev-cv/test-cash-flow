import { writable, derived } from "svelte/store";
import { loadTransfer } from "./api/loadTransfers";
import { loadMarks } from "./api/loadMarks";
import { loadCategory } from "./api/loadCategories";
import { loadStatus } from "./api/loadStatuses";

export const dateFilter = writable(["", ""]);

export const allTypesStore = writable([
    { name: "Пополнение", id: 1, isActive: false },
    { name: "Списание", id: 2, isActive: true },
]);

export const allStatusStore = writable([
    { name: "Бизнес", id: 1, isActive: false },
    { name: "Личное", id: 2, isActive: true },
    { name: "Налог", id: 3, isActive: true },
]);

export const allCatStore = writable([
    { name: "Инфраструктура", id: 1, isActive: false, parent: 0 },
    { name: "VPS", id: 2, isActive: false, parent: 1 },
    { name: "Proxy", id: 3, isActive: false, parent: 1 },
    { name: "Маркетинг", id: 4, isActive: false, parent: 0 },
    { name: "Farpost", id: 5, isActive: false, parent: 4 },
    { name: "Avito", id: 6, isActive: true, parent: 4 },
]);

export const allCatLevelStore = derived(allCatStore, ($allCat) => {
    const parents = $allCat.filter((cat) => cat.parent === null);
    return parents.map((parent) => ({
        name: parent.name,
        id: parent.id,
        isActive: parent.isActive,
        children: $allCat
            .filter((cat) => cat.parent === parent.id)
            .map((child) => ({
                name: child.name,
                id: child.id,
                isActive: child.isActive,
            })),
    }));
});

export const allSortStore = writable([
    { name: "реверс", id: 0, isActive: false },
    { name: "по сумме", id: 1, isActive: false },
    { name: "по дате", id: 2, isActive: false },
]);

export const isOpenTransferModalStore = writable({
    transferID: null,
    isView: false,
    isMounted: false,
});

export const isOpenFilterModalStore = writable({
    typeFilter: null, // "mark", "status", "category"
    isView: false,
    isMounted: false,
});

export const transferStore = writable([
    {
        id: 0,
        created: "2025-09-26T10:15:00Z",
        status: { name: "Личное", id: 2 },
        sum: 5000,
        mark: { name: "Расход", id: 2 },
        cat: [],
        comment: "Еженедельные покупки продуктов",
    },
    {
        id: 1,
        created: "2025-09-25T18:30:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 150000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Вебинары", id: 59, isActive: false, parent: 57 },
            { name: "Саморазвитие", id: 60, isActive: false, parent: 57 },
        ],
        comment: "Оплата рекламной кампании",
    },
]);

export const currentEditingTransfer = derived(
    [transferStore, isOpenTransferModalStore],
    ([$transfers, $modal]) => {
        if ($modal.transferID < 0) return null;
        return $transfers.find((t) => t.id === $modal.transferID);
    }
);

export const newEditingTransfer = writable({
    id: -1,
    created: "",
    status: null,
    sum: 0,
    mark: null,
    cat: [],
    comment: "",
});

loadTransfer();
loadMarks();
loadCategory();
loadStatus();
