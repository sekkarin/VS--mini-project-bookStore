import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

interface User {
  id?: string;
  name: string;
  userName: string;
  password?:string;

}
type ModeType = "new" | "update";
const Users = () => {
  const navigation = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [books, setBooks] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    userName: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [updateUser, setUpdateUser] = useState<User>({
    id: "",
    name: "",
    userName: "",
  });

  useEffect(() => {
    (async () => {
      const res = await axiosPrivate(`/api/User`);
      setBooks(res.data);
    })();
  }, [refresh]);

  const openModal = (type?: ModeType) => {
    setShowModal(!false);
    if (type == "new") {
      setType(type);
    } else if (type == "update") {
      setType(type);
    }
  };

  const onFinish = () => {
    bookHandler();
  };
  const clearNewUser = () => {
    setNewUser({
      id: "",
      name: "",
      userName: "",
    });
  };
  const bookHandler = async () => {
    console.log(updateUser);
    
    try {
      const res = await axiosPrivate.put(
        `/api/User/${updateUser.id}`,
        updateUser
      );
      if (res.status === 200) {
        setUpdateUser({
          id: "",
          name: "",
          userName: "",
        });
      }

      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };
  const deleteUser = async (id: string) => {
    try {
      await axiosPrivate.delete(`/api/User/${id}`);

      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    } finally {
      // setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <nav>
          <div className="flex justify-between items-center p-4 bg-white">
            <div
              className="flex items-center"
              onClick={() => {
                navigation(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 hidden"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-medium  underline underline-offset-4 decoration-pink-500">
              User
            </h1>
            <div className="flex items-center space-x-2">
              <h1>Admin</h1>
            </div>
          </div>
        </nav>
        <div>
          <div className="p-4">
            <div className="bg-white p-4 rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">
                  All Books
                </h2>
                <div>
                  <div>
                    <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                      <div>
                        <span>ID</span>
                      </div>
                      <div>
                        <span>Name</span>
                      </div>
                      <div>
                        <span>Username</span>
                      </div>
                      <div>
                        <span>จัดการ</span>
                      </div>
                    </div>
                    <div>
                      {books.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between border-t text-sm font-normal mt-4 space-x-1"
                        >
                          <div className="">
                            <span>{item.id}</span>
                          </div>
                          <div className="">
                            <span>{item.name}</span>
                          </div>
                          <div>
                            <span>{item.userName}</span>
                          </div>
                          <div className="px-3">
                            <select
                              onChange={(e) => {
                                const type = e.target.value;
                                if (type === "update") {
                                  setUpdateUser(item);
                                  openModal("update");
                                } else if (type == "delete") {
                                  deleteUser(item.id!);
                                }
                              }}
                              defaultValue={"none"}
                            >
                              <option value={"none"}>....</option>
                              <option value={"update"}>แก้ใข</option>
                              <option value={"delete"}>ลบ</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {type === "new" ? "New Books" : "Update Books"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col ">
                  <label
                    htmlFor="nameBook"
                    className="font-bold text-lg text-neutral-500"
                  >
                    Name
                  </label>
                  <input
                    className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
                    type="text"
                    name="name"
                    id="name"
                    value={type == "update" ? updateUser.name : newUser.name}
                    placeholder="User Example"
                    onChange={(e) => {
                      type == "update"
                        ? setUpdateUser((value) => ({
                            ...value,
                            name: e.target.value,
                          }))
                        : setNewUser((value) => ({
                            ...value,
                            name: e.target.value,
                          }));
                    }}
                  />

                  <label
                    htmlFor="userName"
                    className="font-bold text-lg text-neutral-500"
                  >
                    User Name
                  </label>
                  <input
                    className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
                    type="text"
                    name="author"
                    id="author"
                    value={
                      type == "update" ? updateUser.userName : newUser.userName
                    }
                    placeholder="Author Example"
                    onChange={(e) => {
                      type == "update"
                        ? setUpdateUser((value) => ({
                            ...value,
                            author: e.target.value,
                          }))
                        : setNewUser((value) => ({
                            ...value,
                            author: e.target.value,
                          }));
                    }}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      clearNewUser();
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      onFinish();
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Users;
