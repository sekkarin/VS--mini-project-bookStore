import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// type Props = {};

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatcher = useAppDispatch();
  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.post("/auth/logout");
  };
  return (
    <section className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
      <br />
      <p className="text-3xl font-bold">You are login!🎉</p>
      <br />
      <Link to="/profile" className="text-blue-600 hover:text-blue-400">
        Go to the Profile
      </Link>
      <br />
      <Link to="/users" className="text-blue-600 hover:text-blue-400">
        Go to the User page
      </Link>
      <br />
      <Link to="/books" className="text-blue-600 hover:text-blue-400">
        Go to the books page
      </Link>
      <br />
      <Link to="/linkpage" className="text-blue-600 hover:text-blue-400">
        Go to the link page
      </Link>
      <br />
      <div className="flexGrow">
        <button
          onClick={signOut}
          className="mt-8 mb-5   bg-gray-200 p-2 rounded-xl text-gray-500 hover:bg-emerald-400 hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Home;
