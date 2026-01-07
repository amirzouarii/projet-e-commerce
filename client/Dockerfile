# Frontend multistage build (React) + nginx
# 1) Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# Optional: copy custom nginx config if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
