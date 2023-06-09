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
        <div></div>
      ) : (
        <>
          <div>
            <section className="w-10/12 mx-auto">
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

                <form onSubmit={HandleSubmit}>
                  <label className="relative   rounded-full  py-2 pl-4 bg-black text-white mb-6  w-80 mx-auto grid justify-items-starttext-center">
                    <input
                      autoComplete="off"
                      className="bg-black rounded-full pr-24"
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search for a dog / breed"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  <FontAwesomeIcon
  icon={faMagnifyingGlass}
  className="absolute top-2 right-2 text-orange-600 text-2xl pr-6"
  onClick={HandleSubmit}
/>

                  </label>
                </form>
              </div>
              <p className="w-3/4 sm:w-4/5 text-sm mx-auto opacity-50 text-center">
                * Las busquedas de razas deben realizarse en ingles!
              </p>

              <img
                src={canin}
                alt="portada de pagina"
                id="canin"
                className="flex justify-center items-center mx-auto mb-4 "
              />

              {/* <p className="w-3/4  text-justify mx-auto font-sans-Dancing text-4xl leading-relaxed">Dogs are known for their unconditional love and loyalty towards their owners. Their genuine love can be seen in the way they wag their tails, jump with joy, and snuggle up close..</p> */}
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
                    <h1 className="text-center  rounded-full bg-green-600 text-white max-w-xs mx-auto px-4 py-2  mb-10    ">
                      Se encontraron {resultsCount} resultados:
                    </h1>
                  ) : (
                    <h1 className="text-center rounded-full bg-red-700 drop-shadow-2xl text-white max-w-xs mx-auto px-4 py-2      ">
                      Sin resultados
                    </h1>
                  )}

                  <div className="grid  md:grid-cols-2  mx-auto sm:grid-cols-2 lg:grid-cols-4 ">
                  
                    {dogs.map((dog) => (
                      <Link key={dog.id} to={`/${dog.name}`}>
                        <div>
                        <div id="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                          
                          <article className="bg-black  m-4 p-4 rounded-md hover:bg-white hover:scale-105  transition-all duration-200 ">
                            <img
                              src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                              alt={dog.name}
                              className="rounded md:h-60 w-full object-cover"
                            />
                            <div className="bg-slate-600 p-4 h-40 overflow-hidden">
                              <h3 className="text-white text-lg font-bold mt-4 hover:text-orange-500">
                                {dog.name}
                              </h3>
                              <p className="text-slate-400 hover:text-orange-500">
                                Bred For: {dog.bred_for}
                              </p>
                            </div>
                          </article>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
