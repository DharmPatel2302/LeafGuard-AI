// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Link from "next/link";
// import "./globals.css";
// import { Navbar } from "@/components/ui/Navbar";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "LeafScan - Clinical Botanist Diagnosis",
//   description: "Detect Plant Diseases Instantly",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${inter.variable} h-full antialiased`}
//     >
//       <head>
//         <link 
//           href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" 
//           rel="stylesheet" 
//         />
//       </head>
//       <body className="min-h-full flex flex-col font-inter selection:bg-primary-fixed selection:text-on-primary-fixed">
//         <Navbar />
        
//         {children}

//         <footer className="w-full mt-auto py-12 px-8 bg-stone-100 dark:bg-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone-200 dark:border-stone-800">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <div className="text-green-800 dark:text-green-400 font-bold tracking-tighter">LeafScan Clinical Botanist</div>
//             <p className="text-stone-500 dark:text-stone-500 text-xs font-medium uppercase tracking-widest Inter">
//               © 2026 LeafScan Clinical Botanist. All rights reserved.
//             </p>
//           </div>
//           <div className="flex gap-8 text-xs font-medium uppercase tracking-widest Inter">
//             <a className="text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition-opacity" href="#">Privacy Policy</a>
//             <a className="text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition-opacity" href="#">Terms of Service</a>
//             <a className="text-green-800 dark:text-green-400 underline transition-opacity" href="#">Contact Science Team</a>
//           </div>
//         </footer>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeafScan - Clinical Botanist Diagnosis",
  description: "Detect Plant Diseases Instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen flex flex-col font-inter selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
        <Navbar />
        
        {children}

        <footer className="w-full mt-auto py-6 px-8 bg-stone-100 dark:bg-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-green-800 dark:text-green-400 font-bold tracking-tighter">LeafScan Clinical Botanist</div>
            <p className="text-stone-500 dark:text-stone-500 text-xs font-medium uppercase tracking-widest">
              © 2026 LeafScan Clinical Botanist. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-xs font-medium uppercase tracking-widest">
            <a className="text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition-opacity" href="#">Privacy Policy</a>
            <a className="text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition-opacity" href="#">Terms of Service</a>
            <a className="text-green-800 dark:text-green-400 underline transition-opacity" href="#">Contact Science Team</a>
          </div>
        </footer>
      </body>
    </html>
  );
}