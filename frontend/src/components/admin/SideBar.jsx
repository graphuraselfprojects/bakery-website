import {
  Boxes,
  Home,
  Percent,
  ShoppingBag,
  Truck,
  Menu,
  X,
  User2,
  Users2,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/homePage/logo White.png";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: <Home size={22} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingBag size={22} />, path: "/admin/orders" },
    { name: "Products", icon: <Boxes size={22} />, path: "/admin/products" },
    { name: "Delivery", icon: <Truck size={22} />, path: "/admin/delivery" },
    { name: "Offers", icon: <Percent size={22} />, path: "/admin/offers" },
    {
      name: "Create Admin",
      icon: <User2 size={22} />,
      path: "/admin/create-admin",
    },
    {
      name: "All Admins",
      icon: <Users2 size={22} />,
      path: "/admin/all-admins",
    },
    {
      name: "All Users",
      icon: <Percent size={22} />,
      path: "/admin/all-users",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* MOBILE HAMBURGER */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-white rounded shadow-md"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
                    fixed top-0 left-0 h-screen bg-[#e2bf9d] shadow-xl z-50
                    flex flex-col transition-transform duration-300
                    ${collapsed ? "w-20" : "w-64"}
                    ${
                      mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                    lg:static lg:translate-x-0
                `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#d7b99b]">
          {!collapsed && <img src={logo} alt="logo" className="h-12" />}

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            className="hidden lg:block p-2 rounded hover:bg-[#d3a882]"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu size={22} /> : <X size={22} />}
          </button>

          {/* MOBILE CLOSE BUTTON */}
          <button
            className="lg:hidden p-2 rounded hover:bg-[#d3a882]"
            onClick={() => setMobileOpen(false)}
          >
            <X size={26} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto mt-4 px-2 space-y-1">
          {menus.map((m) => (
            <Link
              key={m.name}
              to={m.path}
              onClick={() => setMobileOpen(false)}
              className={`
                                flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition
                                ${
                                  isActive(m.path)
                                    ? "bg-[#8B5E3C] text-white shadow-md"
                                    : "text-[#6a4a2b] hover:bg-[#f3dfcf]"
                                }
                            `}
            >
              {m.icon}
              {!collapsed && <span className="text-lg">{m.name}</span>}
            </Link>
          ))}
        </nav>

        {!collapsed && (
          <p className="text-center text-sm text-[#6a4a2b] mb-4">
            © Bakery Admin
          </p>
        )}
      </aside>
    </>
  );
};

export default SideBar;
