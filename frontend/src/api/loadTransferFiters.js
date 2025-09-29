import { get } from "svelte/store";
import {
    transferStore,
    allTypesStore,
    dateFilter,
    allStatusStore,
    allCatStore,
    allSortStore,
} from "../store";

export const loadTransferFiters = async () => {
    transferStore.set([]);

    // ↓ установить флаг процесса загрузки

    const sorts = get(allSortStore);

    const dataRequest = {
        dates: get(dateFilter),
        marks: get(allTypesStore)
            .filter((el) => el.isActive)
            .map((el) => el.id),
        statuses: get(allStatusStore)
            .filter((el) => el.isActive)
            .map((el) => el.id),
        categories: get(allCatStore)
            .filter((el) => el.isActive)
            .map((el) => el.id),
        is_reverse: sorts.find((el) => el.id === 0)?.isActive || false,
        sort_by_date: sorts.find((el) => el.id === 2)?.isActive || false,
        sort_by_sum: sorts.find((el) => el.id === 1)?.isActive || false,
    };

    try {
        const res = await fetch(`/api/transfers/`, {
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
        transferStore.set(data);
    } catch (err) {
        console.error("Ошибка:", err);
    }
};
