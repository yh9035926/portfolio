import React from "react";
import DownButton from "./DownButton";

const AboutMe: React.FC = () => {
  return (
    <section className="aboutMe">
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        corporis, error earum nemo dignissimos rerum deleniti repellendus
        consectetur officia fugit! Officia porro neque in beatae distinctio
        similique alias asperiores voluptatem.
      </p>
      <DownButton />
    </section>
  );
};

export default AboutMe;
