import React from "react";
import { useState, useEffect } from "react";


export default function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        const data = await res.json();
        setDogs(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDogData();
  }, []);

  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-sky-700 text-center text-3xl px-5 h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-6xl mx-auto">
           <img className="h-24 w-24"   src="http://127.0.0.1:5500/src/svg/dog-training.svg" alt="My SVG" /> 
                    <h1 className="flex items-center justify-center text-amber-700 text-center text-3xl px-5 h-screen font-bold ">
          firulApp
        </h1>
          </section>
        </>
      )}
    </>
  );
}
