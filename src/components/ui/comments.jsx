import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    api.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data));
  }, []);
  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };
  const handleRemoveComment = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(comments.filter((c) => c._id !== id));
    });
  };
  const sortedComments = comments.length > 1
    ? [...comments].sort((a, b) => Number(a.created_at) - Number(b.created_at))
    : comments;

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
