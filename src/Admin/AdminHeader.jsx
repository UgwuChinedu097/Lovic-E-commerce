import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../service/UserSlice";
import { clearNotifications } from "../service/NotificationSlice";
import { cn } from "../utilities/Utilities";
import { useNavigate } from "react-router-dom";
import { persistor } from "../service/Store"; 

export default function Header({ onSidebarToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const notifications = useSelector((state) => state.notifications.list);

  const getInitials = (email = "") => email?.trim()?.[0]?.toUpperCase() || "A";

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge(); 
    navigate("/signin");
  };

  const handleOpenNotifications = () => {
    dispatch(clearNotifications());
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Notifications"
              onClick={handleOpenNotifications}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-64 bg-white rounded-md shadow-lg p-2" sideOffset={5}>
              <div className="font-semibold px-2 py-1 border-b border-gray-200">
                Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-2 text-sm text-gray-500">No notifications</div>
              ) : (
                notifications.map((note) => (
                  <DropdownMenu.Item
                    key={note.id}
                    className={cn("px-3 py-2 rounded-md text-sm cursor-pointer select-none text-gray-700 hover:bg-gray-100")}
                  >
                    {note.text}
                  </DropdownMenu.Item>
                ))
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1 hover:bg-gray-100 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold uppercase">
                {getInitials(user?.email)}
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-48 bg-white rounded-md shadow-lg p-2" sideOffset={5}>
              <DropdownMenu.Separator className="my-1 border-t border-gray-200" />
              <DropdownMenu.Item
                className="px-3 py-2 rounded-md text-sm cursor-pointer select-none text-red-600 hover:bg-red-100"
                onSelect={handleLogout}
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
