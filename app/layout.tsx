import "./globals.css";

import { Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Icon from '../public/favicon.ico'
import Head from "next/head";

const Body = dynamic(() => import("./Body"), {
  ssr: false, // This component will only be rendered on the client-side
});



import { Inter } from "next/font/google";
import Footer from "./Footer";
import NavBar from "./Components/NavBar";
import { url } from "inspector";

const inter = Inter({ subsets: ["latin"] });

// if (process.env.NODE_ENV === 'production') {
//   console.log = function () {}; // Disable console.log in production
// }


export const metadata: Metadata = {
  title: "Women Health Issues Trust Zimbabwe (WHIZ) - SRHR & Harm Reduction Observatory",
  icons: {
    icon: '/favicon.ico', // /public path
  },
  description:
    "Women Health Issues Trust Zimbabwe (WHIZ) SRHR & Harm Reduction Observatory focuses on sexual and reproductive health and rights (SRHR), gender equity, drug policy reform, and harm reduction. Explore data-driven insights, policy advocacy, and community engagement for a healthier Zimbabwe.",
  keywords: [
    "Zimbabwe",
    "Women Health Issues Trust",
    "WHIZ",
    "SRHR",
    "Sexual and Reproductive Health",
    "Gender-Based Violence",
    "Harm Reduction",
    "Drug Policy Reform",
    "Public Health",
    "HIV Prevention",
    "Reproductive Rights",
    "Community Outreach",
    "Policy Advocacy",
    "Data Analysis",
    "Health Equity",
    "Human Rights",
  ],
  authors: {name: "Women Health Issues Trust Zimbabwe", url: "https://yourdomain.com"}, // Replace with actual domain
  robots: "index, follow",
  
  twitter: {
    card: "summary_large_image",
    title: "WHIZ - SRHR & Harm Reduction Observatory",
    description:
      "WHIZ is dedicated to advancing sexual and reproductive health rights, gender equality, and drug policy reform in Zimbabwe through data-driven advocacy and collaboration.",
    // Replace with a relevant image URL for social sharing
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <meta name="google-site-verification" content="0IqFhTrG4KsniGru8mD7N2zvhnTSbK7EzMQ87bP9sT0" />
      
      <body className={`${inter.className}  bg-[#222222] pb-5`}>
        
        <Body>
        <ChakraProvider>
          <NavBar />
        </ChakraProvider>
          <div className="">{children}</div>
        </Body>
      </body>
    </html>
  );
}
