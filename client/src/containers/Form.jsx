import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addArticle, updateArticle } from '../store/actions/article';

const mapStateToProps = state => ({
  loading: state.article.loading,
  redirect: state.article.redirect,
});

const mapDispatchToProps = dispatch => ({
  onAddArticle: article => dispatch(addArticle(article)),
  onUpdateArticle: (articleId, article) => dispatch(updateArticle(articleId, article)),
});

@connect(mapStateToProps, mapDispatchToProps)

class Form extends Component {
  state = {
    title: '',
    body: '',
    fieldErrors: {},
  };

  componentDidUpdate() {
    const { redirect, history } = this.props;
    if (redirect) {
      history.push('/articles/');
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onSubmitHandler = (event) => {
    const { title, body } = this.state;
    const { onAddArticle, match, onUpdateArticle } = this.props;
    const fieldErrors = this.validate(title, body);
    const articleId = match.params.id;
    this.setState({ fieldErrors });
    event.preventDefault();

    const article = {
      title,
      body,
    };

    if (!Object.keys(fieldErrors).length) {
      if (articleId) {
        onUpdateArticle(articleId, article);
      } else {
        onAddArticle(article);
      }
    }
  };

  validate = (title, body) => {
    const errors = {};
    if (!title) errors.title = 'Title is required!';
    if (!body) errors.body = 'Body is required!';
    return errors;
  };

  onCancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { fieldErrors: { title, body } } = this.state;
    const { match } = this.props;
    const { id } = match.params;

    return (
      <div className="container w-50">
        <h2 className="mt-5 mb-4">Articles / { id ? 'edit' : 'create' }</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={this.onChangeHandler}
            />
            <span style={{ color: 'red' }}>{title}</span>
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              className="form-control"
              id="body"
              rows="10"
              onChange={this.onChangeHandler}
            />
            <span style={{ color: 'red' }}>{body}</span>
          </div>
          <button
            type="submit"
            className="btn btn-success mr-4"
          >
            { id ? 'Update' : 'Create' }
          </button>
          <button
            type="button"
            onClick={this.onCancelHandler}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Form);
