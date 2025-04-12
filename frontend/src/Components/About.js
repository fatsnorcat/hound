import React from "react";
import foundersImage from "./Assets/eye-hids.jpg";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <h1>
          Let's work together to protect our host systems against types of attacks or anomalies.
        </h1>
      </section>

      {/* Founders Section */}
      <section className="founders-section">
        {/* Text Content */}
        <div className="text-content">
          <p className="uppercase">Our Story</p>
          <h2>Liudas & Edu</h2>
          <p className="italic">The Founders</p>
          <p>
            Founded and run by two longtime friends, Shleps was born out of a shared thirst for a challenge and a vision for environmentally and socially sustainable business.
          </p>
          <p className="mt-4">
            The first pair of Shleps was knit by Edu’s grandma – as a gift for a climbing grandson. Wasn’t long before people in the climbing gym started noticing and putting ideas into our heads – so here we are! Although difficult to replicate at scale, with each pair we seek to embed at least some of the warmth and good will out of which the original pair was born. We mean it to be felt not only by our customers, but also by the people involved in the production.
          </p>
        </div>

        {/* Image */}
        <div className="image-container">
          <img
            src={foundersImage}
            alt="Liudas and Edu sitting on a red couch"
          />
        </div>
      </section>
    </div>
  );
}
