import Image from 'next/image';
// import { useAuth } from '../utils/context/authContext';
import emptyStage from '../assets/large-empty-stage.jpg';

function Home() {
  //  Get user ID using useAuth Hook
  // const { user } = useAuth();
  return (
    <>
      <div className="d-flex flex-column w-75 mx-auto">
        <div className="align-self-center ">
          {/* <h2 className="my-3 mx-5 display-3 text-center">Hey {user.displayName}!</h2> */}
          <h3 className="display-3 text-center mt-4">Welcome to Bandmates </h3>
          <hr />
          <p className="display-6">Where we help you find your place on stage!</p>
        </div>

        <div className="">
          <Image className="rounded-2 mt-5" src={emptyStage} alt="empty stage" />
        </div>

      </div>
    </>
  );
}

export default Home;
