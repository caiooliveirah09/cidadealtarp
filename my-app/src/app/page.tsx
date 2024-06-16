"use client";
import Emblem from "@/components/molecules/emblem";
import { TEmblem } from "@/types/emblem.type";
import { useEffect, useState } from "react";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [emblems, setEmblems] = useState<TEmblem[]>();

  const updateEmblems = () => {
    api.get("/emblem").then((response) => {
      setEmblems(response.data);
    });
  }

  const getRandomEmblem = (event: React.FormEvent) => {
    event.preventDefault();
    api.post("/emblem").then((response) => {
      updateEmblems();
    }).catch((error) => {
      alert('Error')
    }
    );
  }

  useEffect(() => {
    updateEmblems();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-8 w-full">
      <form onSubmit={getRandomEmblem} className={`pb-16 pt-10 ${emblems?.length === 0 ? "h-screen flex justify-center items-center" : ""}`}>
        <button type="submit" className="rounded-full w-36 h-36 bg-slate-700 shadow-lg hover:scale-150 duration-300 "><FontAwesomeIcon icon={faGift} size="5x"/></button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 w-full px-2">
      {emblems?.map((emblem) => (
        <Emblem {...emblem} key={emblem.id} />
      ))}
      </div>
    </main>
  );
}
