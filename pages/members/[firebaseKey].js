import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../../utils/context/authContext';
import { getSingleMember } from '../../api/memberData';
import noImage from '../../assets/noImage.png';

const MemberInfo = () => {
  const [member, setMember] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMember);
  }, [firebaseKey]);

  console.warn('Image: ', member.image);
  return (
    <div className="d-flex mt-5">
      <Image className="rounded" src={member.image === undefined ? noImage : member.image} alt="member pic" width="200px" height="200px" />
      <div className="center text-white ms-5">
        <h2 className="display-3 mt-5">{user.displayName}</h2>
        <div className="d-flex">
          <h4 className="fs-3 text-white-50">Instrument:</h4>
          <p className=" ms-3 fs-4">{member.role}</p>
        </div>
        <div className="d-flex">
          <h4 className="fs-3 text-white-50">Info:</h4>
          <p className=" ms-3 fs-4">{member.description}</p>
        </div>
      </div>
    </div>

  );
};

export default MemberInfo;
