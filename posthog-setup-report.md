<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Recurrly, a React Native (Expo) subscription management app using Clerk for authentication. The integration includes: a PostHog client config file using `expo-constants` extras, a `PostHogProvider` wrapping the app in `_layout.tsx`, automatic screen tracking via Expo Router's `usePathname`, user identification tied to the Clerk auth state, autocapture of touch events, and manual event captures across 5 key files. `posthog-react-native` and `react-native-svg` were installed, and environment variables are loaded from `.env` via `app.config.js` extras — nothing is hardcoded.

| Event | Description | File |
|---|---|---|
| `user_signed_up` | Fired when a new user successfully completes account creation. Top of the conversion funnel. | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | Fired when a returning user signs in successfully. Tracks engagement and session starts. | `app/(auth)/sign-in.tsx` |
| `subscription_created` | Fired when a user adds a new subscription. Captures name, price, billing cycle, and category. | `components/CreateSubscriptionModal.tsx` |
| `subscription_expanded` | Fired when a user expands a subscription card on the home screen to reveal its details. | `app/(tabs)/index.tsx` |
| `subscription_viewed` | Fired when a subscription detail screen is opened, capturing the subscription ID. | `app/subscriptions/[id].tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics — Dashboard](/dashboard/1650968)
- [New sign-ups over time](/insights/0i4dKiQE) — Daily total of `user_signed_up` events
- [Sign-in vs Sign-up activity](/insights/6Ui2AKNT) — DAU comparison of sign-ins vs sign-ups
- [Subscription creation funnel](/insights/GsoVzSGG) — Conversion funnel: Sign up → Sign in → Create subscription
- [Subscriptions created over time](/insights/DPrJThSh) — Daily bar chart of `subscription_created` events
- [Subscription engagement](/insights/ItVgQftS) — DAU of subscription card expansions and detail views

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
