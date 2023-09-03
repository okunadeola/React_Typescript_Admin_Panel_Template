


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