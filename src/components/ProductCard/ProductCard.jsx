import { Link } from "react-router-dom"

export default function ProductTab({ product ,onDelete }) {

    return (
        <div>
            <h2>{product.title}</h2>

            <p>{product.description} </p>
            
            <strong>₹{product.price}</strong>

            <div>
                <Link to={`/edit-product/${product._id}`}>Edit</Link>
                <button onClick={()=> onDelete(product._id)}>Delete</button>
            </div>
        </div>
    )
}