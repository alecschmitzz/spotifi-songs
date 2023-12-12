# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app



# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install

# install node ONLY on install stage because Prisma generate cmd seems to need it
ARG NODE_VERSION=20
RUN apt update \
    && apt install -y curl
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n


# install without --production (include devDependencies)
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production






# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bunx prisma generate



# [optional] tests & build
ENV NODE_ENV=development
COPY .env.${NODE_ENV} .env
# first fix prisma in external library to fix this:
# RUN bun run build







# copy production dependencies and source code into the final image
FROM base AS release
ENV NODE_ENV=production
COPY .env.${NODE_ENV} .env
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/prisma /usr/src/app/prisma
COPY --from=prerelease /usr/src/app/src /usr/src/app/src
COPY --from=prerelease /usr/src/app/package.json /usr/src/app




# run the app
USER bun
EXPOSE 3000
CMD [ "bun", "run", "./src/index.ts" ]