/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

const Team = ({ query }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setTeamMembers);
  };

  const filteredMembers = teamMembers.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()) || member.genre.toLowerCase().includes(query.toLocaleLowerCase())
   || member.role.toLowerCase().includes(query.toLocaleLowerCase()));

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <>
      <title>Musicians</title>
      <h1 className="my-3">Musicians</h1>
      <div className="d-flex gap-3 flex-wrap">
        {filteredMembers.map((member) => (
          <MemberCard key={member.firebaseKey} obj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </>

  );
};
export default Team;

Team.propTypes = {
  query: PropTypes.string,

};

Team.defaultProps = {
  query: '',
};
