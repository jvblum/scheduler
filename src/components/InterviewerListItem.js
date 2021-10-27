import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const {
    id,
    avatar,
    name,
    setInterviewer,
    selected
  } = props;

  const InterviewerClass = classNames('interviewers__item', { 'interviewers__item--selected': selected });;

  return (
    <li className={InterviewerClass} onClick={() => setInterviewer(id)}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
      {name}
    </li>
  );
};