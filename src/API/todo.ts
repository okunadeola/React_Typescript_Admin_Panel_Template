import { toast } from "react-hot-toast";
import API from "./axiosSetup";






//GET ALL POST
export async function getAllPostAction() {

    const res =   await getAllPost()
           .then(async (response) => {
               return response?.data
           })
           .catch((error) => {
               toast.error(error?.response?.data);
               return false
           })  

     return res  

   }
   
const getAllPost = async () => {
   
       return await API.get(`/posts`)
}