import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        const data = await res.json();
        setDogs(data);
      } catch (error) {
        console.log(error);
      }
    }
    setSearched(false);
    fetchDogData();
  }, [])

  const searchForDog = async () => {
    try {
      const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${text}`);
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    searchForDog();
    setSearched(true);
  };

  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-sky-700 text-center text-3xl px-5 h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-2 max-w-8xl mx-auto overflow-y-scroll scroll-behavior-smooth">
            <div className="text-center">
              <h1 className="flex items-center justify-center text-amber-700 text-center text-3xl px-5  font-bold lg:text-5xl">
                firulApp
              </h1>
              <p className="my-6 text-slate-500">
                This app is powered by{" "}
                <a
                  className="text-indigo-700 underline active:text-orange-500"
                  href="https://thedogapi.com"
                >
                  The dog API
                </a>
              </p>

              {/*BUSQUEDA DE RAZAS DE PERRO*/}

              <form onSubmit={HandleSubmit} className="mx-auto max-w-xl my-12">
                <input
                  autoComplete="off"
                  className="w-full rounded-md shadow-md px-4 py-2 text-  bg-orange-200 text-amber-950"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for a dog / breed"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-20">
              {!searched ? (
                dogs.map((dog) => (
                  <Link
                    to={`/${dog.name}`}
                    key={dog.id}
                    className="bg-slate-300 p-2 rounded-lg hover:bg-red-400 transition-all duration-200"
                  >
                    {/* IMAGENES DE PERRO */}

                    <article>
                      <img
                        src={dog.image.url}
                        alt={dog.name}
                        loading="lazy"
                        className="rounded-lg md:h-72 md:w-full object-cover"
                      />
                      <h3 className="my-2 text-center font-bold text-lg">
                        {dog.name}{" "}
                      </h3>
                      <p className="bg-slate-600 text-center text-white py-2">
                        Bred For: {dog.bred_for}
                      </p>
                    </article>
                  </Link>
                ))
              ) : (
                <>
                  {dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-slate-300 p-2 rounded-lg hover:bg-red-400 transition-all duration-200"
                    >
                      {/* IMAGENES DE PERRO */}

                      <article>
                      <img className="rounded-lg md:h-72 md:w-full object-cover"
                src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                alt={dog.name}
              />
                        <h3 className="my-2 text-center font-bold text-lg">
                          {dog.name}{" "}
                        </h3>
                        <p className="bg-slate-600 text-center text-white py-2">
                          Bred For: {dog.bred_for}
                        </p>
                      </article>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
