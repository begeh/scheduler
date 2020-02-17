import React from "react";

import "components/Button.scss";

const classNames = require("classnames");

export default function Button(props) {
   const btnClass = classNames({
      button: true,
      'button--confirm': props.confirm,
      'button--danger': props.danger
   });

   return <button onClick={props.onClick} disabled={props.disabled} className={btnClass}>{props.children}</button>;
}
