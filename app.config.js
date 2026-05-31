const appJson = require('./app.json')

export default {
  ...appJson.expo,
  extra: {
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
    eas: {
      projectId: "182181aa-c224-4323-98b2-e3b836d56c28",
    },
  },
}
