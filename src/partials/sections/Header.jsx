import React from "react";
import { useState } from "react";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="header">
      <button className="btn-account" onClick={toggleDropdown}></button>
      {dropdownVisible && (
        <div className="dropdown-menu">
          <button className="dropdown-item">Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;

// const Header = () => {
//   return (
//     <header className="header">
//       <button className="btn-account"> </button>
//       <div className="dropdown">
//         <div className="dropdown-header">
//           <h7>Dark Mode</h7>
//         </div>
//       </div>
//     </header>
//   );
// };
