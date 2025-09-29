import { transferStore } from "../store";

export const loadTransfer = async () => {
    transferStore.set([]);

    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/transfers/`, { method: "GET" });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        transferStore.set(data);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
