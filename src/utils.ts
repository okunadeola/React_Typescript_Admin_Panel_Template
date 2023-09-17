

import axios from 'axios'
import Swal, {SweetAlertOptions} from "sweetalert2"; 
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

const ReactSwalWithInput = ReactSwal.mixin({
  input: 'text',
//   confirmButtonText: <i>OK</i>,
})




export const confirm = (message: string) => {
    const res = ReactSwalWithInput.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
    
    } as SweetAlertOptions).then(async (willExecute)=> {
      if(willExecute.isConfirmed) return  true
      return false
    });
  
    return res;
  };





  const IMAGE_UPLOAD_PRESET = 'x5vjzzr8';
  const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/dv1cetenk/upload';
  
  
  /**
   * * Upload image to cloudinary storage
   * @param {string} image_base64
   * @returns {string} uploaded image remote url
   * @returns {string} uploaded image remote file type
   */
  
  export interface CloudReturn {
    type : string,
    file : string
  }
  
  
  const uploadImage = async (image_base64: string | ArrayBuffer): Promise<CloudReturn> => {
    try {
      const payload = {
        file: `${image_base64}`,
        upload_preset: IMAGE_UPLOAD_PRESET,
      };
  
      const response = await axios.post(CLOUDINARY_API_URL, payload);
      console.log(response?.data)
      const json = {
        type : response?.data?.resource_type,
        file : response?.data?.secure_url,
      }
      return json;
    } catch (error : any) {
      return error;
    }
  };
  
  export {uploadImage};
  
  