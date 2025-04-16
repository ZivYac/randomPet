import * as React from "react";
const PlusIcon = ({ color = "#000", ...props }) => (
  <svg
    fill="#000000"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    id="plus"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
    {...props}
  >
    <path
      id="primary"
      d="M12,20a1,1,0,0,1-1-1V13H5a1,1,0,0,1,0-2h6V5a1,1,0,0,1,2,0v6h6a1,1,0,0,1,0,2H13v6A1,1,0,0,1,12,20Z"
      style={{
        fill: color,
      }}
    />
  </svg>
);
export default PlusIcon;
