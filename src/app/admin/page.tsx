"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Plus,
  Pencil,
  Trash2,
  TrendingUp,
  DollarSign,
  UserCheck,
  Lock,
} from "lucide-react";

const stats = [
  { icon: DollarSign, label: "Revenue", value: "$12,450", change: "+12%", color: "emerald" },
  { icon: ShoppingCart, label: "Orders", value: "156", change: "+8%", color: "blue" },
  { icon: Package, label: "Products", value: "48", change: "+3%", color: "purple" },
  { icon: UserCheck, label: "Customers", value: "1,234", change: "+15%", color: "orange" },
];

const recentOrders = [
  { id: "#1234", customer: "Ahmed Ali", total: "$45.99", status: "Delivered", date: "2024-01-15" },
  { id: "#1233", customer: "Sara Hassan", total: "$32.50", status: "Processing", date: "2024-01-15" },
  { id: "#1232", customer: "Omar Khaled", total: "$78.00", status: "Shipped", date: "2024-01-14" },
  { id: "#1231", customer: "Fatima Youssef", total: "$22.99", status: "Pending", date: "2024-01-14" },
  { id: "#1230", customer: "Mohamed Salem", total: "$56.75", status: "Delivered", date: "2024-01-13" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function AdminPage() {
  const dir = useLocaleStore((s) => s.dir());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "grandoliva2024") {
      sessionStorage.setItem("admin-auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir={dir}>
        <div className="text-white">Loading...</div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir={dir}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-4"
        >
          <div className="bg-[#111111] rounded-2xl border border-[#2a2a2a] p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#c9a96e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#c9a96e]" />
              </div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Admin Access
              </h1>
              <p className="text-gray-500 mt-2">Enter password to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-gold px-6 py-3 rounded-xl font-bold text-white transition-all"
              >
                دخول
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-20 bg-gray-50 min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
              <div className="flex items-center gap-3 mb-6 p-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="font-bold text-gray-900">Admin Panel</span>
              </div>
              <nav className="space-y-1">
                {[
                  { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
                  { key: "products", icon: Package, label: "Products" },
                  { key: "orders", icon: ShoppingCart, label: "Orders" },
                  { key: "users", icon: Users, label: "Users" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.key
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                        </div>
                        <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Order ID</th>
                          <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Customer</th>
                          <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Total</th>
                          <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Status</th>
                          <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                            <td className="px-6 py-4 font-bold text-emerald-600">{order.total}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all">
                    <Plus className="w-5 h-5" />
                    Add Product
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Product</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Category</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Price</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Stock</th>
                        <th className="text-right px-6 py-4 text-sm font-bold text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: "Green Olives", cat: "Olives", price: "$12.99", stock: 100 },
                        { name: "Black Olives", cat: "Olives", price: "$14.99", stock: 80 },
                        { name: "Mixed Pickles", cat: "Pickles", price: "$9.99", stock: 120 },
                        { name: "Stuffed Olives", cat: "Olives", price: "$16.99", stock: 60 },
                      ].map((p, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                              <span className="text-xl">🫒</span>
                            </div>
                            <span className="font-bold text-gray-900">{p.name}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{p.cat}</td>
                          <td className="px-6 py-4 font-bold text-emerald-600">{p.price}</td>
                          <td className="px-6 py-4 text-gray-600">{p.stock}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Order ID</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Customer</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Total</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                          <td className="px-6 py-4 font-bold text-emerald-600">{order.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Users</h1>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">User</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Email</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Role</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: "Ahmed Ali", email: "ahmed@example.com", role: "Customer", date: "2024-01-10" },
                        { name: "Sara Hassan", email: "sara@example.com", role: "Admin", date: "2024-01-05" },
                        { name: "Omar Khaled", email: "omar@example.com", role: "Customer", date: "2024-01-12" },
                        { name: "Fatima Youssef", email: "fatima@example.com", role: "Customer", date: "2024-01-08" },
                      ].map((u, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                              {u.name[0]}
                            </div>
                            <span className="font-bold text-gray-900">{u.name}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              u.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{u.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
