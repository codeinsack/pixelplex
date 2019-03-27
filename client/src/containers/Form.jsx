import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  static defaultProps = {
    location: null,
    redirect: false,
    onAddArticle: null,
    onUpdateArticle: null,
  };

  state = {
    title: '',
    body: '',
    fieldErrors: {},
  };

  componentDidMount() {
    const { location } = this.props;
    if (!location.state) return;
    const oldTitle = location.state.title;
    const oldBody = location.state.body;

    this.refs.title.value = oldTitle;
    this.refs.body.value = oldBody;

    this.setState({
      title: oldTitle,
      body: oldBody,
    });
  }

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

    let alertTitle = null;
    let alertBody = null;

    if (title) {
      alertTitle = (
        <div className="alert alert-danger mt-2" role="alert">
          {title}
        </div>
      );
    }
    if (body) {
      alertBody = (
        <div className="alert alert-danger mt-2" role="alert">
          {body}
        </div>
      );
    }

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
              ref="title"
            />
            { alertTitle }
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              className="form-control"
              id="body"
              rows="10"
              onChange={this.onChangeHandler}
              ref="body"
            />
            { alertBody }
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

Form.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  redirect: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onAddArticle: PropTypes.func,
  onUpdateArticle: PropTypes.func,
};

export default withRouter(Form);
