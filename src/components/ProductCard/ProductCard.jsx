

export default function ProductTab({ product }) {

    return (
        <div>
            <h2>{product.title}</h2>

            <p>{product.description} </p>
            
            <strong>₹{product.price}</strong>

            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}