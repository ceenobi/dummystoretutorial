import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAllProducts, getAuthenticatedUser, logoutUser } from "../api/api";
import { toast } from "sonner";
import useFetch from "../hooks/useFetch";

export const AuthStore = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [cartItems, setCartItems] = useLocalStorage("cart", []);
  const [user, setUser] = useState({
    isLoading: false,
    isError: null,
    data: null,
    isAuthenticated: false,
  });
  const { error, data, loading, setData } = useFetch(getAllProducts);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const checkAuth = async () => {
      setUser({ isError: null, data: null });
      try {
        const res = await getAuthenticatedUser(accessToken);
        setUser({
          data: res.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setUser({
          isError: error,
          isAuthenticated: false,
        });
      }
    };
    checkAuth();
  }, [accessToken, data]);

  const logout = async () => {
    localStorage.removeItem("accessToken");
    await logoutUser();
    setUser({
      isLoading: false,
      isError: null,
      data: null,
      isAuthenticated: false,
    });
    toast.success("Logged out");
  };

  const addToCart = (product) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === product._id) == null) {
        return [...currItems, { ...product, qty: 1 }];
      } else {
        return currItems.map((item) => {
          if (item._id === product._id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const cartQuantity = cartItems?.reduce((qty, item) => item.qty + qty, 0);

  console.log(user);

  const contextData = {
    accessToken,
    setAccessToken,
    user,
    logout,
    setUser,
    error,
    data,
    loading,
    setData,
    addToCart,
    cartQuantity,
  };

  return (
    <AuthStore.Provider value={contextData}>{children}</AuthStore.Provider>
  );
};
