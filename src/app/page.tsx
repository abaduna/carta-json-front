"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import ComponetFood from "../componets/ComponetFood";
import { useFetch } from "@/hock/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faBan } from "@fortawesome/free-solid-svg-icons";
import { faBottleWater } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonHome } from "@/componets/SkeletonHome";
import { projects } from "./../config/menu.json";
import { hambuergessas } from "../config/hanburgesa.json";
import { botellas } from "../config/botellas.json";
export interface Menu {
  title: string;
  price: number;
  url_imagen: string;
  id?: string;
  category: string;
}

export default function Home() {
  // const data = await getUser();
  const [serch, setSerch] = useState<string>("");
  const [foods, setFoods] = useState<Menu[]>([]);
  const [endpoint, setEndpoint] = useState<string>("api/menu");
  const [hamburger, setHamburger] = useState<Menu[]>([]);
  const [bottle, setBottle] = useState<Menu[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const { getData } = useFetch();
  useEffect(() => {
    const getDataFoods = async () => {
      try {
        setFoods(projects as any);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    getDataFoods();
  }, [endpoint]);

  const handlerCategoryHamburgesa = () => {
    setFoods(hambuergessas as any);
    setShow(true);
  };
  const handlerCategoryBottles = () => {
    setFoods(bottle as any);

    setShow(true);
  };

  const handleSerchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
    setEndpoint(`api/menu/${serch}`);
  };
  const handlerCategoryCancelar = () => {
    console.log(`click`);
    
    setShow(false);
    ;
    
  };
  useEffect(() => {
    const sendCategory = async () => {
      const bottle = await getData("api/menu?category=botellas");
      if (typeof bottle !== "undefined") {
        setBottle(bottle.data);
        console.log(bottle.data);
      } else {
        console.log(`undefind`);
      }
      const hamburger = await getData("api/menu?category=hanburgesa");
      if (typeof hamburger !== "undefined") {
        setHamburger(hamburger.data);
        console.log(hamburger.data);
      } else {
        console.log(`undefind`);
      }
    };
    sendCategory();
  }, []);
  return (
    <div>
      <div className={styles.header}>
        <img
          className={styles.headerImg}
          src="/sanmartin.png"
          alt="San Martin"
        />
      </div>

      <form className={styles.formContainerSerch} onSubmit={handleSerchClick}>
        <input
          placeholder="buscar"
          onChange={(e) => setSerch(e.target.value)}
          value={serch}
          className={styles.searchInput}
        />
        <div className={styles.containerBtn}>
          <button className={styles.searchButton} type="submit">
            Buscar
          </button>
        </div>
      </form>
      <div className={styles.categoiesBtns}>
        <button
          className={styles.categoryButton}
          onClick={handlerCategoryHamburgesa}
        >
          {" "}
          <FontAwesomeIcon icon={faBurger} style={{ fontSize: "25px" }} />
        </button>
        <button
          className={styles.categoryButton}
          onClick={handlerCategoryBottles}
        >
          {" "}
          <FontAwesomeIcon icon={faBottleWater} style={{ fontSize: "25px" }} />
        </button>
        {show && (
          <button
            className={styles.categoryButton}
            onClick={handlerCategoryCancelar}
          >
            <FontAwesomeIcon
              icon={faBan}
              style={{ fontSize: "25px", borderRadius: "50px" }}
            />
          </button>
        )}
      </div>
      {show ? (
        <>
          <div className={styles.fooditem}>
            {foods.length > 0 &&
              foods?.map((food: Menu) => (
                <Suspense key={food.id} fallback={<SkeletonHome />}>
                  <ComponetFood key={food.id} {...food}></ComponetFood>
                </Suspense>
              ))}
          </div>
        </>
      ) : (
        <>
          <p className={styles.categoryTitle}>Categoria</p>
          <p className={styles.categoryBottle}>Botellas</p>
          <div className={styles.fooditem}>
            {bottle.length > 0 &&
              bottle?.map((food: Menu) => (
                <Suspense key={food.id} fallback={<SkeletonHome />}>
                  <ComponetFood {...food}></ComponetFood>
                </Suspense>
              ))}
          </div>
          <p className={styles.categoryHanburger}>Hamburgesa </p>
          <div className={styles.fooditem}>
            {hamburger.length > 0 &&
              hamburger?.map((food: Menu) => (
                <Suspense key={food.id} fallback={<SkeletonHome />}>
                  <ComponetFood key={food.id} {...food}></ComponetFood>
                </Suspense>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
