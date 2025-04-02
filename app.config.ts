export default defineAppConfig({

    umami: {
        host: process.env.UMAMI_HOST,
        id: process.env.UMAMI_ID,
        version: 2,
        ignoreLocalhost: true
    },
})
