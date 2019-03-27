import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: [],
  article: null,
  count: null,
  loading: false,
  redirect: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        count: action.count,
        loading: false,
      };
    case actionTypes.FETCH_ARTICLES_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        redirect: true,
      };
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.article,
      };
    case actionTypes.REDIRECT_AFTER_DATA_SENT:
      return {
        ...state,
        redirect: false,
      };
    case actionTypes.UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        redirect: true,
      };
    default:
      return state;
  }
};

export default orderReducer;
