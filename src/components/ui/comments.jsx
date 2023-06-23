import React from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import { useComments } from "../../hooks/useComments";
import { orderBy } from "lodash";

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

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
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit}/>
        </div>
      </div>
      <div className="card mb-3">
        {sortedComments.length > 0 && (
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>)}
      </div>
    </>
  );
};
export default Comments;
