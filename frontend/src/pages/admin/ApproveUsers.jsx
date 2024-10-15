import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import Spinner from "../../components/Spinner";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import DefaultImage from "../../assets/default";

export default function ApproveUsers() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchUnapprovedUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/unapproved", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching unapproved users:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchUnapprovedUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/user/approve", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: id }),
      });

      const data = await response.json();

      if (data.success) {
        setUsers(
          users.map((user) => (user.id === id ? { ...user, status: 1 } : user))
        );
        fetchUnapprovedUsers();
      } else {
        console.error("Error approving user:", data.message);
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/admin`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: user_id }),
      });

      const data = await response.json();

      if (data.success) {
        setUsers(users.filter((user) => user.user_id !== user_id));
        fetchUnapprovedUsers();
      } else {
        console.error("Error rejecting user:", data.message);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  if (loading || fetching) return <Spinner />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div
        className={`flex flex-col flex-1 ${
          isSidebarOpen ? "ml-64" : ""
        } overflow-auto`}
      >
        <Header onMenuClick={toggleSidebar} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          {/* User Approval List Heading */}
          <h2 className="text-3xl font-bold mt-8">User Approval List</h2>

          {/* User Approval Section */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-opacity-50 border-gray-500">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y ">
                {users.length ? (
                  users.map((user) => (
                    <tr key={user.user_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.profile_img ? (
                          <img
                            src={user.profile_img}
                            alt={user.full_name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 object-cover">
                          <DefaultImage />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md font-medium ">
                          {user.full_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md ">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md ">{user.semester}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md ">{user.dept}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md ">{user.roll_no}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-md font-medium">
                        <Button
                          onClick={() => handleApprove(user.user_id)}
                          disabled={user.status === 1}
                          variant="success"
                          className=" bg-green-600 hover:bg-green-700"
                        >
                          {user.status === 1 ? "Approved" : "Approve"}
                        </Button>
                        <Button
                          onClick={() => handleReject(user.user_id)}
                          variant="destructive"
                          className="ml-2"
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-3xl">
                      No pending approvals.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
