import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/SavedContext";
import { BookItem } from "../types/BookItem";
import { useState } from "react";


function CreateAccount() {
    const navigate=useNavigate();
    const {title, bookID, price} = useParams();
    const {addToCart}=useCart();
    const [quantity,setQuantity] = useState<number>(0)
    const subtotal = quantity * Number(price)

    function handleAddToCart() {
        const newItem: BookItem = {
            bookID: Number(bookID),
            title: title || 'No Book Found',
            price: Number(price),
            quantity,
            subtotal: Number(subtotal)

        };
        addToCart(newItem);
        navigate('/cart');
    }

    return (
        <> 
        <WelcomeBand />

        <h2>Purchase {title}</h2>
        <div>
            <input type="number" placeholder="Enter quantity" 
            value={quantity} 
            onChange={(x)=> setQuantity(Number(x.target.value))}/>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <button onClick={()=> navigate(-1)}>Go Back</button>
        </>
    )
}

export default CreateAccount;