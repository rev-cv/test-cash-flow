import { writable, derived } from "svelte/store";

export const allTypesStore = writable([
    { name: "Пополнение", id: 1, isActive: false },
    { name: "Списание", id: 2, isActive: true },
]);

export const allStatusStore = writable([
    { name: "Бизнес", id: 1, isActive: false },
    { name: "Личное", id: 2, isActive: true },
    { name: "Налог", id: 3, isActive: true },
]);

export const allCatStore = writable([
    { name: "Инфраструктура", id: 1, isActive: false, parent: 0 },
    { name: "VPS", id: 2, isActive: false, parent: 1 },
    { name: "Proxy", id: 3, isActive: false, parent: 1 },
    { name: "Маркетинг", id: 4, isActive: false, parent: 0 },
    { name: "Farpost", id: 5, isActive: false, parent: 4 },
    { name: "Avito", id: 6, isActive: true, parent: 4 },

    { name: "Разработка", id: 7, isActive: false, parent: 0 },
    { name: "Frontend", id: 8, isActive: true, parent: 7 },
    { name: "Backend", id: 9, isActive: false, parent: 7 },
    { name: "Мобильная разработка", id: 10, isActive: false, parent: 7 },
    { name: "Базы данных", id: 11, isActive: false, parent: 7 },
    { name: "Тестирование", id: 12, isActive: false, parent: 7 },

    { name: "Финансы", id: 13, isActive: true, parent: 0 },
    { name: "Бухгалтерия", id: 14, isActive: false, parent: 13 },
    { name: "Налоги", id: 15, isActive: false, parent: 13 },
    { name: "Инвестиции", id: 16, isActive: true, parent: 13 },
    { name: "Кредиты", id: 17, isActive: false, parent: 13 },
    { name: "Страхование", id: 18, isActive: false, parent: 13 },

    { name: "HR и Кадры", id: 19, isActive: false, parent: 0 },
    { name: "Подбор персонала", id: 20, isActive: false, parent: 19 },
    { name: "Обучение", id: 21, isActive: true, parent: 19 },
    { name: "Адаптация", id: 22, isActive: false, parent: 19 },
    { name: "Мотивация", id: 23, isActive: false, parent: 19 },

    { name: "Продажи", id: 24, isActive: false, parent: 0 },
    { name: "Холодные звонки", id: 25, isActive: false, parent: 24 },
    { name: "CRM", id: 26, isActive: true, parent: 24 },
    { name: "B2B", id: 27, isActive: false, parent: 24 },
    { name: "B2C", id: 28, isActive: false, parent: 24 },

    { name: "Дизайн", id: 29, isActive: true, parent: 0 },
    { name: "UX/UI", id: 30, isActive: true, parent: 29 },
    { name: "Графический дизайн", id: 31, isActive: false, parent: 29 },
    { name: "Веб-дизайн", id: 32, isActive: false, parent: 29 },
    { name: "Айдентика", id: 33, isActive: false, parent: 29 },

    { name: "Контент", id: 34, isActive: false, parent: 0 },
    { name: "Копирайтинг", id: 35, isActive: true, parent: 34 },
    { name: "Редактура", id: 36, isActive: false, parent: 34 },
    { name: "Видео", id: 37, isActive: false, parent: 34 },
    { name: "Фото", id: 38, isActive: false, parent: 34 },

    { name: "Логистика", id: 39, isActive: false, parent: 0 },
    { name: "Склады", id: 40, isActive: false, parent: 39 },
    { name: "Транспорт", id: 41, isActive: false, parent: 39 },
    { name: "Таможня", id: 42, isActive: false, parent: 39 },

    { name: "Безопасность", id: 43, isActive: true, parent: 0 },
    { name: "Информационная", id: 44, isActive: false, parent: 43 },
    { name: "Физическая", id: 45, isActive: false, parent: 43 },
    { name: "Аудит", id: 46, isActive: false, parent: 43 },

    { name: "Документооборот", id: 47, isActive: false, parent: 0 },
    { name: "Электронный", id: 48, isActive: true, parent: 47 },
    { name: "Архив", id: 49, isActive: false, parent: 47 },

    { name: "Обслуживание", id: 50, isActive: false, parent: 0 },
    { name: "Клиенты", id: 51, isActive: false, parent: 50 },
    { name: "Оборудование", id: 52, isActive: true, parent: 50 },

    { name: "Образование", id: 57, isActive: false, parent: 0 },
    { name: "Онлайн-курсы", id: 58, isActive: true, parent: 57 },
    { name: "Вебинары", id: 59, isActive: false, parent: 57 },
    { name: "Саморазвитие", id: 60, isActive: false, parent: 57 },
]);

