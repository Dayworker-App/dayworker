// import { useCallback, useMemo } from 'react';
import FirebaseEvents from './events';

// type EventNameType = keyof FirebaseEvents;

class FirebaseAnalyticsService {
  constructor(firebaseAnalytics) {
    this.firebaseAnalytics = firebaseAnalytics;
    this.analytics = this.firebaseAnalytics.getAnalytics();
  }

  /**
   * @method trackScreenView
   * @description This method logs a screen view event with the specified screen name.
   * @param screenName - The name of the screen.
   * @returns  Promise<void>
   */
  async trackScreenView(screenName) {
    await this.firebaseAnalytics.logEvent(this.analytics, 'screen_view', {
      screen_name: screenName,
    });
  }

  /**
   * @method trackSignUpSubmitted
   * @description This method logs a click or press to the sign up button.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSignUpSubmitted(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SIGN_UP_SUBMITTED,
      eventParams,
    );
  }

  /**
   * @method trackSignUpSuccess
   * @description This method logs a successful sign up event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSignUpSuccess(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SIGN_UP_SUCCESS,
      eventParams,
    );
  }

  /**
   * @method trackSignUpFailed
   * @description This method logs a failed sign up event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSignUpFailed(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SIGN_UP_FAILED,
      eventParams,
    );
  }

  /**
   * @method trackLoginSuccess
   * @description This method logs a successful login event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackLoginSuccess(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.LOG_IN_SUCCESS,
      eventParams,
    );
  }

  /**
   * @method trackLogoutSuccess
   * @description This method logs a successful logout event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackLogoutSuccess(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.LOG_OUT_SUCCESS,
      eventParams,
    );
  }

  /**
   * @method trackAppLaunched
   * @description This method logs an app launched event (cold start).
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackAppLaunched(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.APP_LAUNCHED,
      eventParams,
    );
  }

  /**
   * @method trackAppForegrounded
   * @description This method logs an app foregrounded event (warm start).
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackAppForegrounded(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.APP_FOREGROUNDED,
      eventParams,
    );
  }

  /**
   * @method trackAppBackgrounded
   * @description This method logs an app backgrounded event (when the app goes to the background).
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackAppBackgrounded(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.APP_BACKGROUNDED,
      eventParams,
    );
  }

  /**
   * @method trackChatMessageCreated
   * @description This method logs a chat message created event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackChatMessageCreated(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.CHAT_MESSAGE_CREATED,
      eventParams,
    );
  }

  /**
   * @method trackChatMessageSent
   * @description This method logs a chat message sent event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackChatMessageSent(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.CHAT_MESSAGE_SENT,
      eventParams,
    );
  }

  /**
   * @method trackSubscribeClicked
   * @description This method logs a click or press to the subscribe button.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSubscribeClicked(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SUBSCRIBE_CLICKED,
      eventParams,
    );
  }

  /**
   * @method trackSubscribeSuccess
   * @description This method logs a successful subscription event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSubscribeSuccess(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SUBSCRIBE_SUCCESS,
      eventParams,
    );
  }

  /**
   * @method trackSubscribeFailed
   * @description This method logs a failed subscription event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSubscribeFailed(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SUBSCRIBE_FAILED,
      eventParams,
    );
  }

  /**
   * @method trackSubscriptionExpired
   * @description This method logs a subscription expired event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSubscriptionExpired(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SUBSCRIPTION_EXPIRED,
      eventParams,
    );
  }

  /**
   * @method trackSearchExpanded
   * @description This method logs a search filter list is expanded/opened.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSearchExpanded(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SEARCH_EXPANDED,
      eventParams,
    );
  }

  /**
   * @method trackSearchCollapsed
   * @description This method logs a search filter list is collapsed/closed.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSearchCollapsed(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SEARCH_COLLAPSED,
      eventParams,
    );
  }

  /**
   * @method trackSearchSubmitted
   * @description This method logs a search submitted event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSearchSubmitted(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SEARCH_SUBMITTED,
      eventParams,
    );
  }

  /**
   * @method trackSearchResultClicked
   * @description This method logs a click or press to a search result.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSearchResultClicked(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SEARCH_RESULT_CLICKED,
      eventParams,
    );
  }

  /**
   * @method trackSearchResultViewed
   * @description This method logs a search result viewed event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackSearchResultViewed(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.SEARCH_RESULT_VIEWED,
      eventParams,
    );
  }

  /**
   * @method trackProfileViewed
   * @description This method logs a profile viewed event.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async trackProfileViewed(eventParams) {
    await this.firebaseAnalytics.logEvent(
      analytics,
      FirebaseEvents.PROFILE_VIEWED,
      eventParams,
    );
  }

  /**
   * @method setAnalyticsUserId
   * @description This method sets the user ID for analytics tracking.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async setAnalyticsUserId(userId) {
    console.log('setAnalyticsUserId: ', userId);
    await setUserId(analytics, userId);
  }

  /**
   * @method setAnalyticsUserProperties
   * @description This method sets user properties for analytics tracking.
   * @param eventParams - attributes to send to firebase analytics.
   * @returns  Promise<void>
   */
  async setAnalyticsUserProperties(userProperties) {
    console.log(
      'setAnalyticsUserProperties: ',
      JSON.stringify(userProperties || {}, null, 2),
    );
    await setUserProperties(analytics, userProperties);
  }
}

export default FirebaseAnalyticsService;
