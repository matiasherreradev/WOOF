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
      <section className="max-w-5xl mx-auto ">
        {dog.map((item) => (
          <div key={item.id}>
            <article>
              <img src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`} alt=""/>
            </article>
            <article>
              <h1>{item.name}</h1>
        {item.description && <p>{item.description}</p>}
      
        <ul>
          <li>Bred for: {item.bred_for}</li>
          <li>Height: {item.height.metric} cm</li>
          <li>Weight: {item.weight.metric} kgs</li>
          <li>Breed Group: {item.breed_group}</li>
          <li>Lifespan: {item.life_span}</li>
          <li>Temperament: {item.temperament}</li>
        </ul>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
