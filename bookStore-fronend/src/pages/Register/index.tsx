import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../apis/axios";

export interface Form {
  userName: string;
  password: string;
  name: string;
}

const Register = () => {
  const navigation = useNavigate();
  const [formInput, setFromInput] = useState<Form>({
    userName: "",
    password: "",
    name: "",
  });

  const onSubmitted = async () => {
  
    const res = await axios.post("/api/Auth/register", {
      ...formInput,
    });
    if (res.status == 200) {
      // console.log("Registered successfully");
      setFromInput({
        userName: "",
        password: "",
        name: "",
      });
      navigation("/registerSuccess");
    }
  };
  // console.log(formInput.profileUrl);

  return (
    <main className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5 mb-5">
      <h6 className="text-2xl font-bold text-center">Sign Up</h6>
      <label htmlFor="username" className="font-bold text-lg text-neutral-500">
        Username
      </label>
      <input
        className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
        type="text"
        name="username"
        id="username"
        placeholder="User Example"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, userName: e.target.value }));
        }}
      />
      <label htmlFor="password" className="font-bold text-lg text-neutral-500">
        Password
      </label>
      <input
        className="border-neutral-200 border-b-2 focus:outline-none focus:border-orange-500 my-2"
        type="text"
        name="password"
        id="password"
        placeholder="***************"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, password: e.target.value }));
        }}
      />
      <label htmlFor="fullName" className="font-bold text-lg text-neutral-500">
        Full Name
      </label>
      <input
        className="border-neutral-200 border-b-2 focus:outline-none focus:border-orange-500 my-2"
        type="text"
        name="fullName"
        id="fullName"
        placeholder="John Smith"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, name: e.target.value }));
        }}
      />
      <button
        onClick={() => {
          onSubmitted();
        }}
        type="button"
        className="mt-8 mb-5   bg-emerald-500 p-2 rounded-xl text-white hover:bg-emerald-400"
      >
        สมัครสมาชิก
      </button>
      <Link
        to={"/login"}
        className="text-end text-blue-500 hover:text-blue-300"
      >
        เข้าสู่ระบบ
      </Link>
      <p className="text-neutral-200 text-center">
        Create By Sekkarin Singhayoo 2023{" "}
      </p>
    </main>
  );
};

export default Register;
