import React from 'react';
import ReactQueryParams from 'react-query-params';
import { connect } from 'react-redux';

import { fetchArticles } from '../store/actions/article';

const mapDispatchToProps = dispatch => ({
  onFetchArticles: (page, limit) => dispatch(fetchArticles(page, limit)),
});

@connect(null, mapDispatchToProps)

class Limit extends ReactQueryParams {
  onChangeLimit = (event) => {
    const { onFetchArticles } = this.props;
    const limit = +event.target.innerHTML;
    const page = this.queryParams.page || 1;
    this.setQueryParams({
      limit,
    });
    onFetchArticles(page, limit);
  };

  render() {
    return (
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button onClick={this.onChangeLimit} type="button" className="btn btn-secondary">3</button>
          <button onClick={this.onChangeLimit} type="button" className="btn btn-secondary">5</button>
          <button onClick={this.onChangeLimit} type="button" className="btn btn-secondary">7</button>
          <button onClick={this.onChangeLimit} type="button" className="btn btn-secondary">10</button>
        </div>
      </div>
    );
  }
}

export default Limit;
