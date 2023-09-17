import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, InputGroup, Label, Row } from "reactstrap";
import "./addPost.scss";
import { Fragment, useRef, useState } from "react";
import { CloudReturn, uploadImage } from "../../utils";
import { ThreeDots } from 'react-loading-icons'
import { useNavigate } from "react-router-dom";
import { Camera, XCircle, X } from "react-feather";
import Avatar from "../../assets/xs/default.webp";
import Select, { MultiValue } from "react-select";
// import { ValueType } from "react-select/src/types";
import { confirmSwal } from "../Post/Post";












interface DayOptions {
    value: number, 
    label: string
}

interface MyFormData {
    name: string,
    age: string,
    dateofBirth: string,
    school: string,
    availableDay: Array<number>,
    role: string
}



const AddPost = () => {
    const [formdata, setFormdata] = useState<MyFormData>({
        name: "default name",
        age: "",
        dateofBirth: "",
        school: "",
        availableDay: [],
        role: ''
        });








  const [isLoading, setIsLoading] = useState(false);


  const [medias, setMedias] = useState<CloudReturn[]>([]);

  const uploadMedias = useRef<CloudReturn[]>([]);


  const navigate = useNavigate();



  const  dayOptions: Array<DayOptions>= [
    { value: 0, label: "SUN" },
    { value: 1, label: "MON" },
    { value: 2, label: "TUE" },
    { value: 3, label: "WED" },
    { value: 4, label: "THU" },
    { value: 5, label: "FRI" },
    { value: 6, label: "SAT" },
  ];


  const status: Record<string, any> = {
    '20': { title: "Under Age", color: "tag tag-secondary" },
    '40': { title: "Adult", color: "tag tag-warning" },
    '60': { title: "Retired", color: "tag tag-primary" },
  };





  const pickDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();


    const date = e.target.value;

    const arrangeDate = date.split("-");

    const day = Number(arrangeDate[2]);
    const month = Number(arrangeDate[1]);
    const year = Number(arrangeDate[0]);

    const theDate = `${month}/${day}/${year}`;

    setFormdata({ ...formdata, dateofBirth: theDate });
  };

  const handleform = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();

    setFormdata({...formdata,  [e.target.name]: e.target.value});
  };







  const setMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files?.length) {
      setIsLoading(true);
      for (let i = 0; i < e.target.files.length; i++) {
        const currentFile = e.target.files[i];
        let reader = new FileReader();

        reader.onload = async (e) => {
          setTimeout(async () => {
            const res = await uploadImage(e.target?.result!);
            if (res) {
              console.log(res);
              // const json = {
              //   file: res?.file,
              //   type: res?.type,
              // };
              setMedias([...medias, res]);
              uploadMedias.current.push(res);
            }
          }, 2000);
        };
        reader.readAsDataURL(currentFile);
      }
      setIsLoading(false);
    }
  };





    const assignRole = async (theRole: string) => {
        const prompt = await confirmSwal("the user role will be updated");
        if (prompt) {
            setFormdata({ ...formdata, role: theRole });
        }else{
            setFormdata({ ...formdata, role: 'unknown' });
        }
    }

   

    const updateDay = (e: MultiValue<DayOptions>) => {
       
        const filterDayBy = e?.map((el) => el?.value);
        console.log(filterDayBy)
    
        setFormdata({ ...formdata, availableDay: filterDayBy });
      };
  



 const removeImage = (index: number)=>{
    uploadMedias.current.splice(index, 1)
    setMedias([...medias.filter((med, i)=> i !== index)])
 }




  const back = () => {
     navigate(-1);
  };








  return (
    <div className="addpost">
        <Button
          type="button"
          className="btn-next btn-sm mb-1"
          color="secondary"
          onClick={back}
        >
          <X />
        </Button>
        <div>{isLoading && (<ThreeDots/>)}</div>




{/* card, row col responsiveness from reactsrtap */}

        <Card>
          <CardHeader className="flex-column align-items-start">
            <CardTitle tag="h4">Employee Details</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="media mb-4" >
             
             <div
             style={{
                maxWidth: '120px',
                position: 'relative'}}
             >
                <img
                    style={{
                        maxWidth: '120px',
                        position: 'relative'
                    }}
                    className="avatar avatar-xl mr-3"
                    src={uploadMedias.current[0]?.file || Avatar}
                    alt="avatar"
                />
                <Label for="myfile" style={{cursor:'pointer'}}>
                    <Camera style={{position: 'absolute', right: -10, top:-5}}/>
                </Label>
                <input onChange={setMedia} className="d-none" id="myfile" type="file" multiple accept="*"/>

             </div>
            </div>

            <Row>
              <Col md="8" sm="12">
                <Row>
                  
                  <Col md="6" sm="12">
                    <div className="mb-2">
                      <Label className="form-label" for="checkoutName">
                        Last Name:
                      </Label>{" "}
                      <span>{formdata?.name}</span>
                    </div>
                  </Col>
                  <Col md="6" sm="12">
                    <div className="mb-2">
                      <Label className="form-label" for="checkoutNumber">
                        Birth:
                      </Label>{" "}
                      <span>{formdata?.dateofBirth}</span>
                    </div>
                  </Col>
                  <Col md="6" sm="12">
                    <div className="mb-2 d-flex">
                      <Label className="form-label" for="checkoutNumber">
                        Available Days:
                      </Label>{" "}
                      <div className="d-flex flex-wrap">
                        {formdata.availableDay.map(day=>(
                            <div className="mx-2 my-1 d-flex align-items-center justify-content-center" style={{width: 50, height: 30, borderRadius: 5, background: 'pink', }}>
                                {dayOptions[day].label}
                            </div>
                      ))}</div>
                    </div>
                  </Col>

                {/*                
                  <Col md="6" sm="12">
                    <div className="mb-2">
                      <Label className="form-label" for="checkoutNumber">
                        Age Status:
                      </Label>{" "}
                      <span
                        className={`${
                            status[formdata.age]?.color
                        }`}
                      >
                        {status[formdata.age]?.title}
                      </span>
                    </div>
                  </Col> */}
                </Row>
              </Col>

    
                <Col md="4" sm="6">
                  <Label className="form-label" for="checkoutNumber">
                    Assign New Role to user
                  </Label>{" "}
                  <div className="form-group">
                    <div className="custom-controls-stacked">
                      <label
                        onClick={() => assignRole("user")}
                        className="custom-control custom-radio "
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios"
                          defaultValue="user"
                          checked={formdata && formdata?.role === "user"}
                          onChange={()=>{}}
                        //   defaultChecked={formdata && formdata?.role === "user"}
                        />
                        <div className="custom-control-label mx-1">User </div>
                      </label>
                      <label
                        onClick={() => assignRole("admin")}
                        className="custom-control custom-radio"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios"
                          defaultValue="admin"
                          checked={formdata && formdata?.role === "admin"}
                          onChange={()=>{}}
                      
                        />
                        <div className="custom-control-label mx-1">Admin</div>
                      </label>
                      <label
                        onClick={() => assignRole("super admin")}
                        className="custom-control custom-radio"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios"
                          defaultValue="super admin"
                          checked={formdata && formdata?.role === "super admin"}
                          onChange={()=>{}}
                      
                        />
                        <div className="custom-control-label mx-1">Super Admin</div>
                      </label>
                    </div>
                  </div>
                </Col>
              
            </Row>

            
              <Row className="mt-3">
                <Col md="3" sm="12">
                  <Button
                    type="button"
                    className="btn-next delivery-address mb-1"
                    color='warning'
                    onClick={()=>{}}
                  >
                    Activate
                  </Button>
                </Col>
                <Col md="6" sm="12">
                  <Button
                    type="button"
                    className="btn-next delivery-address mb-1"
                    color="secondary"
                    onClick={()=>{}}
                  >
                    Initialize Password Reset
                  </Button>
                </Col>
                <Col md="3" sm="12">
                  <Button
                    type="button"
                    className="btn-next delivery-address mb-1"
                    color="danger"
                    onClick={()=>{}}
                  >
                    Delete User
                  </Button>
                </Col>
              </Row>
           
          </CardBody>
        </Card>





{/* card, row col responsiveness from reactsrtap */}

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "",
            alignItems: "center",
            width: "50%",
            marginBottom: '5px'
          }}
        >
            <div>
                <span>Select Files</span>
            </div>
          <Label className="form-label mb-0  py-1 mx-2" for="file">
            <span title="pick file">
                <Camera/>
            </span>
            <div className="mb-2">
              <InputGroup>
                <input
                  onChange={(e) => setMedia(e)}
                  name="main"
                  type="file"
                  id="file"
                  accept="*"
                  multiple
                  placeholder="file"
                  className="form-control d-none"
                />
              </InputGroup>
            </div>
          </Label>

        </div>

        <div className="d-flex mb-3">
        { uploadMedias?.current?.map((file, i)=>(
            <div key={file.file}  className="mx-2" style={{position: 'relative'}}>
                {
                    file.type === 'image' ? 
                        <Fragment>
                            <img
                                style={{
                                    maxWidth: '120px',
                                    position: 'relative',
                                    borderRadius: '5px'
                                }}
                                className="avatar avatar-xl mr-3"
                                src={file?.file || Avatar}
                                alt="avatar"
                            />
                            <XCircle onClick={()=>removeImage(i)} color={"red"} style={{position: 'absolute', top: -3, right: -10, zIndex: 10}}/>

                        </Fragment>
                    :  <span>Ohter type of file UI</span>
                }
            </div>
            ))
        }
        </div>

        <Row>
        <Col md="6" sm="12">
                    <div className="mb-2">
                      <Label className="form-label" for="checkoutNumber">
                        Fullname:
                      </Label>{" "}
                      <Input
                        type="text"
                        value={formdata?.name}
                        name="name"
                        // for handle form, name attribute is neceessary
                        onChange={handleform}
                      ></Input>
                    </div>
                  </Col>
        <Col md="6" sm="12">
                    <div className="mb-2">
                      <Label className="form-label" for="checkoutNumber">
                        Pick Date:
                      </Label>{" "}
                      <Input
                        type="date"
                        onChange={pickDate}
                      ></Input>
                    </div>
                  </Col>
        </Row>


        <div className="mb-1 col-md-6">
                <Label className="form-label" for="email">
                Overtime Days 
                </Label>
                <InputGroup>

                           <Select
                           className="form-control w-100 "
                                // defaultValue={dayOptions[0]}
                                menuPortalTarget={document.body}
                                onChange={(newValue: MultiValue<DayOptions>)=>updateDay((newValue as DayOptions[]))}
                                options={dayOptions}
                                styles={{
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 })
                                  }}
                                isMulti
                              />
          
                  
                </InputGroup>
              </div>
      </div>
    </div>
  );
};

export default AddPost;
