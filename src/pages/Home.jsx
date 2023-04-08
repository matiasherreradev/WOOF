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
    };
    setSearched(false);
    fetchDogData();
  }, []);

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
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
        <h1 className="flex items-center justify-center text-white text-center text-3xl px-5 h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section>
            <div className="text-center">
              <h1 className="flex items-center justify-center text-white text-center text-3xl px-6 py-6 font-bold lg:text-5xl">
                WOOF!
              </h1>
            

              {/*BUSQUEDA DE RAZAS DE PERRO*/}

              <form onSubmit={HandleSubmit} className="mx-auto max-w-xl my-12">
                <input
                  autoComplete="off"
                  className="w-full rounded-md shadow-md px-4 py-2 text-  bg-black text-white"
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
                    className="bg-slate-300 p-2 rounded-lg hover:bg-white transition-all duration-200"
                  >
                    {/* IMAGENES DE PERRO (tarjetas)*/}

                    <article>
                      <img
                        src={dog.image.url}
                        alt={dog.name}
                        loading="lazy"
                        className="rounded-lg md:h-72 md:w-full object-scale-down py-4 "
                      />
                      <h3 className="my-2 text-center font-bold text-lg">
                        {dog.name}{" "}
                      </h3>
                      <p className="bg-slate-600 text-center text-white py-4">
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
                      className="bg-slate-300 p-2 rounded-lg hover:bg-black transition-all duration-200"
                    >
                      {/* IMAGENES DE PERRO */}

                      <article>
                        <img
                          className="rounded-lg md:h-72 md:w-full object-cover"
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
                <p className="my-6 text-slate-500 flex items-center justify-center ">
                This app is powered by{" "}
                <a
                  className="text-indigo-700 underline active:text-orange-500 "
                  href="https://thedogapi.com"
                >
                  The dog API
                </a>
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
