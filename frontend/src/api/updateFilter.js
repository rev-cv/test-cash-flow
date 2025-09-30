import { allTypesStore, allStatusStore, allCatStore } from "../store";

export const updateType = async (newType, elemID) => {
    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/filters/update/`, {
            method: "POST",
            body: JSON.stringify({ name: newType, t: "mark", id: elemID }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allTypesStore.update((value) =>
            value.map((el) => (el.id === data.id ? { ...el, ...data } : el))
        );
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

export const updateStatus = async (newType, elemID) => {
    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/filters/update/`, {
            method: "POST",
            body: JSON.stringify({ name: newType, t: "status", id: elemID }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allStatusStore.update((value) =>
            value.map((el) => (el.id === data.id ? { ...el, ...data } : el))
        );
    } catch (err) {
        console.error("Ошибка:", err);
    }
};

export const updateCategory = async (newType, elemID) => {
    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/filters/update/`, {
            method: "POST",
            body: JSON.stringify({ name: newType, t: "category", id: elemID }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allCatStore.update((value) =>
            value.map((el) => (el.id === data.id ? { ...el, ...data } : el))
        );
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
