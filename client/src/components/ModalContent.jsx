import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  article: state.article.article,
});

@connect(mapStateToProps)

class ModalContent extends Component {
  static defaultProps = {
    article: null,
  };

  render() {
    const { article } = this.props;

    return (
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{ article ? article.title : null }</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { article ? article.body : null }
          </div>
          <div className="modal-footer d-flex mr-auto">
            <small className="">
              Created: <span className="text-primary font-italic">{ article ? article.createdAt : null }</span>
            </small>
            <small>
              Updated: <span className="text-primary font-italic">{ article ? article.updatedAt : null }</span>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default ModalContent;
