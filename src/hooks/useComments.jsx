import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};
export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState();
  const [error, setError] = useState(null);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUser._id,
      created_at: Date.now()
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments(prev => [...prev, content]);
    } catch (error) {
      errorCatcher(error);
    };
  };
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    };
  };

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments(prev => prev.filter(comment => comment._id !== id));
      };
    } catch (error) {
      errorCatcher(error);
    };
  };

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  }, [error]);

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading, removeComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
