import { allTypesStore } from "../store";

export const loadMarks = async () => {
    allTypesStore.set([]);

    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/marks/`, { method: "GET" });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allTypesStore.set(data);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
