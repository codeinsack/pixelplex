import * as actionTypes from './actionTypes';
import axios from '../../../axios-articles';

export const fetchArticlesSuccess = (articles, count) => ({
  type: actionTypes.FETCH_ARTICLES_SUCCESS,
  articles,
  count,
});

export const fetchArticlesFail = error => ({
  type: actionTypes.FETCH_ARTICLES_FAIL,
  error,
});

export const fetchArticlesStart = () => ({
  type: actionTypes.FETCH_ARTICLES_START,
});

export const fetchArticles = page => (dispatch) => {
  dispatch(fetchArticlesStart());
  axios.get(`api/articles?page=${page}&limit=10`)
    .then((response) => {
      const { articles, count } = response.data;
      dispatch(fetchArticlesSuccess(articles, count));
    })
    .catch((err) => {
      dispatch(fetchArticlesFail(err));
    });
};

export const addArticleSuccess = article => ({
  type: actionTypes.ADD_ARTICLE_SUCCESS,
  article,
});

export const addArticle = article => (dispatch) => {
  axios.post('api/articles', article)
    .then((response) => {
      dispatch(addArticleSuccess(response.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const redirectAfterDataSent = () => ({
  type: actionTypes.REDIRECT_AFTER_DATA_SENT,
});

export const fetchArticleSuccess = article => ({
  type: actionTypes.FETCH_ARTICLE_SUCCESS,
  article,
});

export const fetchArticleFail = error => ({
  type: actionTypes.FETCH_ARTICLE_FAIL,
  error,
});

export const fetchArticle = id => (dispatch) => {
  axios.get(`api/articles/${id}`)
    .then((response) => {
      dispatch(fetchArticleSuccess(response.data));
    })
    .catch((err) => {
      dispatch(fetchArticleFail(err));
    });
};

export const updateArticleSuccess = () => ({
  type: actionTypes.UPDATE_ARTICLE_SUCCESS,
});


export const updateArticle = (articleId, article) => (dispatch) => {
  console.log(article);
  axios.put(`api/articles/${articleId}`, article)
    .then(() => {
      dispatch(updateArticleSuccess());
    })
    .catch((err) => {
      console.log(err);
    });
};
