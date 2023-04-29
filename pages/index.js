import Image from 'next/image';
// import { useAuth } from '../utils/context/authContext';
import emptyStage from '../assets/large-empty-stage.jpg';

function Home() {
  //  Get user ID using useAuth Hook
  // const { user } = useAuth();
  return (
    <>
      <div className="d-flex flex-column w-90 mx-auto">
        <div className="align-self-center ">
          {/* <h2 className="my-3 mx-5 display-3 text-center">Hey {user.displayName}!</h2> */}
          <h3 className="display-3 text-white-50 text-center mt-4">Welcome to Bandmates </h3>
          <p className="fs-3 text-center">Where we help you find your place on stage!</p>
          <hr />
          <p className="fs-5 text-black-50">At Bandmates, we help musicians find each other to start making music.<br /> Search for folks to jam with on the Musician page and be sure to add yourself to our list of Musicians so others can find you by using the New link.</p>
        </div>

        <div className="">
          <Image className="rounded-2 mt-3" src={emptyStage} alt="empty stage" />
        </div>

      </div>
    </>
  );
}

export default Home;