export const allCatLevelStore = derived(allCatStore, ($allCat) => {
    const parents = $allCat.filter((cat) => cat.parent === 0);
    return parents.map((parent) => ({
        name: parent.name,
        id: parent.id,
        isActive: parent.isActive,
        children: $allCat
            .filter((cat) => cat.parent === parent.id)
            .map((child) => ({
                name: child.name,
                id: child.id,
                isActive: child.isActive,
            })),
    }));
});

export const allSortStore = writable([
    { name: "реверс", id: 4, isActive: true },
    { name: "по сумме", id: 1, isActive: false },
    { name: "по дате", id: 2, isActive: true },
]);

export const isOpenModalStore = writable({
    transferID: null,
    isView: false,
    isMounted: false,
});

export const transferStore = writable([
    {
        id: 0,
        created: "2025-09-26T10:15:00Z",
        status: { name: "Личное", id: 2 },
        sum: 5000,
        mark: { name: "Расход", id: 2 },
        cat: [],
        comment: "Еженедельные покупки продуктов",
    },
    {
        id: 1,
        created: "2025-09-25T18:30:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 150000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Вебинары", id: 59, isActive: false, parent: 57 },
            { name: "Саморазвитие", id: 60, isActive: false, parent: 57 },
        ],
        comment: "Оплата рекламной кампании",
    },
    {
        id: 2,
        created: "2025-09-24T09:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 1200,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Обслуживание", id: 50, isActive: false, parent: 0 },
            { name: "Клиенты", id: 51, isActive: false, parent: 50 },
            { name: "Оборудование", id: 52, isActive: true, parent: 50 },
        ],
        comment: "Поездка на работу",
    },
    {
        id: 3,
        created: "2025-09-23T15:45:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 75000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Безопасность", id: 43, isActive: true, parent: 0 },
            { name: "Информационная", id: 44, isActive: false, parent: 43 },
            { name: "Физическая", id: 45, isActive: false, parent: 43 },
            { name: "Аудит", id: 46, isActive: false, parent: 43 },
        ],
        comment: "Оплата хостинга на полгода",
    },
    {
        id: 4,
        created: "2025-09-22T20:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 8000,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Безопасность", id: 43, isActive: true, parent: 0 },
            { name: "Информационная", id: 44, isActive: false, parent: 43 },
            { name: "Физическая", id: 45, isActive: false, parent: 43 },
            { name: "Аудит", id: 46, isActive: false, parent: 43 },
        ],
        comment: "Поход в кино и ужин",
    },
    {
        id: 5,
        created: "2025-09-21T12:00:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 50000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Оплата за проданный курс",
    },
    {
        id: 6,
        created: "2025-09-20T17:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 6500,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Покупка куртки",
    },
    {
        id: 7,
        created: "2025-09-19T11:30:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 25000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Оплата за часовую консультацию",
    },
    {
        id: 8,
        created: "2025-09-18T14:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 300,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Кофе на вынос",
    },
    {
        id: 9,
        created: "2025-09-17T08:45:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 12000,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Продление прокси-серверов",
    },
    {
        id: 10,
        created: "2025-09-16T19:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 1500,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Оплата месячного абонемента в спортзал",
    },
    {
        id: 11,
        created: "2025-09-15T10:00:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 200000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Оплата за разработку нового сайта",
    },
    {
        id: 12,
        created: "2025-09-14T21:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 4500,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Покупка витаминов",
    },
    {
        id: 13,
        created: "2025-09-13T16:00:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 10000,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Закупка канцтоваров для офиса",
    },
    {
        id: 14,
        created: "2025-09-12T13:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 700,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Покупка месячного проездного",
    },
    {
        id: 15,
        created: "2025-09-11T18:00:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 30000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Оплата за написание текстов",
    },
    {
        id: 16,
        created: "2025-09-10T12:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 2000,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Покупка нескольких книг",
    },
    {
        id: 17,
        created: "2025-09-09T17:30:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 45000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Оплата за участие в групповом тренинге",
    },
    {
        id: 18,
        created: "2025-09-08T11:00:00Z",
        status: { name: "Личное", id: 2 },
        sum: 250,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Покупка шоколада",
    },
    {
        id: 19,
        created: "2025-09-07T14:30:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 60000,
        mark: { name: "Расход", id: 2 },
        cat: [
            { name: "Редактура", id: 36, isActive: false, parent: 34 },
            { name: "Видео", id: 37, isActive: false, parent: 34 },
            { name: "Фото", id: 38, isActive: false, parent: 34 },
        ],
        comment: "Ежемесячная оплата услуг SMM-менеджера",
    },
]);

export const currentEditingTransfer = derived(
    [transferStore, isOpenModalStore],
    ([$transfers, $modal]) => {
        if ($modal.transferID < 0) return null;
        return $transfers.find((t) => t.id === $modal.transferID);
    }
);
