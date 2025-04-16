import * as React from "react";
const FemaleProfileIcon = ({ width = "75%", height = "75%", ...props }) => (
  <svg
    fill="#000000"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21,20v2a1,1,0,0,1-2,0V20a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v2a1,1,0,0,1-2,0V20a5.006,5.006,0,0,1,5-5h8A5.006,5.006,0,0,1,21,20Zm-9-7a9.735,9.735,0,0,1-6.707-2.293,1,1,0,0,1,.26-1.6C6.945,8.409,7,6.021,7,6A5,5,0,0,1,17,6c0,.052.063,2.416,1.447,3.108a1,1,0,0,1,.26,1.6A9.735,9.735,0,0,1,12,13ZM7.649,9.953A8.816,8.816,0,0,0,12,11a8.815,8.815,0,0,0,4.351-1.047A6.716,6.716,0,0,1,15,6,3,3,0,0,0,9,6,6.716,6.716,0,0,1,7.649,9.953Z" />
  </svg>
);
export default FemaleProfileIcon;
