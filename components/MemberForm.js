/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { v4 } from 'uuid';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/memberData';
import guitar from '../assets/guitar.jpg';
import bass from '../assets/bass.jpg';
import keys from '../assets/keys.jpg';
import mic from '../assets/mic.jpg';
import noImage from '../assets/noImage.png';

const initialState = {
  name: '',
  role: '',
  image: '',
  genre: '',
  description: '',
};
const avatars = [guitar, bass, keys, mic];
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
          {/* <Form.Control
            type="text"
            placeholder="Main Instrument"
            value={formInput.role}
            name="role"
            onChange={handleChange}
            required
          /> */}
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
        <Form.Label>Genre</Form.Label>
        <Form.Select name="genre" value={formInput.genre} onChange={handleChange} className="mb-2" aria-label="Default select example">
          <option value="Rock">Rock</option>
          <option value="Blues">Blues</option>
          <option value="Metal">Metal</option>
          <option value="Country">Country</option>
          <option value="Contemporary Christian">Contemporary Christian</option>
          <option value="Bluegrass">Bluegrass</option>
          <option value="Jazz">Jazz</option>
        </Form.Select>

        <Form.Label>Select Your Avatar</Form.Label>
        <br />
        {avatars.map((avatar) => (
          <Image
            key={v4()}
            src={avatar}
            alt="Avatar"
            width="50px"
            height="50px"
            onClick={() => selectAvatar(avatar)}
            className={selectedAvatar === avatar ? 'selected' : 'm-2'}
          />
        ))}

        {/* Image INPUT  */}
        <Form.Group controlId="formImage" className="mb-3">
          <Form.Control
            type="hidden"
            placeholder="Image URL"
            name="image"
            value={selectedAvatar.src}
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
