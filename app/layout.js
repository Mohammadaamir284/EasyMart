import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast';
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EasyMart - Shop Smart, Live Better | Best Online Shopping Destination",
  description: "EasyMart par paaiye fashion, electronics, groceries aur bohot kuch – sab kuch ek hi jagah par. Fast delivery, best prices aur quality assurance ke saath shopping ka naya experience!",
   icons: {
    icon: "/shopping.png", // This points to public/favicon.ico
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
           <Toaster position="top-center" reverseOrder={false} />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
