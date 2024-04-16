"use client";
import { useFetch } from "@/hock/useFetch";
import { ChangeEvent, useEffect, useState } from "react";
import { Menu } from "../page";
import ComponentAdminFood from "@/componets/ComponentAdminFood";
import { revalidatePath } from "next/cache";
import actionPath from "../../action";
import FormularioAdmin from "@/componets/FormularioAdmin";
import { useRouter } from "next/navigation";
import stylesAdmin from "./pageAdmin.module.css"
export interface bodyProps {
  title: string;
  price: string;
  imageUpLoading: File | string;
  updata?: boolean;
  setUpdate?: any;
  category: string;
  fetchFoodsData?: () => Promise<void>;
}
function Admin() {
  const [foods, setFoods] = useState([]);
  const [updata, setUpdate] = useState<boolean>(false);
  const router = useRouter();
  const { getData } = useFetch();

  useEffect(() => {
    const verificar = () => {
      const user = localStorage.getItem("user");
      if (user !== "abaduna") {
        router.push("/login");
      }
      const pasword = localStorage.getItem("password");
      if (pasword !== "1234") {
        router.push("/login");
      }
    };
    verificar();
    const fetchFoodsData = async () => {
      console.log(`fetchFoodsData`);

      const response = await getData("api/menu");
      if (response) {
        setFoods(response.data);
        console.log(response.data);
      }
    };
    fetchFoodsData();
    fetchFoodsData();
    console.log(`updata ${updata}`);
  }, [updata]);
  return (
    <>
      <FormularioAdmin updata={updata} setUpdate={setUpdate} />
      <div className={stylesAdmin.fooditems}>
        {foods?.length > 0 &&
          foods?.map((food: Menu) => (
            <ComponentAdminFood
              key={food.id}
              updata={updata}
              setUpdate={setUpdate}
              {...food}
            />
          ))}
      </div>
    </>
  );
}

export default Admin;
