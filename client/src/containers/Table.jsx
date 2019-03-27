import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchArticle } from '../store/actions/article';

const mapDispatchToProps = dispatch => ({
  onFetchArticle: id => dispatch(fetchArticle(id)),
});

@connect(null, mapDispatchToProps)

class Table extends Component {
  static defaultProps = {
    onFetchArticle: null,
  };

  onModalOpen = (id) => {
    const { onFetchArticle } = this.props;
    onFetchArticle(id);
  };

  onEditArticle = (id, title, body) => {
    const { history } = this.props;
    history.push({
      pathname: `/articles/${id}/edit/`,
      state: { title, body },
    });
  };

  render() {
    const { articles } = this.props;
    const MAX_ARTICLE_LENGTH = 10;

    const rows = articles.map((article) => {
      const clippedArticle = article.body.length > MAX_ARTICLE_LENGTH
        ? `${article.body.slice(0, MAX_ARTICLE_LENGTH)}...`
        : article.body;
      return (
        <tr key={article._id}>
          <th scope="row">{ article._id }</th>
          <td>{ article.title }</td>
          <td>{ clippedArticle }</td>
          <td>
            <button
              type="button"
              className="btn btn-success mr-3"
              onClick={() => this.onEditArticle(article._id, article.title, article.body)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => this.onModalOpen(article._id)}
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              View
            </button>
          </td>
        </tr>
      );
    });

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  onFetchArticle: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(Table);
