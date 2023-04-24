import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import canin from "../assets/canin.png";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsCount, setResultsCount] = useState(0);

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

  useEffect(() => {
    setCurrentPage(1);
    setDogs([]); // agregar esta línea para limpiar el estado de los perros al realizar una nueva búsqueda
  }, [searched]);

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();
      setDogs(data);
      setSearched(true);
      setResultsCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    searchForDog();
  };

  return (
    <>
      {dogs.length === 0 && (
        <h1 className="text-center font-bold text-xl "></h1>
      )}

      {!dogs ? (
        <div>
          <h1 className="text-center font-bold text-xl ">SIN RESULTADOS</h1>{" "}
        </div>
      ) : (
        <>
          <div className="flex ">
            <section className="w-full">
              <div className="text-center">
                <div href="/" className="cursor-pointer">
                  <h1
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center text-white  text-3xl  py-6 mb-6  font-bold lg:text-5xl"
                  >
                    WOOF!
                    <span>
                      <FontAwesomeIcon
                        icon={faPaw}
                        className="text-black ml-6 text-5xl"
                      />
                    </span>
                  </h1>
                </div>

                <form onSubmit={HandleSubmit} className="mx-auto max-w-xl">
                  <label className="relative flex justify-end">
                    <input
                      autoComplete="off"
                      className="w-80 mx-auto rounded-md shadow-md py-2 pl-10 bg-black text-white mb-12 "
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search for a dog / breed"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="absolute top-2 right-2 text-white text-2xl pr-6"
                    />
                  </label>
                </form>
              </div>

              <img
                src={canin}
                alt="portada de pagina"
                id="canin"
                className="flex justify-center items-center mx-auto "
              />

              {!searched ? (
                dogs.map((dog) => (
                  <Link to={`/${dog.name}`} key={dog.id}>
                    {/* // sin imagenes en el home */}

                    <article>
                      {searched && (
                        <div>
                          <img
                            src={dog.image.url}
                            alt={dog.name}
                            loading="lazy"
                            className="rounded-lg md:h-52 md:w-full object-scale-down py-4 "
                          />

                          <h3 className="my-2 text-center font-bold text-lg">
                            {dog.name}{" "}
                          </h3>
                          <p className="bg-slate-600 text-center text-white py-4">
                            Bred For: {dog.bred_for}
                          </p>
                        </div>
                      )}
                    </article>
                  </Link>
                ))
              ) : (
                <div>
                  {resultsCount > 0 ? (
                    <h1>Se encontraron {resultsCount} resultados:</h1>
                  ) : (
                    <h1>Sin resultados</h1>
                  )}
                  <Link
                  >
                    <div className="grid grid-cols-3">
                      {/* sera aca? */}
                      {dogs.map((dog) => (
                        <div key={dog.id} to={`/${dog.name}`}>
                          <article className="bg-black gap-4 m-6 p-6 rounded-md hover:bg-white hover:scale-105  transition-all duration-200">
                            
                            <img
                              src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                              alt={dog.name}
                              className="rounded md:h-72 w-full object-cover"
                            />
                            <div className="bg-slate-600 p-6">
                              <h3 className="text-white text-lg font-bold mt-4 hover:text-orange-500">
                                {dog.name}
                              </h3>
                              <p className="text-slate-400 hover:text-orange-500">
                                Bred For: {dog.bred_for}
                              </p>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </Link>
                  )
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
