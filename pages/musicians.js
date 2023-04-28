/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const { user } = useAuth();

  console.warn('TeamMembers: ', teamMembers);

  const getAllMembers = () => {
    getMembers(user.uid).then(setTeamMembers);
  };

  const filteredMembers = teamMembers.filter((member) => member.name.toLowerCase().includes(searchString.toLowerCase()) || member.genre.toLowerCase().includes(searchString.toLocaleLowerCase())
   || member.role.toLowerCase().includes(searchString.toLocaleLowerCase()));

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <>
      <div className="mt-3">
        <input className="rounded-3 p-1" placeholder="search" value={searchString} type="search" onChange={(e) => setSearchString(e.target.value)} />
      </div>
      <h1 className="my-3">Musicians</h1>
      <div className="d-flex gap-3">
        {filteredMembers.map((member) => (
          <MemberCard key={member.firebaseKey} obj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </>

  );
};
export default Team;
