// ShoppingHeader.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const shoppingViewHeaderMenuItems = [
  { id: 1, label: "C&H", path: "/" },
  { id: 3, label: "Search", path: "/event/search" },
  { id: 2, label: "Account", path: "/event/user" },
];

const EventHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="flex justify-around items-center">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <NavLink
            key={menuItem.id}
            to={menuItem.path}
            className={({ isActive }) =>
              `text-xl font-semibold w-full py-4 px-6 text-gray-700 transition-colors
              ${isActive ? "border-b-4 border-blue-500 text-blue-600" : "border-b-4 border-transparent hover:text-blue-600"}`
            }
          >
            {menuItem.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default EventHeader;
