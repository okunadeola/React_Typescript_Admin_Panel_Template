


import Swal, {SweetAlertOptions} from "sweetalert2"; 



export const confirm = (message: string) => {
    const res = Swal.fire({
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