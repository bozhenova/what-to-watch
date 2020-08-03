import { combineReducers } from 'redux';

import { reducer as data } from './data/data';
import { reducer as user } from './user/user';
import { reducer as reviews } from './reviews/reviews';
import { reducer as favorites } from './favorites/favorites';

const rootReducer = combineReducers({
  data,
  user,
  reviews,
  favorites
});

export default rootReducer;
