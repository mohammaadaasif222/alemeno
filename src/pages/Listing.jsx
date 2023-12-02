import React, { Suspense, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector, useDispatch } from "react-redux";
import { Navigation } from "swiper/modules";
import Spinner from "../components/Spinner";
import "swiper/css/bundle";
import { FaMapMarkerAlt, FaShare, FaChevronDown } from "react-icons/fa";
import {addToEnrrolled} from '../redux/enroll/enrollSlice'

export default function Listing() {
  const dispacth = useDispatch()
  const navigate = useNavigate()
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prerequisites, setPrerequisites] = useState(false);
  const [syllabus, setSyllabus] = useState(false);

  const params = useParams();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://blackcoffer-alemeno.onrender.com/api/course/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleEnroll =()=>{
    dispacth(addToEnrrolled({...listing, progress:20, complete:false}))
    navigate('/profile')
  }
  console.log(listing);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            <SwiperSlide>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${listing.thumbnail}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          </Swiper>

          <div className="grid grid-cols-2">
            <div className="flex flex-col max-w-xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing?.name} - {""}
                {listing?.instructor}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <span className="  text-black  font-semibold">Schedule : </span>
                {listing?.schedule} location : {listing.location}
              </p>
              <p className="flex items-center mt-2 gap-2 text-slate-600  text-sm">
                <span className="  text-black  font-semibold">
                  Course Duration :{" "}
                </span>
                {listing?.duration}
              </p>

              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>
              <p className="text-slate-800">
                <span className="font-semibold text-black">
                  Enrollment Status -{" "}
                </span>
                {listing.enrollmentStatus}
              </p>

              {userInfo ? (
                <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3" onClick={handleEnroll}>
                  Enroll Now!
                </button>
              ) : (
                <Link to="/sign-in">
                  <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                    Enroll Now!
                  </button>
                </Link>
              )}
            </div>
            <div className="flex flex-col items-center bg-slate-50 p-3 my-7 gap-4">
              <h2 className="text-black text-2xl font-semibold flex items-center gap-5">
                Check What you will learn{" "}
                <FaChevronDown
                  className="cursor-pointer hover:bg-slate-300 "
                  onClick={() => setSyllabus(!syllabus)}
                />
              </h2>
              <div className="w-full h-full  p-5">
                {syllabus && (
                  <ul>
                    {listing?.syllabus.map((item, index) => (
                      <li key={index}>
                        <h3 className="text-sm font-semibold text-black">
                          {item.topic}
                        </h3>
                        <p className="text-xs ">{item.content}</p>
                        <div className="flex items-center">
                          <p className="text-sm font-semibold">Duration : </p>
                          <p className="text-xs">{item.week} Week</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <h2 className="text-black text-2xl font-semibold">
                Prerequisites of course
              </h2>
              <div className="w-full h-full  p-5">
                <ul className="px-5">
                  {listing?.prerequisites.map((item, index) => (
                    <li className=" list-decimal">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full p-5">
                <p>Enorrolled Students : {listing.students.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
