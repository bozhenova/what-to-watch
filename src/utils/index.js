import { RatingLevels, Ratings } from '../constants';

export const parseDate = date => {
  const options = { month: 'long', year: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const parseRuntime = time => {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time % 60);
  return `${hours >= 1 ? hours + `h` : ``} ${minutes}m`;
};

export const getRatingLevel = ratingScore => {
  if (ratingScore >= RatingLevels.BAD && ratingScore < RatingLevels.NORMAL) {
    return Ratings.BAD;
  } else if (
    ratingScore >= RatingLevels.NORMAL &&
    ratingScore < RatingLevels.GOOD
  ) {
    return Ratings.NORMAL;
  } else if (
    ratingScore >= RatingLevels.GOOD &&
    ratingScore < RatingLevels.VERY_GOOD
  ) {
    return Ratings.GOOD;
  } else if (
    ratingScore >= RatingLevels.VERY_GOOD &&
    ratingScore < RatingLevels.AWESOME
  ) {
    return Ratings.VERY_GOOD;
  } else {
    return Ratings.AWESOME;
  }
};
