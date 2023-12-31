import { NavLink, Outlet } from "react-router-dom";
import {
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log("User", user?.email);

  const [isAdmin, setIsAdmin] = useState(false);

  const [users] = useAdmin();

  // here check is admin or not
  // users.map((user) => {
  //   const userEmail = user?.email == user?.email;
  //   const userIsAdmin = user?.role === "admin";

  //   console.log("Admin is", userIsAdmin);
  //   console.log("user email is", userEmail);
  // });
  useEffect(() => {
    // Check if any user has the role of "admin"
    const userInDb = users.find((dbUser) => dbUser?.email === user?.email);
    if (userInDb || null) {
      setIsAdmin(userInDb.role === "admin");
    } else {
      setIsAdmin(false);
    }
  }, [user?.email, users]);
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content bg-[#facf41]">
            {/* this is fro admin and normal user  */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    {" "}
                    <FaHome></FaHome>Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItems">
                    {" "}
                    <FaUtensils></FaUtensils>Add Item
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItems">
                    {" "}
                    <FaList></FaList>Mange Item
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    {" "}
                    <FaBook></FaBook>Mange Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allusers">
                    {" "}
                    <FaUsers></FaUsers>All user
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/home">
                    <FaShoppingCart></FaShoppingCart>User Home
                  </NavLink>
                </li>{" "}
                <li>
                  <NavLink to="/dashboard/reservations">
                    <FaShoppingCart></FaShoppingCart>Reservations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myCart">
                    <FaShoppingCart></FaShoppingCart>My cart
                  </NavLink>
                </li>{" "}
                <li>
                  <NavLink to="/dashboard/payment">
                    <FaWallet></FaWallet> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myBooking">
                    <FaCalendar></FaCalendar> my booking
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;