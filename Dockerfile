FROM mcr.microsoft.com/playwright:v1.53.2-jammy

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

CMD ["npx", "tsx", "src/linkedin-connector.ts"]
