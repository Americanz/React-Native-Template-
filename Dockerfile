FROM node:18-alpine

WORKDIR /app

# Встановлюємо необхідні залежності та pnpm
RUN apk add --no-cache git && \
    npm install -g pnpm

# Копіюємо файли package.json та pnpm-lock.yaml (якщо є)
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Встановлюємо залежності за допомогою pnpm
RUN if [ -f pnpm-lock.yaml ]; then \
    pnpm install --frozen-lockfile; \
    else \
    pnpm install; \
    fi

# Копіюємо решту проекту
COPY . .

# Перевіряємо наявність головного файлу додатку
RUN if [ ! -f App.js ] && [ ! -f App.tsx ]; then \
    echo "Error: App.js or App.tsx not found in the root directory" && exit 1; \
    fi

# Виконуємо збірку TypeScript та генеруємо міграції Drizzle (якщо потрібно)
RUN pnpm run compile || echo "No compile script found, skipping." && \
    pnpm run migration || echo "No migration script found, skipping."

# Відкриваємо порти
EXPOSE 8081 19000 19001 19002

# Команда для запуску
CMD ["pnpm", "start"]
