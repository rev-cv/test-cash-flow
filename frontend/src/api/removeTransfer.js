import { transferStore } from "../store";

export const removeTransfer = async (transferID) => {
    try {
        const res = await fetch(`/api/transfers/delete/${transferID}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Ошибка: ${errText}`);
        }

        transferStore.update((value) =>
            value.filter((el) => el.id != transferID)
        );
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
