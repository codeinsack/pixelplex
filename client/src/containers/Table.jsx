import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchArticle } from '../store/actions/article';

const mapDispatchToProps = dispatch => ({
  onFetchArticle: id => dispatch(fetchArticle(id)),
});

@connect(null, mapDispatchToProps)

class Table extends Component {
  onModalOpen = (id) => {
    const { onFetchArticle } = this.props;
    onFetchArticle(id);
  };

  onEditArticle = (id) => {
    const { history } = this.props;
    history.push(`/articles/${id}/edit`);
  };

  render() {
    const { articles } = this.props;

    const rows = articles.map(article => (
      <tr key={article._id}>
        <th scope="row">{ article._id }</th>
        <td>{ article.title }</td>
        <td>{ article.body }</td>
        <td>
          <button
            type="button"
            className="btn btn-success mr-3"
            onClick={() => this.onEditArticle(article._id)}
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
    ));

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

export default withRouter(Table);
