const FirebaseEvents = {
  SIGN_UP_SUBMITTED: 'sign_up_submitted',
  SIGN_UP_SUCCESS: 'sign_up_success',
  SIGN_UP_FAILED: 'sign_up_failed',
  LOG_IN_SUCCESS: 'log_in_success',
  LOG_OUT_SUCCESS: 'log_out_success',
  ACCOUNT_DELETED: 'account_deleted',
  APP_OPENED: 'app_opened',
  APP_FOREGROUNDED: 'app_foregrounded',
  APP_BACKGROUNDED: 'app_backgrounded',
  CHAT_MESSAGE_CREATED: 'chat_message_created',
  CHAT_MESSAGE_SENT: 'chat_message_sent',
  SEARCH_EXPANDED: 'search_expanded',
  SEARCH_COLLAPSED: 'search_collapsed',
  SEARCH_SUBMITTED: 'search_submitted',
  SEARCH_RESULT_CLICKED: 'search_result_clicked',
  SEARCH_RESULT_VIEWED: 'search_result_viewed',
  PROFILE_VIEWED: 'profile_viewed',
  // TODO: Add when subscription feature is implemented
  SUBSCRIBE_CLICKED: 'subscribe_clicked',
  SUBSCRIBE_SUCCESS: 'subscribe_success',
  SUBSCRIBE_FAILED: 'subscribe_failed',
  SUBSCRIBE_ABANDONED: 'subscribe_abandoned',
  SUBSCRIPTION_EXPIRED: 'subscription_expired',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
};

export default FirebaseEvents;
