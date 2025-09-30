import { transferStore } from "../store";

export const removeTransfer = async (transferID) => {
    try {
        const res = await fetch(`/api/transfers/delete/${transferID}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(`Ошибка: удаления`);
        }

        setTimeout(() => {
            transferStore.update((value) =>
                value.filter((el) => el.id != transferID)
            );
        }, 600);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
