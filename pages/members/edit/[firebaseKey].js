/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleMember } from '../../../api/memberData';
import MemberForm from '../../../components/MemberForm';

export default function EditAuthor() {
  const [editMember, setEditMember] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then((response) => setEditMember(response));
  }, []);

  return (
    <>
      <MemberForm obj={editMember} />
    </>
  );
}
