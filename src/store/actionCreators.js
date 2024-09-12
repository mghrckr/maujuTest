const BASE_URL = `https://fakestoreapi.com`
const REQRES_URL = `https://reqres.in`

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'products/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            dispatch({ type: 'DELETE_PRODUCT', payload: id });
        } catch (error) {
            console.error('Error deleting training event:', error);
            throw error;
        }
    };
};

export const addProduct = (product) => {
    console.log(product, 'ini product');

    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const newProduct = await response.json();
            console.log('New Product:', newProduct);
            dispatch({
                type: 'product/add',
                payload: newProduct,
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
};

export const updateProduct = (productId, updatedProduct) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedData = await response.json();
            console.log('Updated Product:', updatedData);

            dispatch({
                type: 'product/update',
                payload: updatedData,
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
};

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${REQRES_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log('Registration Response Data:', data);

            dispatch({
                type: 'user/add',
                payload: data,
            });
        } catch (error) {
            console.error('Error occurred during registration:', error);
            throw error; 
        }
    };
};



export const fetchUser = (userId) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${REQRES_URL}/api/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        dispatch({ type: "user/get", payload: data.data });
      } catch (error) {
        console.error(error.message);
      }
    };
  };
  

export const loginUser = (DB_USER, DB_PASS) => {
    return async dispatch => {
        try {
            const payload = {
                email: DB_USER,
                password: DB_PASS,
            };
            console.log('Request Payload:', payload);

            const response = await fetch(`${REQRES_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Response Data:', data);

            localStorage.setItem('access_token', data.token);
            localStorage.setItem('userId', 4); 
            dispatch({
                type: 'user/login',
                payload: {
                    email: DB_USER,
                    access_token: data.access_token
                },
            });
        } catch (error) {
            console.error('Error occurred during login:', error);
            throw error;
        }
    };
};

