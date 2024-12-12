import axiosInstance from "../utils/http";

export const getProductCategories = async () => {
  return await axiosInstance.get("/products/category-list");
};

export const getAllProductsByCategory = async (categoryName) => {
  return await axiosInstance.get(`/products/category/${categoryName}`);
};

export const login = async (formData) => {
  return await axiosInstance.post("/auth/signin", formData);
};

export const registerUser = async (formData) => {
  return await axiosInstance.post("/auth/signup", formData);
};

export const getAuthenticatedUser = async (token) => {
  return await axiosInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateUser = async (formData, token) => {
  return await axiosInstance.patch("/auth/updateuser", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = async () => {
  return await axiosInstance.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

//products

export const createProduct = async (formData, token) => {
  return axiosInstance.post("/products/create", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductsByCategory = async (categoryName) => {
  return axiosInstance.get(`/products/${categoryName}`);
};

export const getASingleProduct = async (productTitle) => {
  return axiosInstance.get(`/products/single/${productTitle}`);
};

export const searchProducts = async (searchQuery) => {
  return await axiosInstance.get(`/products/get/search?q=${searchQuery}`);
};

export const getAllProducts = async () => {
  return await axiosInstance.get("/products");
};

export const updateProduct = async (productId, formData, token) => {
  return await axiosInstance.patch(`/products/update/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (productId, token) => {
  return await axiosInstance.delete(`/products/delete/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
