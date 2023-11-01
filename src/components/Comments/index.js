import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameContainer: '',
    commentContainer: '',
    commentsListContainer: [],
  }

  deleteComment = commentId => {
    const {commentsListContainer} = this.state

    this.setState({
      commentsListContainer: commentsListContainer.filter(
        comment => comment.id !== commentId,
      ),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsListContainer: prevState.commentsListContainer.map(
        eachComment => {
          if (id === eachComment.id) {
            return {...eachComment, isLiked: !eachComment.isLiked}
          }
          return eachComment
        },
      ),
    }))
  }

  renderCommentsList = () => {
    const {commentsListContainer} = this.state

    return commentsListContainer.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameContainer, commentContainer} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameContainer,
      comment: commentContainer,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsListContainer: [...prevState.commentsListContainer, newComment],
      nameContainer: '',
      commentContainer: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      commentContainer: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameContainer: event.target.value,
    })
  }

  render() {
    const {nameContainer, commentContainer, commentsListContainer} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameContainer}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={commentContainer}
                onChange={this.onChangeCommentInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="total-comments-count">
              {commentsListContainer.length}
            </span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
//
