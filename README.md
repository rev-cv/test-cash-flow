## Launch

1. собрать фронт (разработка на node/24.7.0)

```sh
cd frontend
npm install
npm run build
```

Фронт можно запускать на dev через проксирование → закоментировать в `vite.config.js` строчку `base: "/static/",`.

2. заполнить базу мок-данными

```sh
cd ../backend
```

```sh
uv run manage.py migrate
```

```sh
uv run manage.py seed_db
```

3. запуск сервера

```sh
uv run manage.py runserver
```
