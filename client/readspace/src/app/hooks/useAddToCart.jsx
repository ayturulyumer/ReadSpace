import { useAuth } from "../context/authContext.jsx";
import { addItem } from "../components/Cart/cartSlice.js";
import { useAppDispatch } from "../lib/hooks.js";
import { useRouter } from "next/navigation.js";
import toast from "react-hot-toast";

export const useAddToCart = (product) => {
  const { session } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product) => {
    if (!session) {
      toast.error("You must be logged in to add books to your cart");
      return router.push("/login"); // Return early to avoid dispatching
    }
    console.log(product);
    dispatch(addItem(product));
    toast.success(`${product.name} was added to your cart`);
  };

  return handleAddToCart;
};
