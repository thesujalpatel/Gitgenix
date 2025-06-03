"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiSearch,
  FiTrash2,
  FiShield,
  FiX,
  FiCalendar,
  FiActivity,
  FiEye,
  FiUserPlus,
} from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useAdmin } from "../../contexts/AdminContext";
import {
  AdminUser,
  AdminPermission,
  createAdminUser,
} from "@/firebase/authService";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  adminUsers: number;
}

export default function UserManagement() {
  const { hasPermission } = useAdmin();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    adminUsers: 0,
  });

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "admin" as "admin" | "super_admin",
    permissions: [] as AdminPermission[],
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterRole]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // Mock user data - in real app, fetch from Firebase
      const mockUsers: AdminUser[] = [
        {
          uid: "1",
          email: "admin@gitgenix.com",
          role: "super_admin",
          permissions: [
            "seo_management",
            "user_management",
            "content_management",
            "analytics_access",
            "system_settings",
          ],
          createdAt: "2024-01-01T00:00:00Z",
          lastLogin: "2024-01-20T10:30:00Z",
          isActive: true,
        },
        {
          uid: "2",
          email: "seo.manager@gitgenix.com",
          role: "admin",
          permissions: [
            "seo_management",
            "content_management",
            "analytics_access",
          ],
          createdAt: "2024-01-15T00:00:00Z",
          lastLogin: "2024-01-19T14:20:00Z",
          isActive: true,
        },
        {
          uid: "3",
          email: "content.admin@gitgenix.com",
          role: "admin",
          permissions: ["content_management"],
          createdAt: "2024-01-10T00:00:00Z",
          lastLogin: "2024-01-18T09:15:00Z",
          isActive: false,
        },
      ];

      setUsers(mockUsers);
      setUserStats({
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter((u) => u.isActive).length,
        newUsersToday: 1, // Mock data
        adminUsers: mockUsers.length,
      });
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const adminUser = await createAdminUser(
        newUser.email,
        newUser.password,
        newUser.role,
        newUser.permissions
      );

      setUsers((prev) => [...prev, adminUser]);
      setNewUser({
        email: "",
        password: "",
        role: "admin",
        permissions: [],
      });
      setShowCreateUser(false);
      toast.success("Admin user created successfully");
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user");
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.uid === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
    toast.success("User status updated");
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.uid !== userId));
      toast.success("User deleted successfully");
      setSelectedUser(null);
      setShowUserModal(false);
    }
  };

  const allPermissions: AdminPermission[] = [
    "seo_management",
    "user_management",
    "content_management",
    "analytics_access",
    "system_settings",
  ];

  const getPermissionLabel = (permission: AdminPermission): string => {
    const labels: Record<AdminPermission, string> = {
      seo_management: "SEO Management",
      user_management: "User Management",
      content_management: "Content Management",
      analytics_access: "Analytics Access",
      system_settings: "System Settings",
    };
    return labels[permission];
  };

  if (!hasPermission("user_management")) {
    return (
      <div className="text-center py-12">
        <FiShield className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Access Denied
        </h3>
        <p className="text-foreground/60">
          You don't have permission to access user management.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">User Management</h3>
          <p className="text-foreground/60">
            Manage admin users and their permissions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateUser(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiUserPlus className="w-4 h-4" />
          <span>Add Admin User</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Users",
            value: userStats.totalUsers,
            icon: <FiUsers className="w-5 h-5" />,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Active Users",
            value: userStats.activeUsers,
            icon: <FiActivity className="w-5 h-5" />,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "New Today",
            value: userStats.newUsersToday,
            icon: <FiCalendar className="w-5 h-5" />,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Admin Users",
            value: userStats.adminUsers,
            icon: <RiAdminLine className="w-5 h-5" />,
            color: "from-orange-500 to-red-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            placeholder="Search users by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-foreground/5 rounded-xl border border-foreground/10 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-foreground/10">
                <tr>
                  <th className="text-left p-4 text-foreground/70 font-medium">
                    User
                  </th>
                  <th className="text-left p-4 text-foreground/70 font-medium">
                    Role
                  </th>
                  <th className="text-left p-4 text-foreground/70 font-medium">
                    Permissions
                  </th>
                  <th className="text-left p-4 text-foreground/70 font-medium">
                    Last Login
                  </th>
                  <th className="text-left p-4 text-foreground/70 font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-foreground/70 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.uid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-foreground/10 hover:bg-foreground/5"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <FiUsers className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {user.email}
                          </p>
                          <p className="text-sm text-foreground/60">
                            Created{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "super_admin"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {user.role === "super_admin" ? "Super Admin" : "Admin"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 2).map((permission) => (
                          <span
                            key={permission}
                            className="px-2 py-1 bg-foreground/10 text-foreground/70 text-xs rounded"
                          >
                            {getPermissionLabel(permission)}
                          </span>
                        ))}
                        {user.permissions.length > 2 && (
                          <span className="px-2 py-1 bg-foreground/10 text-foreground/70 text-xs rounded">
                            +{user.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-foreground/70">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleUserStatus(user.uid)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.isActive
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="p-2 hover:bg-foreground/10 rounded text-foreground/60 hover:text-foreground"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.uid)}
                          className="p-2 hover:bg-red-500/10 rounded text-foreground/60 hover:text-red-500"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {showCreateUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateUser(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl p-6 w-full max-w-md border border-foreground/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">
                  Create Admin User
                </h4>
                <button
                  onClick={() => setShowCreateUser(false)}
                  className="p-1 hover:bg-foreground/10 rounded"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
                    placeholder="Strong password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value as "admin" | "super_admin",
                      })
                    }
                    className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allPermissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={newUser.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewUser({
                                ...newUser,
                                permissions: [
                                  ...newUser.permissions,
                                  permission,
                                ],
                              });
                            } else {
                              setNewUser({
                                ...newUser,
                                permissions: newUser.permissions.filter(
                                  (p) => p !== permission
                                ),
                              });
                            }
                          }}
                          className="rounded border-foreground/20"
                        />
                        <span className="text-sm text-foreground/80">
                          {getPermissionLabel(permission)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleCreateUser}
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Create User
                  </button>
                  <button
                    onClick={() => setShowCreateUser(false)}
                    className="flex-1 bg-foreground/10 text-foreground py-2 rounded-lg hover:bg-foreground/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl p-6 w-full max-w-lg border border-foreground/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-foreground">User Details</h4>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-1 hover:bg-foreground/10 rounded"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedUser.email}
                    </p>
                    <p className="text-sm text-foreground/60 capitalize">
                      {selectedUser.role.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground/60">
                      Created
                    </p>
                    <p className="text-foreground">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/60">
                      Last Login
                    </p>
                    <p className="text-foreground">
                      {new Date(selectedUser.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground/60 mb-2">
                    Status
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedUser.isActive
                        ? "bg-green-500/10 text-green-500"
                        : "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground/60 mb-2">
                    Permissions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {getPermissionLabel(permission)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
