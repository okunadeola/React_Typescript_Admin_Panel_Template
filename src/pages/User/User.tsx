

import Single from '../../components/single/Single'
import { singleUser } from '../../data'
import './user.scss'

const User = ()=> {
    return (
        <Single {...singleUser}/>
    )
}

export default User