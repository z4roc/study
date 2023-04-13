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
    <div className="flex h-screen flex-col font-poppins text-white">
      <Navbar />
      <Toaster />
      <main className="flex h-full flex-auto w-full">
        <Navmenu />
        <div className="bg-content p-10 w-full">
          <h1 className="text-4xl font-bold p-2">Über diese Seite 💬</h1>
          <p className=" p-2 text-lg">
            Hier trage ich alle Themen zusammen die für die jeglichen
            Abschlussprüfungen relevant sind.
          </p>
          <h1 className="text-4xl font-bold p-2 mt-12">🚀 Umsetzung</h1>
          <p className="w-3/4 p-2 text-lg">
            Die Seite wurde mit{" "}
            <a href="https://nextjs.org" className="font-semibold">
              NextJS
            </a>{" "}
            erstellt und wird auf{" "}
            <a href="https://vercel.com" className="font-semibold">
              Vercel
            </a>{" "}
            gehosted. Als Datenbank für die Themen wird Firestore genutzt, die
            einzelnen Themen werden als Markdown gespeichert und durch das
            Package React-Markdown gerendert.
          </p>
        </div>
      </main>
    </div>
  );
}
