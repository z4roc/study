import ImageUpload from "@/components/ImageUpload";
import { firestore } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

export default function Thema() {
  const router = useRouter();

  const { thema } = router.query;

  const docRef = doc(firestore, `themen/${thema}`);
  const [data] = useDocument(docRef);

  const updateThema = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const bereich = e.target[1].value;
    const zeitraum = e.target[2].value;
    const content = e.target[3].value;

    await setDoc(docRef, {
      bereich: bereich,
      zeitraum: zeitraum,
      inhalt: content,
      name: name,
    });
  };

  console.log(data?.data()?.inhalt);

  return (
    <div className="h-screen" onSubmit={updateThema}>
      <form className="ml-80 p-32">
        <input
          type="text"
          className="p-2 bg-slate-200 rounded-md m-2"
          placeholder="Name"
          value={data?.data()?.name}
        />
        <div className="">
          <select
            placeholder="Gebiet"
            className="p-2 bg-slate-200 rounded-md m-2"
            value={data?.data()?.bereich}
          >
            <option>BWL</option>
            <option>Projektmanagement</option>
            <option>Anwendungsentwicklung</option>
            <option>Netzwerke</option>
            <option>Hardware</option>
          </select>
          <select
            className="p-2 bg-slate-200 rounded-md m-2"
            value={data?.data()?.zeitraum}
          >
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
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
}
