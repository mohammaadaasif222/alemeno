import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaGasPump, FaCar } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg  sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing?.thumbnail ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing?.name}
          </p>
        
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-600 font-semibold ">Time:</p>
            <p className="text-sm text-gray-600 truncate w-full">
              {listing?.schedule}
            </p>
          </div>
          <p className="text-slate-500 mt-2 font-semibold ">
            Instructor : {listing?.instructor}
          </p>
        </div>
      </Link>
    </div>
  );
}
