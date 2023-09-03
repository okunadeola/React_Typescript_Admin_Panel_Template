import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostAction } from "../../API/todo";
import ReactPaginate from "react-paginate";
import {

    MoreVertical,
    Edit,
    FileText,
    Trash,
    ChevronDown,

  } from "react-feather";


  // ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    Row,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
  } from "reactstrap";

  import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";











// ******
import Swal, {SweetAlertOptions} from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

const ReactSwalWithInput = ReactSwal.mixin({
  confirmButtonText: <i>OK</i>,
})




interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
    actions: Array<string>
}







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























const Post = ()=>{
    const [currentPage, setCurrentPage] = useState(0);
    const [allPost, setAllPost] = useState<PostType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState<number>(0);


    const navigate = useNavigate()






    useEffect(() => {
        getAllPost();
        return () => {};
      }, []);
    
      const getAllPost = async () => {
        let actions = ["Details", 'Edit',  "Delete"];
        setIsLoading(true)
            const res: PostType[]  = await getAllPostAction()
        if (res) {
             res?.forEach((element)=> element.actions = actions)

            setAllPost([...res]);
            setCount(res.length)
          setIsLoading(false)
        }
        
        setIsLoading(false)
      };



      const viewDetails = async (id: number) => {
        // let thePost = allPost?.find((row) => row.id === id);
    
        // navigate("/post-details", { state : {report: thePost }});
      };


      

      const deletePost = async (id: number) => {

        const prompt =  await confirm("You are about to delete a post");

        if (prompt) {
            setAllPost([...allPost?.filter((item)=> item.id !== id)])
            toast.success('post deleted successfully')
        }
        
      }



        // ** Function to handle filter
  const handleUserFilter = (e :React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = allPost?.filter((item) => {
        const startsWith =

          item?.body?.toLowerCase().startsWith(value.toLowerCase()) ||
          item?.title?.toLowerCase().startsWith(value.toLowerCase()) 

        const includes =
          item?.body?.toLowerCase().includes(value.toLowerCase()) ||
          item?.title?.toLowerCase().includes(value.toLowerCase()) 

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };



  // ** Function to handle pagination
  const handlePagination = async (page: number) => {
    setCurrentPage(page);


    // fetch more by next page
    // const thePage = page + 1
    // fetchNextFromAPI(thePage)
  };


    // ** Custom Pagination
    const PostPagination = () => (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          forcePage={currentPage}
          onPageChange={(page) => handlePagination(page.selected)}
          pageCount={
            searchValue.length
              ? Math.ceil(filteredData.length / 20)
              : Math.ceil(count / 20) || 1
          }
          breakLabel={"..."}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName="page-item active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          containerClassName={
            "pagination mb-0 justify-content-end p-1"
          }
        />
      );





      const columnsPost = [
 
        {
          name: "ID",
          sortable: true,
          maxWidth: "100px",
          selector: (row: PostType) => row?.id
        },
        {
          name: "Titles",
          sortable: true,
          maxWidth: "350px",
          selector: (row: PostType) => row?.title
        },
        {
          name: "Content",
          sortable: true,
          maxWidth: "500px",
          selector: (row: PostType) => row?.body,
        
        },

        {
          name: "Actions",
          allowOverflow: true,
          cell: (row: PostType) => {
            return (
              <div className="d-flex">
                <UncontrolledDropdown    style={{overflow: 'visible'}}>
                  <DropdownToggle className="pe-1" tag="span">
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    {row?.actions?.map((col, idx) => (
                      <Fragment key={idx}>
                        {col === "Details" ? (
                          <DropdownItem
                            className="w-100"
                            onClick={() => viewDetails(row.id)}
                          >
                            <FileText size={15} />
                            <span className="align-middle ms-50">{col}</span>
                          </DropdownItem>
                        ) 
                        : col === "Delete" ? (
                          <DropdownItem
                            className="w-100"
                            onClick={() => deletePost(row.id)}
                          >
                            <Trash size={15} />
                            <span className="align-middle ms-50">{col}</span>
                          </DropdownItem>
                        ) 
                        : col === "Edit" ? (
                          <DropdownItem
                            className="w-100"
                            onClick={() => deletePost(row.id)}
                          >
                            <Edit size={15} />
                            <span className="align-middle ms-50">{col}</span>
                          </DropdownItem>
                        ) 
                        : (
                          <span></span>
                        )}
                      </Fragment>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            );
          },
        },
      ];



    return (
        <Fragment>
        <Card className="px-2">
          <CardHeader>
            <CardTitle tag="h4">Post List</CardTitle>
          </CardHeader>
          <Row className="justify-content-end mx-0 ">
            
            
            <div className="card-options py-3">
    
              <form className="w-50">
                <div className="input-group">
                  <Input
                    type="text"
                    placeholder="Search something..."
                    name="s"
                    value={searchValue}
                    onChange={(e)=>handleUserFilter(e)}
                  />
                </div>
              </form>
            </div>
          </Row>

          {
            isLoading && <div>loading...</div>
          }
         
          <div className="react-dataTable mb-2">
            <DataTable
              noHeader
              pagination
            //   paginationServer //include this if fetching from api with pagination
              data={searchValue?.length ? filteredData : allPost}
              columns={columnsPost}
              expandOnRowClicked
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={PostPagination}
              paginationDefaultPage={currentPage + 1}
              paginationRowsPerPageOptions={[20, 40, 60, 100]}
              striped={true}
            />
          </div>
          <br />
        </Card>
    
    
      </Fragment>    )
}


export default Post