import { ActionTypes as types } from '../../ActionTypes';
import { updateItemsList } from '../../../utils';

const initialState = {
  favorites: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_FAVORITES:
      return { ...state, favorites: action.payload };
    case types.UPDATE_FAVORITES:
      return {
        ...state,
        favorites: updateItemsList(state.favorites, action.payload)
      };
  }
  return state;
};
