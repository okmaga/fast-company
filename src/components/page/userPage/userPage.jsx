import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getProfession } from "../../../store/professions";

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);
  const profession = useSelector(getProfession(user.profession));
  const userWithProf = { ...user, profession };

  if (userWithProf) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={userWithProf} />
            <QualitiesCard data={userWithProf.qualities}/>
            <MeetingsCard value={userWithProf.completedMeetings}/>
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  };
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
