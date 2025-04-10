// ShoppingHeader.jsx
import React from "react";
import { Link } from "react-router-dom";

const shoppingViewHeaderMenuItems = [
  { id: 1, label: "C&H", path: "/" },
  { id: 3, label: "Search", path: "/event/search" },
  { id: 2, label: "Account", path: "/event/user" },
  
];

const EventHeader = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <nav className="flex justify-around items-center">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Link
            className="text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            key={menuItem.id}
            to={menuItem.path}
          >
            {menuItem.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default EventHeader;
