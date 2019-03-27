import React from 'react';
import { connect } from 'react-redux';
import ReactQueryParams from 'react-query-params';

import { fetchArticles, redirectAfterDataSent } from '../store/actions/article';
import Spinner from '../components/Spinner';
import Table from './Table';
import Pagination from '../components/Pagination';

const mapStateToProps = state => ({
  articles: state.article.articles,
  count: state.article.count,
  loading: state.article.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchArticles: page => dispatch(fetchArticles(page)),
  onRedirectCancel: page => dispatch(redirectAfterDataSent(page)),
});

@connect(mapStateToProps, mapDispatchToProps)

class Articles extends ReactQueryParams {
  componentDidMount() {
    const { onFetchArticles, onRedirectCancel } = this.props;
    const page = this.queryParams.page || 1;

    onFetchArticles(page);
    onRedirectCancel();
  }

  onRedirectToForm = () => {
    this.props.history.push('/articles/create');
  };

  render() {
    const { articles, loading, count } = this.props;
    const currentPage = this.queryParams.page || 1;

    let outputArticles = (
      <>
        <Table articles={articles} />
        <Pagination totalRecords={count} currentPage={currentPage} />
      </>
    );
    if (loading) {
      outputArticles = (
        <div className="m-5">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
          <h2>Articles</h2>
          <button type="button" className="btn btn-primary" onClick={this.onRedirectToForm}>Create</button>
        </div>
        <div className="d-flex flex-column align-items-center">
          {outputArticles}
        </div>
      </div>
    );
  }
}

export default Articles;
