import * as moment from 'moment';

export const getReviews = state =>
  state.reviews.reviews.sort(
    (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
  );

export const getReviewSendingStatus = state => state.reviews.isSent;
export const getReviewSendingProcessStatus = state => state.reviews.isSending;
