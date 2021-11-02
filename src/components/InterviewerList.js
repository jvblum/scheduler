import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = (props) => {
  const { 
    interviewers,
    value,
    onChange
  } = props;
  const parsedInterviewers = interviewers.map(interviewer =>
    <InterviewerListItem 
      key={interviewer.id}
      selected={value === interviewer.id}
      setInterviewer={ () => onChange(interviewer.id) }
      {...interviewer} 
    />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;