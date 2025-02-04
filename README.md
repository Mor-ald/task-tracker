# Трекер задач

Трекер задач, созданный на React с использованием стейт-менеджера Redux (redux toolkit, rtk query) с фичей Drag and Drop (библиотека pragmatic-drag-and-drop) и синхронизацией с локальным сервером через json-server (db.json файл).

## Используемые технологии и библиотеки

- Создание пользовательского интерфейса: `React`
- Состояние: Redux, `Redux Toolkit`
- Работа с API: `RTK Query`
- Типизация: `TypeScript`
- Стилизация: `SCSS`
- Тестирование: `Jest`, `React testing library`
- Линтинг и форматирование: `Eslint`, `Stylelint`, `Prettier`
- Сборка: `Vite`
- Стандартизация коммитов: `Commitlint`, `Commitizen`
- Локальный сервер: `json-server`
- Drag and drop: `pragmatic-drag-and-drop`

## Структура проекта

```
.
└── /src
    ├── /assets
    |    ├──/images (используемые изображения внутри проекта)
    |    └──/styles (глобальные стили)
    ├── /components (компоненты)
    |    ├── /layout
    |    └── /ui (элементы пользовательского интерфейса)
    ├── /hooks (хуки)
    ├── /services (логика для работы с api / localstorage и.т.п)
    ├── /store (логика хранения)
    ├── /types (глобальные типы)
    ├── /utils (дополнительные функции)
    ├── App.tsx
    ├── index.scss
    ├── main.tsx
    └── vite-end.d.ts
```

#
