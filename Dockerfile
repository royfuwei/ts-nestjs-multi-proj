#
## Base Stage 
FROM node:16.13.1-alpine3.14 AS base-stage
WORKDIR /ts-clean-arch
RUN apk update && apk --no-cache upgrade musl && apk add --no-cache tzdata curl bash openssh git 


# 
## Dependencies Stage
FROM base-stage AS dependencies-stage
# COPY prepare.js .
COPY package.json .
COPY package-lock.json .
# 只安裝 production 相關模組，並複製出來，準備給 Release Stage 使用
RUN npm ci --only=production --unsafe-perm=true --allow-root
RUN cp -R node_modules /production_node_modules
# prod & dev 模組全部安裝
RUN npm ci --include=dev --unsafe-perm=true --allow-root


# 
## Build Stage
FROM dependencies-stage AS build-stage
ENV NODE_ENV=production
COPY tsconfig.json .
COPY tsconfig.build.json .
# COPY webpack.config.js .
# COPY webpack.config.build.js .
COPY nest-cli.json .
# COPY .eslintrc.js .
COPY src src
RUN npm run build


# 
## Release Stage
FROM base-stage AS release-stage
ENV NODE_ENV=production
ENV TZ Asia/Taipei

COPY initial initial

# COPY prepare.js .
COPY package.json .
COPY package-lock.json .

COPY --from=dependencies-stage /production_node_modules node_modules
COPY --from=build-stage /ts-clean-arch/dist dist

COPY .env .

EXPOSE 5007

ENTRYPOINT ["npm", "start"]
