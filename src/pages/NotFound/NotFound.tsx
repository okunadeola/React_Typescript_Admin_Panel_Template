

import {  useNavigate, } from 'react-router-dom'
import './notfound.scss'



const NotFound = ()=> {

    const navigate = useNavigate()


    const back =()=>{
        navigate(-1);
    }


    return (
        <div className='notfound'>
            <div className="container">
                <div className="text">
                    <h1>
                     NOT FOUND PAGE
                    </h1>
                </div>
                <div >
                    <button className="btn" onClick={back}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound