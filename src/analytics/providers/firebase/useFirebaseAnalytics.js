import { useCallback, useMemo } from 'react';
import FirebaseEvents from './events';

// type EventNameType = keyof FirebaseEvents;

const useFirebaseAnalytics = firebaseAnalytics => {
  const { getAnalytics, logEvent, setUserId, setUserProperties } =
    firebaseAnalytics;
  const analytics = useMemo(() => getAnalytics(), [getAnalytics]);

  const trackScreenView = useCallback(
    async screenName => {
      await logEvent(analytics, 'screen_view', { screen_name: screenName });
    },
    [analytics, logEvent],
  );

  // DEPRECATED: Use track<EventName> instead
  // const trackEvent = useCallback(
  //   async (eventName /*: EventNameType*/, eventParams /*: any*/) => {
  //     await logEvent(analytics, eventName, eventParams);
  //   },
  //   [analytics, logEvent],
  // );

  const trackSignUpSubmitted = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SIGN_UP_SUBMITTED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSignUpSuccess = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SIGN_UP_SUCCESS, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSignUpFailed = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SIGN_UP_FAILED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackLoginSuccess = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.LOG_IN_SUCCESS, eventParams);
    },
    [analytics, logEvent],
  );

  const trackLogoutSuccess = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.LOG_OUT_SUCCESS, eventParams);
    },
    [analytics, logEvent],
  );

  const trackAppLaunched = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.APP_LAUNCHED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackAppForegrounded = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.APP_FOREGROUNDED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackAppBackgrounded = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.APP_BACKGROUNDED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackChatMessageCreated = useCallback(
    async eventParams => {
      await logEvent(
        analytics,
        FirebaseEvents.CHAT_MESSAGE_CREATED,
        eventParams,
      );
    },
    [analytics, logEvent],
  );

  const trackChatMessageSent = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.CHAT_MESSAGE_SENT, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSubscribeClicked = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SUBSCRIBE_CLICKED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSubscribeSuccess = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SUBSCRIBE_SUCCESS, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSubscribeFailed = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SUBSCRIBE_FAILED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSubscriptionExpired = useCallback(
    async eventParams => {
      await logEvent(
        analytics,
        FirebaseEvents.SUBSCRIPTION_EXPIRED,
        eventParams,
      );
    },
    [analytics, logEvent],
  );
  const trackSearchExpanded = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SEARCH_EXPANDED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSearchCollapsed = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SEARCH_COLLAPSED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSearchSubmitted = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.SEARCH_SUBMITTED, eventParams);
    },
    [analytics, logEvent],
  );

  const trackSearchResultClicked = useCallback(
    async eventParams => {
      await logEvent(
        analytics,
        FirebaseEvents.SEARCH_RESULT_CLICKED,
        eventParams,
      );
    },
    [analytics, logEvent],
  );

  const trackSearchResultViewed = useCallback(
    async eventParams => {
      await logEvent(
        analytics,
        FirebaseEvents.SEARCH_RESULT_VIEWED,
        eventParams,
      );
    },
    [analytics, logEvent],
  );

  const trackProfileViewed = useCallback(
    async eventParams => {
      await logEvent(analytics, FirebaseEvents.PROFILE_VIEWED, eventParams);
    },
    [analytics, logEvent],
  );

  const setAnalyticsUserId = useCallback(
    async (userId /*: string*/) => {
      console.log('setAnalyticsUserId: ', userId);
      await setUserId(analytics, userId);
    },
    [analytics, setUserId],
  );

  const setAnalyticsUserProperties = useCallback(
    async (userProperties /*: any*/) => {
      console.log(
        'setAnalyticsUserProperties: ',
        JSON.stringify(userProperties || {}, null, 2),
      );
      await setUserProperties(analytics, userProperties);
    },
    [analytics, setUserProperties],
  );

  return {
    trackScreenView,
    // trackEvent,
    trackSignUpSubmitted,
    trackSignUpSuccess,
    trackSignUpFailed,
    trackLoginSuccess,
    trackLogoutSuccess,
    trackAppLaunched,
    trackAppForegrounded,
    trackAppBackgrounded,
    trackChatMessageCreated,
    trackChatMessageSent,
    trackSubscribeClicked,
    trackSubscribeSuccess,
    trackSubscribeFailed,
    trackSubscriptionExpired,
    trackSearchExpanded,
    trackSearchCollapsed,
    trackSearchSubmitted,
    trackSearchResultClicked,
    trackSearchResultViewed,
    trackProfileViewed,
    setAnalyticsUserId,
    setAnalyticsUserProperties,
  };
};

export default useFirebaseAnalytics;
