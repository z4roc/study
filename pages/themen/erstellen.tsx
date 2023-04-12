import React from "react";

import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import ImageUpload from "@/components/ImageUpload";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export default function Erstellen() {
  const { watch, register, handleSubmit, reset, formState } = useForm({
    mode: "onChange",
  });

  const erstelleThema = async (e: any) => {
    e.preventDefault();

    const name = e.target[0].value;
    const bereich = e.target[1].value;
    const zeitraum = e.target[2].value;
    const content = e.target[3].value;
    const docRef = collection(firestore, `themen`);
    await addDoc(docRef, {
      bereich: bereich,
      zeitraum: zeitraum,
      inhalt: content,
      name: name,
    });
  };

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
