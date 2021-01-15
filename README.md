# praktikum-project14.github.io

### 14я проектная работа на курсе
В данном проекте реализована на схема авторизации пользователей через сервер на express.js. Приложение подключается к серверу Mongo по адресу mongodb://localhost:27017/mestodb

Запросы, которые обрабатывает сервер:

- запрос GET /signup создает пользователя в БД, при регистрации необходимо заполнить поля name, about, avatar, email, password;
- запрос GET /signin позволяет авторизоваться уже созданному пользователю по емейлу и паролю;
- запрос GET /users возвращает всех пользователей из базы для авторизованного пользователя;
- запрос GET /users/:userId возвращает конкретного пользователя для авторизованного пользователя;
- запрос GET /cards возвращает все карточки всех пользователей для авторизованного пользователя;
- запрос POST /cards создаёт карточку конкретного пользователя;
- запрос DELETE /cards/:cardId удаляет карточку конкретного пользователя, другой пользователь не может удалить чужую карточку

### Версия проекта:
v1.0.0

### Автор:
Татьяна Лунькова

### npm-пакеты:
- bcryptjs: 2.4.3,
- body-parser: 1.19.0,
- express: 4.17.1,
- jsonwebtoken: 8.5.1,
- mongoose: 5.11.10,
- validator: 13.5.2

### Запуск сервера:
`npm run start` - production
`npm run dev` - development
