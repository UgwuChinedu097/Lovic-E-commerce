import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Home,
  Users,
  ShoppingCart,
  Package,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "../utilities/Utilities"

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [productsOpen, setProductsOpen] = useState(false)

  const handleNavigate = (path) => {
    navigate(path)
    onClose && onClose()
  }

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Users", icon: <Users size={18} />, path: "/dashboard/users" },
    { name: "Orders", icon: <ShoppingCart size={18} />, path: "/dashboard/orders" },
    { name: "Products", icon: <Package size={18} />, path: null }, 
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full bg-black text-white p-6 w-64">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[18px] ml-3 font-bold">Lovic mega gold</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-amber-600 focus:outline-none"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        )}
      </div>
      <nav className="space-y-4 flex-1">
        {menuItems.map((item) =>
          item.name === "Products" ? (
            <div key="Products" className="space-y-1">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={cn(
                  "flex items-center justify-between w-full text-left px-2 py-2 rounded hover:text-amber-600 transition-colors",
                  location.pathname.includes("/dashboard/products")
                    ? "text-amber-600 font-semibold"
                    : "text-white"
                )}
              >
                <span className="flex items-center gap-3">
                  <Package size={18} />
                  Products
                </span>
                {productsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {productsOpen && (
                <div className="ml-6 space-y-1">
                  <button
                    onClick={() => handleNavigate("/dashboard/allproduct")}
                    className={cn(
                      "block w-full text-left px-2 py-1 rounded hover:text-amber-600 transition-colors text-sm",
                      location.pathname === "/dashboard/allproduct" ? "text-amber-600 font-semibold" : "text-white"
                    )}
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => handleNavigate("/dashboard/products/addproduct")}
                    className={cn(
                      "block w-full text-left px-2 py-1 rounded hover:text-amber-600 transition-colors text-sm",
                      location.pathname === "/dashboard/products/addproduct" ? "text-amber-600 font-semibold" : "text-white"
                    )}
                  >
                    Add Product
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "flex items-center gap-3 w-full text-left px-2 py-2 rounded hover:text-amber-600 transition-colors",
                location.pathname === item.path ? "text-amber-600 font-semibold" : "text-white"
              )}
            >
              {item.icon}
              {item.name}
            </button>
          )
        )}
      </nav>
    </div>
  )

  return (
    <>

      <aside className="hidden lg:flex flex-shrink-0 w-64">{sidebarContent}</aside>

      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content
            className="fixed inset-y-0 left-0 w-64 bg-black text-white p-0 z-50 shadow-lg outline-none transition-transform duration-700 ease-in-out"
            onInteractOutside={onClose}
          >
            {sidebarContent}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Sidebar
