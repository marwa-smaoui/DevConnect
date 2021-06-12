import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import {addLike,removeLike,deletePost} from '../../js/actions/postAction'
import { Fragment } from "react";
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, contact, likes, comments, date },
  showActions,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${contact}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (<Fragment>
          <button type="button"  onClick={(e)=>addLike(_id)} className="btn btn-light">
          <i class="fa fa-thumbs-up"></i>{" "}
          {likes.length>0 && (
            <span>{likes.length}</span>
          )}
        </button>
        <button type="button" onClick={(e)=>removeLike(_id)} className="btn btn-light">
          <i class="fa fa-thumbs-down"></i>{" "}
        </button>
          
        <Link to={`/posts/${_id}`} className="btn btn-primary"> 
          Discussion {' '}
          {comments.length>0 && (
            <span class="comment-count">{comments.length}</span>
          )}
         
         
        </Link>
        {!auth.loading && contact === auth.contact._id && (
            <button type="button" onClick={(e)=>deletePost(_id)} className="btn btn-danger">
              <i class="fa fa-times" />
            </button>
          )}
        </Fragment>)}
        
      </div>
    </div>
  );
};

PostItem.defaultProps={
  showActions:true

}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike:PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired,
  

};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addLike,removeLike,deletePost})(PostItem);
