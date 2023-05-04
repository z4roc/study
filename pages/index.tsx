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
    <div className="flex h-full md:h-screen flex-col w-full font-poppins bg-bgcontentlight dark:bg-content dark:text-white">
      <Navbar />
      <Toaster />
      <main className="flex h-full flex-auto flex-col md:flex-row w-full">
        <Navmenu />
        <div className="flex w-full h-full">
          <div className="h-min overflow-y-auto w-full">
            <div className="flex flex-col max-h-9/10">
              <div className="dark:bg-content bg-bgcontentlight p-10 flex flex-col h-full w-full">
                <h1 className="text-4xl font-bold p-2">💬 Über diese Seite</h1>
                <p className=" p-2 text-lg">
                  Hier trage ich alle Themen zusammen die für die jeglichen
                  Abschlussprüfungen relevant sind. Als Leitfaden dienen hierfür
                  die Lernfelder 1-6 bei der AP1 und die restlichen Lernfelder
                  bei der AP2.
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
                  gehosted. Als Datenbank für die Themen wird Firestore genutzt,
                  die einzelnen Themen werden als Markdown gespeichert und durch
                  das Package React-Markdown angezeigt.
                </p>
                <h1 className="text-4xl font-bold p-2 mt-12">🧠 Ursprung</h1>
                <p className="w-3/4 p-2 text-lg">
                  Als Vorlage für diese Seite diente eine bereits existierende
                  Seite zur Vorbereitung auf die Abschlussprüfung, doch durch
                  den neuen Lehrplan in Baden-Württemberg fehlten sehr viele
                  Themen woraus bei meiner eigenen Vorbereitung auf die AP1
                  schließlich dieses Projekt entstand.
                </p>
                <h1 className="text-4xl font-bold p-2 mt-12">
                  🧾 Themen erstellen
                </h1>
                <p className="w-3/4 p-2 text-lg">
                  Wer Beiträge und Themen verfassen möchte, kann diese gerne
                  unter{" "}
                  <Link className="text-blue-300" href={`/bearbeiten/neu`}>
                    diesem Link
                  </Link>{" "}
                  anlegen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
