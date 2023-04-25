/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setTeamMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <>
      <h1 className="my-3">Musicians</h1>
      <div className="d-flex gap-3">
        {teamMembers.map((member) => (
          <MemberCard key={member.firebaseKey} obj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </>

  );
};
export default Team;
