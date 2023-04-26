Vamos con ese proyecto, cuando cueste a no decaer y levantar la cabeza!

https://github.com/matiasherreradev/WOOF.git

https://642e575685e1605b22b2fa2d--deperros.netlify.app/







---hacer una ola tipo havana cacao

---darle estilos y hacerlo responsive




 <>
      {!dogs ? (
    //    <h1 className="flex items-center justify-center text-white text-center text-3xl px-5 h-screen font-bold uppercase">
    //      Loading...
    //    </h1>




      ) : (
        <>
          <div className="flex">
            <section className="w-4/5">
              <div className="text-center">
                <div href="/" className="cursor-pointer">
                  <h1
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center text-white  text-3xl  py-6 font-bold lg:text-5xl"
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

                {/*BUSQUEDA DE RAZAS DE PERRO*/}

                <form onSubmit={HandleSubmit} className="mx-auto max-w-xl my-6">
                  <input
                    autoComplete="off"
                    className="w-3/4  rounded-md shadow-md px-4 py-2  bg-black text-white"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search for a dog / breed"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </form>
              </div>
              <h3 className="text-black opacity-50 mb-6 ml-6">
                *Some breed images as a sample.
              </h3>

              <img
                src={canin}
                alt="portada de pagina"
                id="canin"
                className="flex justify-center items-center mx-auto mb-20  object-cover "
              />

              <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 mx-6 ">
                <h1>No se encontraron resultados!</h1>
                {!searched ? (
                  currentDogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-white p-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      {/* IMAGENES DE PERRO (tarjetas) */}

                      <article>
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
                      </article>
                    </Link>
                  ))
                ) : (
                  <>
                    
                    {dogs.map((dog) => (
                      <Link
                        to={`/${dog.name}`}
                        key={dog.id}
                        className="bg-white p-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        {/* busqueda de razas realizada*/}
                        <article>
                          <img
                            className="rounded-lg md:h-52 md:w-full object-cover"
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
                <p className="my-6 grid justify-start text-slate-500  ">
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
            <section className=" flex items-center justify-end h-screen  md:pr-1 pr-6 text-2xl bg-blue-500  w-1/5">
              <ul className="mt-52">
                <li class="bg-gray-100 py-2">Razas</li>
                <li class="bg-gray-100 py-2">Favoritos</li>
                <li class="bg-indigo-600 py-2">Por Clima</li>
                <li class="bg-gray-100 py-2">Por tamano</li>
                <li class="bg-gray-100 py-2">Edades</li>
              </ul>
            </section>
          </div>
        </>
      )}
    </>


      <section className=" flex items-center justify-end h-screen  md:pr-1 pr-6 text-2xl bg-blue-500  w-1/5">
              <ul className="mt-52">
                <li class="bg-gray-100 py-2">Razas</li>
                <li class="bg-gray-100 py-2">Favoritos</li>
                <li class="bg-indigo-600 py-2">Por Clima</li>
                <li class="bg-gray-100 py-2">Por tamano</li>
                <li class="bg-gray-100 py-2">Edades</li>
              </ul>
            </section>




Ultimos retoques!
