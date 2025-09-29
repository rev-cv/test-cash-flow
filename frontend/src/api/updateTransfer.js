import { transferStore } from "../store";
import { get } from "svelte/store";

export const updateTransfer = async (transferID) => {
    // transferStore.set([]);
    const dataRequest = get(transferStore).find((el) => el.id === transferID);

    // ↓ установить флаг процесса загрузки

    try {
        const res = await fetch(`/api/transfers/${transferID}/`, {
            method: "PUT",
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
        transferStore.update((value) =>
            value.map((el) => (el.id === data.id ? data : el))
        );
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
