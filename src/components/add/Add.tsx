import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useEffect, useRef } from "react";


type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setOpen(false)
  };


  const modalRef = useRef<HTMLDivElement>(null)


  // close modal when you click outside the modal
  useEffect(() => {
      const handler = (e:  any )=>{
          e.preventDefault()
          if (!modalRef.current?.contains(e.target)) {
            props.setOpen(false)
          }
      }
      document.addEventListener('mousedown', handler)
  
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])
  




  return (
    <div className="add">
      <div className="pop" ref={modalRef}>
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;