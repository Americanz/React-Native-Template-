#!/bin/sh

# Перевіряємо, чи є зміни, що потребують нових міграцій
if npx drizzle-kit diff | grep -q "No changes detected"; then
  echo "No new migrations needed."
else
  echo "New migrations detected. Generating..."
  npx drizzle-kit generate
fi
