"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pwd from "../assets/pwd.png";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", 
    confirmPassword: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  

  // Function to update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      // Handle the case where not all fields are filled
      // console.log("Please fill in all fields");
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

   

    try{
      const response = await axios.post('/api/register', formData);
      // console.log(response);
      if(response.status === 200 || response.status === 201){
        // console.log("success");
        toast.success("Registration Successful");
        router.push("/login");
      }
      else{
        // console.log("something went wrong");
        toast.error("Something went wrong");
      }
    }
    catch(err){
      console.error(err.message);
    }

  };

  return (
    <>
      <div className="mx-auto h-screen overflow-hidden flex min-h-dvh w-full min-w-[320px] flex-col relative">
        <main className="flex max-w-full flex-auto flex-col relative z-50">
          <div className="flex min-h-dvh flex-col">
            <section className="flex max-w-xl grow flex-col bg-white px-5 py-10 sm:px-20 sm:py-16">
              <div className="flex grow ">
                <div className="grow space-y-10">
                  <header>
                    <h1 className="mb-2 inline-flex items-center space-x-2 text-4xl font-bold text-rose-400">
                      <Link href="/">
                        <div> TweetX</div>
                      </Link>
                    </h1>
                    <h3 className="my-10">
                      <Link href="/login">
                        <div className="text-sm font-bold text-gray-600 border border-gray-500 px-16 py-3 rounded-xl w-fit">
                          Login
                        </div>
                      </Link>
                    </h3>
                  </header>

                  <form className="space-y-6">
                    <h2 className="text-4xl font-medium text-gray-500 my-16">
                      Create Account
                    </h2>

                    <div className="space-y-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`justify-end flex w-fit items-center space-x-2 rounded-lg border px-6 py-3 font-semibold leading-6 bg-rose-400 text-white ${
                          loading ? "animate-pulse" : ""
                        }`}
                      >
                        Signup
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Image src={Pwd} className="absolute top-20 right-0" alt="" />
      </div>
    </>
  );
}
