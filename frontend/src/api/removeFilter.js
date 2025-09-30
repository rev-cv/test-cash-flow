import { allTypesStore, allStatusStore, allCatStore } from "../store";
import { loadCategory } from "./loadCategories";
import { loadMarks } from "./loadMarks";
import { loadStatus } from "./loadStatuses";
import { loadTransfer } from "./loadTransfers";

export const removeTypeFilter = async (filterID) => {
    try {
        const res = await fetch(`/api/filters/delete/mark/${filterID}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        allTypesStore.update((value) =>
            value.filter((el) => el.id != filterID)
        );
        update();
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

export const removeStatusFilter = async (filterID) => {
    try {
        const res = await fetch(`/api/filters/delete/status/${filterID}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        allStatusStore.update((value) =>
            value.filter((el) => el.id != filterID)
        );
        update();
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

export const removeCategoryFilter = async (filterID) => {
    try {
        const res = await fetch(`/api/filters/delete/category/${filterID}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        allCatStore.update((value) =>
            value.filter((el) => el.id != filterID && el.parent != filterID)
        );

        update();
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

function update() {
    // loadCategory();
    // loadMarks();
    // loadStatus();
    loadTransfer();
}
