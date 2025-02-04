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
  title: "Zimbabwe Civil Liberties and Drug Network (ZCLDN)",
  icons: {
    icon: '/favicon.ico', // /public path
  },
  description:
    "Zimbabwe Civil Liberties and Drug Network (ZCLDN) National Drug Observatory focuses on drug use research, policy advocacy, harm reduction, and community outreach. Stay informed with the latest news, research papers, and policy developments on drug use in Zimbabwe.",
  keywords: [
    "Zimbabwe",
    "Civil Liberties",
    "Drug Network",
    "National Drug Observatory",
    "ZCLDN",
    "drug use",
    "harm reduction",
    "policy advocacy",
    "HIV prevention",
    "drug policy",
    "substance abuse",
    "research",
    "community outreach",
    "mental health",
    "rehabilitation",
    "Hepatitis",
    "youth",
    "public health",
    "data analysis", "zcldn", "zcldn.org"
  ],
  authors: {name:"Zimbabwe Civil Liberties and Drug Network", url:"https://yourdomain.com"}, // Replace with your actual domain'
  // viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  
  twitter: {
    card: "summary_large_image",
    title: "Zimbabwe Civil Liberties and Drug Network National Drug Observatory - ZCLDN",
    description:
      "Zimbabwe Civil Liberties and Drug Network (ZCLDN) National Drug Observatory focuses on drug use research, policy advocacy, harm reduction, and community outreach.",
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
