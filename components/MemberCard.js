import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deleteMember } from '../api/memberData';

const MemberCard = ({ obj, onUpdate }) => {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteMember(obj.firebaseKey).then(() => onUpdate());
    }
  };

  const styles = {
    card: {
      backgroundColor: '#ccc',
      borderRadius: 20,
      padding: '1rem',
      width: '18rem',
    },
    cardImage: {
      // objectFit: 'scale-down',
      width: '150px',
      height: '180px',
      borderRadius: 20,
    },
  };
  return (
    <Card style={styles.card}>
      <Card.Img className="mx-auto" variant="top" src={obj.image} style={styles.cardImage} />
      <Card.Body>
        <Card.Text className="h3 text-center">{obj.name}</Card.Text>
        <Card.Text className="h5">Instrument: {obj.role}</Card.Text>
        <Card.Text> {obj.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
        <Link href={`/members/edit/${obj.firebaseKey}`} passHref>
          <Button variant="info" className="btn-sm">
            EDIT
          </Button>
        </Link>
        <Button variant="danger" className="m-2 btn-sm" onClick={deleteThisMember}>
          DELETE
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default MemberCard;

MemberCard.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
