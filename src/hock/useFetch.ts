import { API } from "@/API";
import { food } from "@/app/admin/formulario/[id]/page";
import { bodyProps } from "@/app/admin/page";
import { Menu } from "@/app/page";
export const useFetch = () => {
  const fetchPost = async (datos: bodyProps) => {
    try {
      const formData = new FormData();

      formData.append("title", datos.title);
      formData.append("price", datos.price);
      formData.append("imageUpLoading", datos.imageUpLoading);
      formData.append("category", datos.category);
      await API.post("api/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(`algo salio en en  fetchPost`);
      console.error(error);
    }
  };
  const deletID = async (id: string) => {
    try {
      await API.delete(`api/menu/${id}`);
    } catch (error) {
      console.log(`algo salio en en  fetchPost`, error);
    }
  };
  const getData = async (endpoint:string) => {
    try {
      const data = await API.get(endpoint);
      return data;
    } catch (error) {
      console.log(`algo salio en mal  getData`, error);
    }
  };
  const getDataForid = async (id: string) => {
    try {
      const data = await API.get(`api/menuporid/${id}`);
      console.log(data);
      
      return data;
    } catch (error) {
      console.log(`algo salio en en  getDataForid`, error);
    }
  }; ///menu/:id
  const upDateID = async (id: string, food: food) => {
    try {
      const data = await API.put(`api/menu/${id}`, food);
      return data;
    } catch (error) {
      console.log(`algo salio en en  getDataForid`, error);
    }
  };
  return { fetchPost, deletID, getData, getDataForid, upDateID };
};
