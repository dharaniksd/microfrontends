# syntax=docker/dockerfile:1

# Build every independently deployable Angular application with a supported LTS Node runtime.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
RUN npm ci

COPY angular.json ./
COPY shell ./shell
COPY accounts ./accounts
COPY trading ./trading
COPY profile ./profile
COPY notifications ./notifications
COPY contracts ./contracts

RUN npm run build

# One small static image per application. Docker Compose selects the required target.
FROM nginx:1.27-alpine AS base
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM base AS shell
COPY --from=build /app/dist/shell/browser /usr/share/nginx/html

FROM base AS accounts
COPY --from=build /app/dist/accounts/browser /usr/share/nginx/html

FROM base AS trading
COPY --from=build /app/dist/trading/browser /usr/share/nginx/html

FROM base AS profile
COPY --from=build /app/dist/profile/browser /usr/share/nginx/html

FROM base AS notifications
COPY --from=build /app/dist/notifications/browser /usr/share/nginx/html
