import { allTypesStore, allStatusStore, allCatStore } from "../store";

export const createType = async (newType) => {
    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/filters/add/`, {
            method: "POST",
            body: JSON.stringify({ name: newType, t: "mark" }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allTypesStore.update((value) => [...value, data]);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

export const createStatus = async (newType) => {
    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/filters/add/`, {
            method: "POST",
            body: JSON.stringify({ name: newType, t: "status" }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allStatusStore.update((value) => [...value, data]);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

export const createCategory = async (newType, parent) => {
    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/filters/add/`, {
            method: "POST",
            body: JSON.stringify({ name: newType, t: "category", p: parent }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allCatStore.update((value) => [...value, data]);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
