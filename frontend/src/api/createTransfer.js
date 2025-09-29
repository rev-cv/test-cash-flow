import { transferStore, newEditingTransfer } from "../store";
import { get } from "svelte/store";

export const createTransfer = async () => {
    const dataRequest = get(newEditingTransfer);

    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/transfers/new/`, {
            method: "POST",
            body: JSON.stringify(dataRequest),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        const data = await res.json();
        transferStore.update((value) => [data, ...value]);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
