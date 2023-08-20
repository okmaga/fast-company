import React, { useEffect } from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  createComment,
  removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
  const params = useParams();
  const { userId } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());
  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      pageId: userId,
      userId: currentUserId,
      created_at: Date.now()
    };
    dispatch(createComment(comment));
  };
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit}/>
        </div>
      </div>
      <div className="card mb-3">
        {sortedComments.length > 0 && (
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            {!isLoading
              ? <CommentsList comments={sortedComments} onRemove={handleRemoveComment}/>
              : "loading..."
            }

          </div>)}
      </div>
    </>
  );
};
export default Comments;
