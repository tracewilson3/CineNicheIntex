import { useNavigate } from "react-router-dom";
import { useCart } from "../context/SavedContext";
import { BookItem } from "../types/BookItem";

function SavedPage() {
    const navigate = useNavigate()
    const {cart, removeFromCart} = useCart();

    return (
        <div>
            <h2>Your Saved Movies</h2>
            <div>
                {cart.length === 0 ? (
                <p>Your cart is empty</p> 
                ): (
                <ul>
                    {cart.map((item: BookItem) => (
                    <li key={item.bookID}>
                        {item.title}: Quantity: {item.quantity} Subtotal: ${item.subtotal.toFixed(2)}
                        <button onClick={()=> removeFromCart(item.bookID)}>
                            Remove
                            </button>
                        </li>
                    ))}
                    </ul>
                    )}
                
            </div>
            <h3>Total: </h3>
            <button>Checkout</button>
            <button onClick={()=> navigate('/books')}>Continue Browsing</button>
        </div>
    );
}
export default SavedPage;