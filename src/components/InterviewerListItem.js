import React from 'react';

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerClass = classNames(
    {
      'interviewers__item': true,
      'interviewers__item--selected': props.selected,
      // 'interviewers__item--selected interviewers__item-image': props.setInterviewer
    }
  )
  

  return (
    <li className={interviewerClass} onClick={props.setInterviewer} >
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}