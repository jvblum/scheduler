import React from "react";

import "components/Application.scss";
import Button from "./Button";

export default function Application(props) {
  const testEvent = () => {
    alert('hey');
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        <Button confirm>hey</Button>
        <Button danger>you</Button>
        <Button onClick={testEvent}>onClick</Button>
        <Button disabled>off</Button>
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
