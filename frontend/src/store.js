import { writable } from "svelte/store";

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
]);

export const allSortStore = writable([
    { name: "реверс", id: 4, isActive: true },
    { name: "по сумме", id: 1, isActive: false },
    { name: "по дате", id: 2, isActive: true },
]);

export const transferStore = writable([
    {
        id: 0,
        created: "2025-09-26T10:15:00Z",
        status: { name: "Личное", id: 2 },
        sum: 5000,
        mark: { name: "Расход", id: 2 },
        cat: [
            {
                name: "Дом",
                id: 2,
                sub: [
                    { name: "Продукты", id: 7 },
                    { name: "Оплата ЖКХ", id: 8 },
                ],
            },
        ],
        comment: "Еженедельные покупки продуктов",
    },
    {
        id: 1,
        created: "2025-09-25T18:30:00Z",
        status: { name: "Бизнес", id: 1 },
        sum: 150000,
        mark: { name: "Пополнение", id: 1 },
        cat: [
            {
                name: "Маркетинг",
                id: 3,
                sub: [{ name: "Реклама в соцсетях", id: 9 }],
            },
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
            {
                name: "Транспорт",
                id: 4,
                sub: [{ name: "Такси", id: 10 }],
            },
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
            {
                name: "Инфраструктура",
                id: 1,
                sub: [{ name: "VPS", id: 3 }],
            },
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
            {
                name: "Развлечения",
                id: 5,
                sub: [
                    { name: "Кино", id: 11 },
                    { name: "Рестораны", id: 12 },
                ],
            },
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
            {
                name: "Продажи",
                id: 6,
                sub: [{ name: "Онлайн-продажа", id: 13 }],
            },
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
            {
                name: "Одежда",
                id: 7,
                sub: [{ name: "Повседневная", id: 14 }],
            },
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
            {
                name: "Консультации",
                id: 8,
                sub: [{ name: "Личная консультация", id: 15 }],
            },
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
            {
                name: "Кофе",
                id: 9,
                sub: [{ name: "Утренний кофе", id: 16 }],
            },
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
            {
                name: "Инфраструктура",
                id: 1,
                sub: [{ name: "Proxy", id: 5 }],
            },
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
            {
                name: "Спорт",
                id: 10,
                sub: [{ name: "Абонемент", id: 17 }],
            },
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
            {
                name: "Разработка",
                id: 11,
                sub: [{ name: "Создание сайта", id: 18 }],
            },
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
            {
                name: "Здоровье",
                id: 12,
                sub: [
                    { name: "Витамины", id: 1229 },
                    { name: "Витамины", id: 139 },
                    { name: "Витамины", id: 10009 },
                ],
            },
            {
                name: "Здоровье",
                id: 199,
                sub: [{ name: "Витамины", id: 19 }],
            },
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
            {
                name: "Офис",
                id: 13,
                sub: [{ name: "Канцтовары", id: 20 }],
            },
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
            {
                name: "Транспорт",
                id: 4,
                sub: [{ name: "Проездной", id: 21 }],
            },
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
            {
                name: "Фриланс",
                id: 14,
                sub: [{ name: "Копирайтинг", id: 22 }],
            },
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
            {
                name: "Книги",
                id: 15,
                sub: [{ name: "Художественная литература", id: 23 }],
            },
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
            {
                name: "Консультации",
                id: 8,
                sub: [{ name: "Групповая консультация", id: 24 }],
            },
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
            {
                name: "Продукты",
                id: 7,
                sub: [{ name: "Сладости", id: 25 }],
            },
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
            {
                name: "Маркетинг",
                id: 3,
                sub: [{ name: "Услуги SMM-специалиста", id: 26 }],
            },
        ],
        comment: "Ежемесячная оплата услуг SMM-менеджера",
    },
]);
