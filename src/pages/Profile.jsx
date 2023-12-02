import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { removeUserInfo } from "../redux/user/userSlice";
import { setComplete , setProgress } from "../redux/enroll/enrollSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enrrolledCourses } = useSelector((state) => state.enroll);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo.length === 0) {
      navigate("/sign-up");
    }
  }, [navigate, userInfo,enrrolledCourses]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============

  const handleCheck =(id)=>{
    console.log(id);
       dispatch(setComplete({id:id}))
  }
  const handleLogout = () => {
    dispatch(removeUserInfo());
    navigate("/");
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 bg-[#F5F5F3] gap-4 md:gap-2 sm:flex-wrap md:flex-wrap md:flex-col">
      <div className="w-full lg:inline-flex bg-[#F5F5F3]  h-full text-black p-5 ">
        <div
          className="h-full md:w-full sm:w-full py-10 rounded-lg bg-white shadow-md px-10 flex flex-col gap-6 justify-center"
          style={{ overflow: "auto", maxHeight: "600px" }}
        >
          {enrrolledCourses ? (
            enrrolledCourses.map((item) => (
              <div
                key={new Date()}
                className="max-w-[600px]  bg-slate-50 rounded-lg shadow duration-150 hover:scale-105 hover:shadow-md sm:flex-wrap mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2  md:gap-2"
              >
                <img
                  className="w-40 p-3 rounded-lg col-span-1 sm:col-span-1 md:col-span-1 self-center"
                  src={item.thumbnail}
                  alt="courseImage"
                />
                <div className="col-span-1 sm:col-span-1 md:col-span-1 p-3">
                  <h3 className="text-slate-500 text-sm font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400">{item.instructor}</p>
                  <span className="text-xs text-slate-400">
                    Due Date :{new Date().toLocaleDateString()}
                  </span>

                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-5">
                    {item.complete ?
                    <div
                      className="bg-green-600 text-xs font-sm text-blue-100 text-center p-0.2 leading-none rounded-full"
                      style={{ width: '100%' }}
                    >
                      {" "}
                      100%
                    </div> :  <div
                      className="bg-blue-600 text-xs font-sm text-blue-100 text-center p-0.2 leading-none rounded-full"
                      style={{ width: `${item.progress}%` }}
                    >
                      {" "}
                      {item.progress}%
                    </div>}
                  </div>
                  <div className="flex py-3 gap-4 ">
                    <input type="checkbox" onChange={()=>handleCheck(item._id)} checked={item.complete} />
                    <label className="text-xs text-slate-400">Marked as complete</label>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-primeColor font-semibold text-black">
              No Product Found!
            </span>
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F3]">
          <div className="mx-auto px-5">
            <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
              <img
                className="w-full rounded-lg object-cover object-center p-3"
                src="https://res.cloudinary.com/mae-com-in/image/upload/v1699458800/images_bx6zzs.png"
                alt="product"
              />
              <div>
                <div className="my-6 flex items-center justify-between px-4">
                  <p className="font-bold text-gray-500">Student</p>
                  <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {userInfo.clientName}
                  </p>
                </div>
                <div className="my-4 flex items-center justify-between px-4">
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                  <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                    {userInfo.email}
                  </p>
                </div>
                <div className="my-4 flex items-center justify-between px-4">
                  <p className="text-sm font-semibold text-gray-500">City</p>
                  <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                    {userInfo.city}
                  </p>
                </div>
                <div className="my-4 flex items-center justify-between px-4">
                  <p className="text-sm font-semibold text-gray-500">Country</p>
                  <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                    {userInfo.country}
                  </p>
                </div>
                <div className="my-4 flex items-center justify-between px-4">
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="text-white  justify-between bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                  >
                    <svg
                      className="w-6 h-6 dark:text-white mr-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                      ></path>
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
