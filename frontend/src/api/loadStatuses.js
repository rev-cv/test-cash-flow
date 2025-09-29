import { allStatusStore } from "../store";

export const loadStatus = async () => {
    allStatusStore.set([]);

    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/statuses/`, { method: "GET" });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        allStatusStore.set(data);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
