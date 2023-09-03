
import Single from '../../components/single/Single'
import { singleProduct } from '../../data'
import './product.scss'


const Product = ()=> {
    return (
       <Single {...singleProduct}/>
    )
}

export default Product