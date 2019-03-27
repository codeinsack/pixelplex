import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactQueryParams from 'react-query-params';
import { connect } from 'react-redux';
import { fetchArticles } from '../store/actions/article';

const mapDispatchToProps = dispatch => ({
  onFetchArticles: (page, limit) => dispatch(fetchArticles(page, limit)),
});

@connect(null, mapDispatchToProps)

class Pagination extends ReactQueryParams {
  onChangePage = (page) => {
    const { onFetchArticles } = this.props;
    const limit = this.queryParams.limit || 10;
    this.setQueryParams({
      page,
      limit,
    });
    onFetchArticles(page, limit);
  };

  render() {
    const { totalRecords, pageLimit = 10, currentPage } = this.props;
    const totalPages = Math.ceil(totalRecords / pageLimit);

    const numbers = Array.from(Array(totalPages).keys());
    const pages = numbers.map(number => (
      <li className={`page-item ${+currentPage === number + 1 ? 'active' : ''}`} key={number}>
        <button
          type="button"
          className="page-link"
          onClick={() => this.onChangePage(number + 1)}
        >
          { number + 1 }
        </button>
      </li>
    ));

    return (
      <nav aria-label="...">
        <ul className="pagination pagination-lg">
          { pages }
        </ul>
      </nav>
    );
  }
}

export default withRouter(Pagination);
