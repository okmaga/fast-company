import React, { useEffect } from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import { useComments } from "../../hooks/useComments";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getCommentsLoadingStatus, loadCommentsList } from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
  const params = useParams();
  const { userId } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());

  const { createComment, removeComment } = useComments();

  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    createComment(data);
  };
  const handleRemoveComment = (id) => {
    removeComment(id);
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
