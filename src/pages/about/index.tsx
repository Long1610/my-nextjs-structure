import React from "react";

const About = () => {
  return <div>About</div>;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default About;
