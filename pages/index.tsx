import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import Navmenu, { Navbar } from "@/components/Navmenu";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <Toaster />
      <main className="flex h-full flex-auto w-full">
        <Navmenu />
        <div>Content</div>
      </main>
    </div>
  );
}
