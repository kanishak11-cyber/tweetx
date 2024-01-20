"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pwd from "../assets/pwd.png";
import Image from "next/image";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/feed");
    }
  }, [session, router, status]);
  // Function to update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      // Handle the case where not all fields are filled
      console.log("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: formData?.email,
        password: formData?.password,
      });
      console.log(response);
      if (response?.status === 200 || response?.status === 201) {
        console.log("success");
        alert("Login Successful");
        router.push("/feed");
      } else {
        console.log("something went wrong");
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err.message);
    }

    setLoading(false);


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
                      <Link href="/signup">
                        <div className="text-sm font-bold text-gray-600 border border-gray-500 px-16 py-3 rounded-xl w-fit">
                          Create Account
                        </div>
                      </Link>
                    </h3>
                  </header>

                  <form className="space-y-6">
                    <h2 className="text-4xl font-medium text-gray-500 my-16">
                      Login
                    </h2>

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
                      <div className="flex items-center w-full rounded-lg bg-gray-100/55 leading-6 placeholder-gray-400">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400"
                        />
                        {showPassword ? (
                          <FaRegEyeSlash
                            onClick={() => setShowPassword(false)}
                            className="text-gray-500 mr-5"
                          />
                        ) : (
                          <FaRegEye
                            onClick={() => setShowPassword(true)}
                            className="text-gray-500 mr-5"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mx-2">
                      <div>
                        <Link href="#" className="text-gray-600 font-semibold">
                          Forget Password?
                        </Link>
                      </div>
                      <div>
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          disabled={loading}
                          className={`justify-end flex w-fit items-center space-x-2 rounded-lg border px-6 py-3 font-semibold leading-6 bg-rose-400 text-white ${
                            loading ? "animate-pulse" : ""
                          }`}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Image src={Pwd} className="absolute top-20  right-0 " alt="" />
      </div>
    </>
  );
}
