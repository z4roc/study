import ImageUpload from "@/components/ImageUpload";
import { firestore } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

export default function Thema() {
  const router = useRouter();

  const { thema } = router.query;

  const docRef = doc(firestore, `themen/${thema}`);
  const [data] = useDocument(docRef);

  const erstelleThema = async () => {};

  console.log(data?.data()?.inhalt);

  return (
    <div className="h-screen" onSubmit={erstelleThema}>
      <form className="ml-80 p-32">
        <input
          type="text"
          className="p-2 bg-slate-200 rounded-md m-2"
          placeholder="Name"
        />
        <div className="">
          <select
            placeholder="Gebiet"
            className="p-2 bg-slate-200 rounded-md m-2"
          >
            <option>BWL</option>
            <option>Projektmanagement</option>
            <option>Anwendungsentwicklung</option>
            <option>Netzwerke</option>
            <option>Hardware</option>
          </select>
          <select className="p-2 bg-slate-200 rounded-md m-2">
            <option>Abschlussprüfung Teil 1</option>
            <option>Abschlussprüfung Teil 2</option>
          </select>
          <br />
          <textarea
            name="content"
            className="h-96 w-3/4 bg-slate-200 rounded-md p-2 outline-none"
            defaultValue={data?.data()?.inhalt}
          ></textarea>
          <ImageUpload />
          <button className="bg-blue-600 text-white p-4 hover:bg-blue-400 rounded-md">
            Erstellen
          </button>
        </div>
      </form>
    </div>
  );
}
