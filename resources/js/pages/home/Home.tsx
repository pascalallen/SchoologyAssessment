import React from 'react';
import {Helmet} from 'react-helmet-async';

const Home = (): React.ReactElement => {
  return (
    <div className="home-container container">
      <Helmet>
        <title>Home | Docker Laravel</title>
      </Helmet>
      <div className="row my-5">
        <div className="col">
          <h4 className="mb-5">Home</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur cupiditate deserunt
            distinctio, esse hic inventore ipsum odit officia pariatur porro quia quidem ratione temporibus! Eius
            numquam quae repellat!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
