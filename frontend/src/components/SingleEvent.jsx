import { useLocation, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
const SingleEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event || {};

  return (
    <div className="w-[60%] mx-auto mt-8 p-6 bg-white rounded-md shadow-md my-24">
      <svg
        onClick={() => {
          navigate(-1);
        }}
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {event ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center poppins-bold">
            {event.name}
          </h2>
          <p className="text-gray-600 mb-2 text-lg font-semibold leading-loose tracking-wider">
            {event.description}
          </p>
          <p className="text-gray-500 mb-2 flex items-center poppins-bold text-md leading-4 tracking-wide">
            <span className="mr-1">
              <UserIcon className="h-5 w-5" />
            </span>
            Organiser:
            {" " + event.author.name}
          </p>
          <p className="text-gray-600 mb-2 poppins-bold">
            Date: {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <img
            src={
              event.image ||
              "https://aestheticsforbirds.com/wp-content/uploads/2022/09/image-not-available.png"
            }
            alt={event.name}
            className="rounded-md mb-4"
          />
        </>
      ) : (
        <p className="text-center">Loading event...</p>
      )}
    </div>
  );
};

export default SingleEvent;
