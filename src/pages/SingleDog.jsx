import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function SingleDog() {
  const [dog, setDog] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        );
        const data = await res.json();
        setDog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleDogData();
  }, [name]);

  return (


    <>
    
      <section className="  text-white max-w-5xl  flex items-center justify-center 2xl:h-screen mx-auto z-10">
        {dog.map((item) => (
          <div
          
            key={item.id}
            className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center md:items-center md:justify-center md:my-60
           "
          >



            <article className="grid items-center justify-center  ">
              <img className="shadow-2xl rounded-md "
                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                alt={item.name}
              />
            </article>
            <article className="flex flex-col gap-4 items-center">

              <h1 className="underline  text-2xl font-bold  md:text-3xl text-white lg:text-4xl mb-2 ">
                {item.name}
              </h1>
              {item.description && (
                <p className="text-black mb-2 text-sm lg:text-base leading-relaxed ">
                  {item.description}
                </p>
              )}
              <h3 className="text-slate-800 text-2xl ">Info:</h3>
              <ul className="text-sm leading-loose mb-2 ">
                <li>
                  <span className=" text-slate-800">Bred for: </span> {item.bred_for}
                </li>
                <li>
                  <span className=" text-slate-800"> Height:</span>{" "}
                  {item.height.metric} cm
                </li>
                <li>
                  <span className=" text-slate-800">Weight: </span>
                  {item.weight.metric} kgs
                </li>
                <li>
                  <span className=" text-slate-800">Breed Group:</span>{" "}
                  {item.breed_group}
                </li>
                <li>
                  <span className=" text-slate-800">Lifespan:</span> {item.life_span}
                </li>
                <li>
                  <span className=" text-slate-800">Temperament:</span>{" "}
                  {item.temperament}
                </li>
              </ul>

              <Link
                to="/"
                className="text-center  rounded-full bg-black text-white max-w-xs mx-auto px-4 py-2     "
              >
                {" "}
                &larr; Back to Home
              </Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
