import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h2>Welcome {user.displayName}</h2>
    </>
  );
}

export default Home;
