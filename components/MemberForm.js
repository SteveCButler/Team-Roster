/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/memberData';
// import guitar from '../assets/guitar.jpg';
// import bass from '../assets/bass.jpg';
// import keys from '../assets/keys.jpg';
// import mic from '../assets/mic.jpg';

const initialState = {
  name: '',
  role: '',
  image: '',
  description: '',
};
function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [avatar, setAvatar] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  // if (obj.image) {
  //   console.warn('IMAGE');
  //   setAvatar(obj.image);
  // }

  // const selectAvatar = (e) => {
  //   setAvatar(e.target.value);
  // };

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/members/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      console.warn('Payload: ', payload);
      createMember(payload).then(() => {
        router.push('/musicians');
      });
    }
  };

  return (
    <>
      <Form className="text-white-50" onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Musician</h2>

        {/* First Name INPUT  */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formInput.name}
            placeholder="Name"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Role  */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Intrument</Form.Label>
          <Form.Control
            type="text"
            placeholder="Main Instrument"
            value={formInput.role}
            name="role"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Image INPUT  */}
        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Image</Form.Label>
          {/* <ul className="d-flex list-unstyled">
            <li className="p-1"><Image src={guitar} value={avatar} alt="guitar" width="40" height="40" onClick={selectAvatar} /></li>
            <li className="p-1"><Image src={mic} value={avatar} alt="microphone" width="40" height="40" onClick={selectAvatar} /></li>
            <li className="p-1"><Image src={bass} value={avatar} alt="bass" width="40" height="40" onClick={selectAvatar} /></li>
            <li className="p-1"><Image src={keys} value={avatar} alt="piano" width="40" height="40" onClick={selectAvatar} /></li>
          </ul> */}
          <Form.Control
            type="text"
            placeholder="Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description  */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>What are you looking for in a band?</Form.Label>
          <Form.Control
            type="text"
            placeholder="genre, experience level, time commitment"
            value={formInput.description}
            name="description"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default MemberForm;

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
