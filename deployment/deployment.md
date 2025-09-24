# Развертывание RekrutAI Frontend на Ubuntu Server

Данная документация описывает процесс развертывания Next.js приложения RekrutAI на Ubuntu сервере с использованием Docker.

## Предварительные требования

- Ubuntu Server 20.04 или выше
- Docker и Docker Compose
- Минимум 2GB RAM
- Минимум 10GB свободного места на диске

## Установка Docker и Docker Compose

### 1. Обновление системы

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Установка Docker

```bash
# Удаление старых версий Docker (если есть)
sudo apt remove docker docker-engine docker.io containerd runc

# Установка необходимых пакетов
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Добавление GPG ключа Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавление репозитория Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Автозапуск Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### 3. Установка Docker Compose Plugin

Docker Compose v2 устанавливается как плагин для Docker CLI и обычно идет в комплекте с современными версиями Docker:

```bash
# Установка Docker Compose plugin (если не установлен автоматически)
sudo apt install docker-compose-plugin

# Альтернативно, установка вручную:
# DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
# mkdir -p $DOCKER_CONFIG/cli-plugins
# curl -SL https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
# chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

### 4. Проверка установки

```bash
docker --version
docker compose version  # Обратите внимание: без дефиса!
```

## Подготовка проекта

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd rekrutai-fe
```

### 2. Настройка переменных окружения

Создайте файл `.env.local`:

```bash
cp .env.local.sample .env.local
```

Отредактируйте `.env.local` и установите необходимые переменные:

```bash
API_URL=http://your-api-server:port
NEXT_PUBLIC_API_URL=http://your-api-server:port
# Добавьте другие необходимые переменные
```

### 3. Настройка Nginx (опционально)

Если вы планируете использовать Nginx в качестве reverse proxy, создайте конфигурацию:

```bash
mkdir -p nginx
```

Создайте файл `nginx/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server rekrutai-fe:3000;
    }

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

## Сборка и запуск приложения

### 1. Сборка образа

```bash
docker compose build
```

### 2. Запуск приложения

```bash
# Запуск только frontend приложения
docker compose up -d rekrutai-fe

# Или запуск с Nginx (если настроен)
docker compose up -d
```

### 3. Проверка работы

```bash
# Проверка статуса контейнеров
docker compose ps

# Просмотр логов
docker compose logs -f rekrutai-fe

# Проверка доступности приложения
curl http://localhost:3000
```

## Управление приложением

### Остановка приложения

```bash
docker compose down
```

### Перезапуск приложения

```bash
docker compose restart
```

### Обновление приложения

```bash
# Остановка контейнеров
docker compose down

# Получение последних изменений
git pull

# Пересборка и запуск
docker compose build
docker compose up -d
```

### Просмотр логов

```bash
# Логи всех сервисов
docker compose logs -f

# Логи конкретного сервиса
docker compose logs -f rekrutai-fe
```

## Настройка файрвола (UFW)

```bash
# Включение UFW
sudo ufw enable

# Разрешение SSH
sudo ufw allow ssh

# Разрешение HTTP и HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Проверка статуса
sudo ufw status
```

## Настройка автозапуска

Создайте systemd сервис для автозапуска приложения:

```bash
sudo nano /etc/systemd/system/rekrutai-fe.service
```

Содержимое файла:

```ini
[Unit]
Description=RekrutAI Frontend
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/path/to/rekrutai-fe
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Активация сервиса:

```bash
sudo systemctl enable rekrutai-fe.service
sudo systemctl start rekrutai-fe.service
```

## Мониторинг и диагностика

### Проверка использования ресурсов

```bash
# Использование ресурсов контейнерами
docker stats

# Информация о контейнерах
docker ps -a
```

### Очистка системы

```bash
# Удаление неиспользуемых образов
docker image prune

# Удаление неиспользуемых контейнеров
docker container prune

# Полная очистка (осторожно!)
docker system prune -a
```

## SSL сертификат (Let's Encrypt)

Для настройки HTTPS с Let's Encrypt:

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com

# Автоматическое продление
sudo crontab -e
# Добавьте строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Резервное копирование

Создайте скрипт для резервного копирования:

```bash
#!/bin/bash
BACKUP_DIR="/backup/rekrutai-fe"
PROJECT_DIR="/path/to/rekrutai-fe"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Создание архива проекта
tar -czf $BACKUP_DIR/rekrutai-fe_$DATE.tar.gz -C $PROJECT_DIR .

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "rekrutai-fe_*.tar.gz" -mtime +30 -delete
```

## Устранение проблем

### Проблемы с памятью

Если контейнер завершается из-за нехватки памяти:

```bash
# Увеличьте swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Проблемы с правами доступа

```bash
# Исправление прав доступа к проекту
sudo chown -R $USER:$USER /path/to/rekrutai-fe
```

### Контейнер не запускается

```bash
# Проверка конфигурации
docker compose config

# Принудительная пересборка
docker compose build --no-cache

# Просмотр подробных логов
docker compose logs --no-color rekrutai-fe > debug.log
```

## Полезные команды

```bash
# Вход в контейнер
docker exec -it rekrutai-frontend /bin/sh

# Копирование файлов из контейнера
docker cp rekrutai-frontend:/app/file.txt ./

# Обновление образа без потери данных
docker compose pull
docker compose up -d --no-deps rekrutai-fe
```

## Поддержка и обслуживание

1. Регулярно обновляйте Docker и Docker Compose
2. Мониторьте использование ресурсов
3. Создавайте регулярные резервные копии
4. Следите за логами приложения
5. Обновляйте приложение при выходе новых версий