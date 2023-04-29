import Image from 'next/image';
import Link from 'next/link';
import emptyStage from '../assets/large-empty-stage.jpg';

function Home() {
  return (
    <>
      <title>Home</title>
      <div className="d-flex  w-90 mx-auto">
        <div className="align-self-center mt-5 ">
          <h3 className="display-3 text-white-50 text-center mt-4">Welcome to Bandmates </h3>
          <p className="fs-3 text-center">Where we help you find your place on stage!</p>
          <hr />
          <p className="fs-5 text-black-50">At Bandmates, we help musicians find each other to start making music.<br /> Search for folks to jam with on the
            <Link passHref href="/musicians" legacyBehavior><span className="fw-semibold"> Musicians</span></Link> page and be sure to add yourself to our list of musicians so others can find you by clicking <Link passHref href="/new" legacyBehavior><span className="fw-semibold"> here</span></Link> or by using the New link above.
          </p>
        </div>

        <div id="homeImage" className="mt-5 ms-5">
          <Image className="rounded-2 mt-3" src={emptyStage} alt="empty stage" />
        </div>

      </div>
    </>
  );
}

export default Home;
