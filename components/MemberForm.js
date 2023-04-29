/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/memberData';
import guitar from '../assets/guitar.jpg';
import bass from '../assets/bass.jpg';
import keys from '../assets/keys.jpg';
import mic from '../assets/mic.jpg';
import mando from '../assets/mando2.jpg';
import banjo from '../assets/banjo.jpg';
import fiddle from '../assets/fiddle.jpg';
import noImage from '../assets/noImage.png';

const initialState = {
  name: '',
  role: '',
  image: '',
  genre: '',
  description: '',
};
const avatars = [guitar, bass, keys, mic, mando, banjo, fiddle];
function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedAvatar, setSelectedAvatar] = useState(noImage);
  const { user } = useAuth();
  const router = useRouter();

  const selectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

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
      const payload = { ...formInput, image: selectedAvatar.src };
      updateMember(payload).then(() => router.push(`/members/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, image: selectedAvatar.src };
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
          <Form.Label className="fs-3">Name</Form.Label>
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
          <Form.Label className="fs-3">Intrument</Form.Label>
          <Form.Select name="role" value={formInput.role} onChange={handleChange} className="mb-2" aria-label="Default select example">
            <option value="Electric Guitar">Electric Guitar</option>
            <option value="Acoustic Guitar">Acoustic Guitar</option>
            <option value="Bass">Bass</option>
            <option value="Drums">Drums</option>
            <option value="Keys">Keys</option>
            <option value="Vocals">Vocals</option>
            <option value="Mandolin">Mandolin</option>
            <option value="Banjo">Banjo</option>
            <option value="Fiddle">Fiddle</option>
          </Form.Select>
        </Form.Group>
        <Form.Label className="fs-3">Genre</Form.Label>
        <Form.Select name="genre" value={formInput.genre} onChange={handleChange} className="mb-2" aria-label="Default select example">
          <option value="Rock">Rock</option>
          <option value="Blues">Blues</option>
          <option value="Metal">Metal</option>
          <option value="Country">Country</option>
          <option value="Contemporary Christian">Contemporary Christian</option>
          <option value="Bluegrass">Bluegrass</option>
          <option value="Jazz">Jazz</option>
        </Form.Select>

        <Form.Label className="fs-3 me-4">Select Your Avatar</Form.Label>
        {avatars.map((avatar) => (
          <Image
            key={uuidv4()}
            src={avatar}
            value={selectedAvatar}
            alt="Avatar"
            width="60px"
            height="60px"
            onClick={() => selectAvatar(avatar)}
            className={selectedAvatar === avatar ? 'selected rounded-2' : 'm-2 rounded-2'}
          />
        ))}

        {/* Description  */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label className="fs-3">About You</Form.Label>
          <p>What are you looking for in a band? Looking to go pro, just jam, writing, recoring? What is your experience level?</p>
          <Form.Control
            type="text"
            placeholder="experience level, time commitment, etc"
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
