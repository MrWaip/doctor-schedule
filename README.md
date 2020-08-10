# Инструкция по запуску

1. Первое, что нужо сделать поднять контейнеры

```
# в корне проекта вызываем

docker-compose up -d
```

2. Нужно выполнить миграции БД и вызвать сиды

```
# Исполняем миграции
docker-compose exec backend npm run migration:run

# Исполняем сиды
docker-compose exec backend npm run seed:run


```

3. Проверять рузультат **http://localhost:3000**
