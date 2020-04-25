#==============================================================================
# Source
#==============================================================================
FROM node:lts-alpine AS source
COPY package.json package-lock.json /build/
COPY package.json package-lock.json /build/.target/
WORKDIR /build
RUN npm install
COPY . /build
RUN ./node_modules/typescript/bin/tsc
RUN cd .target && npm install --production
RUN cp rules.txt /build/.target


#==============================================================================
# Runtime
#==============================================================================
FROM node:lts-alpine
COPY --from=source /build/.target /app
WORKDIR /app
ENTRYPOINT ["node", "vanitygen-hd.js"]
CMD ["generate"]
