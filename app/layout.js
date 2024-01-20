
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import Provider from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";


export const metadata = {
  title: "Tweetx",
  description: "connect with friends and the world around you on Tweetx.",
};

export default function RootLayout({ children, session }) {
  console.log("session", session)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          
        
        {children}
        <ToastContainer />
        </Provider>
        </body>
    </html>
  );
}

export const getSession = async ({ req }) => {
  console.log("session", req)
  return {
    
    session: await getSession({ req }),
  };
}