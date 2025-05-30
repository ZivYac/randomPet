import * as React from "react";
const EditIcon = ({
  width = "100%",
  height = "100%",
  color = "#000",
  ...props
}) => (
  <svg
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 52 52"
    enableBackground="new 0 0 52 52"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <path d="M9.5,33.4l8.9,8.9c0.4,0.4,1,0.4,1.4,0L42,20c0.4-0.4,0.4-1,0-1.4l-8.8-8.8c-0.4-0.4-1-0.4-1.4,0L9.5,32.1 C9.1,32.5,9.1,33.1,9.5,33.4z" />
      <path d="M36.1,5.7c-0.4,0.4-0.4,1,0,1.4l8.8,8.8c0.4,0.4,1,0.4,1.4,0l2.5-2.5c1.6-1.5,1.6-3.9,0-5.5l-4.7-4.7 c-1.6-1.6-4.1-1.6-5.7,0L36.1,5.7z" />
      <path d="M2.1,48.2c-0.2,1,0.7,1.9,1.7,1.7l10.9-2.6c0.4-0.1,0.7-0.3,0.9-0.5l0.2-0.2c0.2-0.2,0.3-0.9-0.1-1.3l-9-9 c-0.4-0.4-1.1-0.3-1.3-0.1s-0.2,0.2-0.2,0.2c-0.3,0.3-0.4,0.6-0.5,0.9L2.1,48.2z" />
    </g>
  </svg>
);
export default EditIcon;
