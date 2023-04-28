import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';

const Search = () => {
  const [query, setQuery] = useState('');

  // const filteredMembers = Object.values(members).filter((member) => member.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <input className="rounded-2 p-1" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="search members" />
      <Button type="submit">Search</Button>
    </>
  );
};

export default Search;

Search.propTypes = {
  members: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
