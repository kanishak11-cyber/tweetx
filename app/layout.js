
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import Provider from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Tweetx",
  description: "connect with friends and the world around you on Tweetx.",
};

export default function RootLayout({ children}) {
 
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


