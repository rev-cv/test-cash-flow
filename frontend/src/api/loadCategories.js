import { allCatStore } from "../store";

export const loadCategory = async () => {
    allCatStore.set([]);

    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/categories/`, { method: "GET" });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allCatStore.set(data);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
