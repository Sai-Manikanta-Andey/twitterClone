import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
const queryClient=useQueryClient()
  const {
    isPending,
    data,
    mutate: loginMutation,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log(res);

        if (!res.ok) throw new Error(data.error || "Failed to login");

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Login success");
      //REFECTCH THE USER
      queryClient.invalidateQueries({queryKey:["authUser"]})
      
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen max-w-screen-xl mx-auto">
      <div className="items-center justify-center flex-1 hidden lg:flex">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="flex items-center gap-2 rounded input input-bordered">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="flex items-center gap-2 rounded input input-bordered">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="text-white rounded-full btn btn-primary">
            {isPending ? "Loading..." : "Login"}
          </button>
          {/* {isError && <p className="text-red-500">Something went wrong</p>} */}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-lg text-white">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="w-full text-white rounded-full btn btn-primary btn-outline">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
