import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/authProvider";
import { findProducts } from "../../services/axios/product";
import { updateProductList } from "../../store/slices/product-slice";

function useProducts() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const location = useLocation();

    const findAllProducts = useCallback(async () => {
        const response = await findProducts();
        const products = response.data.data;
        dispatch(updateProductList({ products }))
    }, [])

    useEffect(() => {
        if (user !== null && user !== undefined && (location.pathname === "/invest" || location.pathname === "/dashboard")) {
            findAllProducts()
        }
    }, [user, location])
}

export default useProducts;