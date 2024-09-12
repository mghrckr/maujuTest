import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "@/store/actionCreators";
import Swal from 'sweetalert2';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: 'https://i.pravatar.cc',
        category: ''
    });
    const [currentProductId, setCurrentProductId] = useState(null);
    const userId = localStorage.getItem("userId");
    const access_token = localStorage.getItem("access_token");
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to add this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit!'
        });

        if (result.isConfirmed) {
            try {
                await dispatch(addProduct(formData));
                Swal.fire(
                    'Success!',
                    'The product has been added.',
                    'success'
                );
                setFormData({
                    title: '',
                    price: '',
                    description: '',
                    image: '',
                    category: ''
                });
                toggleModal();
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an issue adding the product. Please try again.',
                    'error'
                );
                console.error('Failed to add product:', error);
            }
        }
    };

    const openUpdateModal = (product) => {
        setCurrentProductId(product.id);
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            image: product.image,
            category: product.category
        });
        toggleUpdateModal();
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update!'
        });

        if (result.isConfirmed) {
            try {
                await dispatch(updateProduct(currentProductId, formData));
                Swal.fire(
                    'Success!',
                    'The product has been updated.',
                    'success'
                );
                setFormData({
                    title: '',
                    price: '',
                    description: '',
                    image: '',
                    category: ''
                });
                toggleUpdateModal();
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an issue updating the product. Please try again.',
                    'error'
                );
                console.error('Failed to update product:', error);
            }
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id));
                Swal.fire(
                    'Deleted!',
                    'Your Product has been deleted.',
                    'success'
                );
            }
        });
    };
    console.log(products);
    const handleNavigate = async (userId) => {
        navigate(`/contain/profile/${userId}`);
    };
    return (
        <>
            <div>
                <Button className="ml-auto mt-20" color="blue" onClick={toggleModal}>
                    Add Product
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(userId);
                    }}
                    className="ml-5 mt-20" color="blue"
                >
                    Go to Profile
                </Button>
            </div>
            <div
                className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10"
                style={{ fontFamily: 'Roboto, sans-serif', background: 'white' }}
            >
                {modalOpen && (
                    <div id="crud-modal" className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
                        <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Add Product
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                title
                                            </label>
                                            <input
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type title"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                price
                                            </label>
                                            <input
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type price"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                description
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                name="description"
                                                id="description"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type description"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                category
                                            </label>
                                            <input
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="category"
                                                id="category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type category"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {updateModalOpen && (
                    <div id="crud-modal" className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
                        <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Update Product
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={toggleUpdateModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form className="p-4 md:p-5" onSubmit={handleUpdateSubmit}>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Title
                                            </label>
                                            <input
                                                value={formData.title}
                                                onChange={handleUpdateInputChange}
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type title"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Price
                                            </label>
                                            <input
                                                value={formData.price}
                                                onChange={handleUpdateInputChange}
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type price"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={handleUpdateInputChange}
                                                name="description"
                                                id="description"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type description"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Category
                                            </label>
                                            <input
                                                value={formData.category}
                                                onChange={handleUpdateInputChange}
                                                type="text"
                                                name="category"
                                                id="category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type category"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button
                                            type="button"
                                            onClick={toggleUpdateModal}
                                            className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Update Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <input
                    className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search Transaction"
                />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                    <svg
                        className="text-gray-600 h-4 w-4 fill-current mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        style={{ enableBackground: "new 0 0 56.966 56.966" }}
                        xmlSpace="preserve"
                        width="512px"
                        height="512px"
                        opacity={'0.7'}
                    >
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
                <table
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-20"
                    style={{ fontFamily: 'Roboto, sans-serif', background: 'rgba(246, 246, 246, 1)' }}
                >
                    <thead
                        className="text-xs text-gray-700 uppercase"
                        style={{ background: 'rgba(246, 246, 246, 1),linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02))' }}
                    >
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Item
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            background: `linear-gradient(0deg, #FFFFFF, #FFFFFF),
                            linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02))`,
                        }}
                    >
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-${product.id}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`checkbox-${product.id}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {product.title}
                                </th>
                                <td className="px-6 py-4">${product.price}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                        Available
                                    </span>
                                </td>
                                <td className="flex items-center justify-end px-6 py-4">
                                    <a
                                        href="#"
                                        onClick={() => openUpdateModal(product)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center justify-center"
                                        style={{
                                            backgroundColor: 'rgba(246, 246, 246, 1)',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="black"
                                            width="24"
                                            height="24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="black"
                                            width="24"
                                            height="24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
