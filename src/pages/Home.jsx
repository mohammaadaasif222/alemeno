import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, selectAllCourses, selectCoursesStatus } from '../redux/course/courseSlice';

const ListingItem = React.lazy(() => import("../components/ListingItem"));

export default function Home() {
  const dispatch = useDispatch();
  const Listings = useSelector(selectAllCourses);
  const status = useSelector(selectCoursesStatus);

  SwiperCore.use([Navigation]);
  console.log(Listings);
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {Listings && Listings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Top courses
              </h2>
            </div>
            <div
              className="flex flex-wrap gap-4 "
              style={{ overflow: "auto", maxHeight: "400px" }}
            >
              {Listings.map((listing) => (
                <Suspense key={listing._id} fallback={<Spinner />}>
                  <ListingItem listing={listing} key={listing._id} />
                </Suspense>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
