# Образ node.js
FROM node:20

# Установка рабочей директории
WORKDIR /app

# Копирование package.json файлов
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование остальных файлов проекта
COPY . .

# Сборка TypeScript проекта
RUN npm run build

# Запуск бота
CMD ["npm", "start"]