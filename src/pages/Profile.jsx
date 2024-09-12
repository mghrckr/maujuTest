import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUser } from "@/store/actionCreators"; 

function Profile() {
    const { userId } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedInUserId = localStorage.getItem("userId"); 
    const user = useSelector((state) => state.users.user); 
    const loading = useSelector((state) => state.users.loading);

    useEffect(() => {
        if (userId !== loggedInUserId) {
            alert("Access Denied!");
            navigate("/unauthorized");
            return;
        }

        dispatch(fetchUser(userId));
    }, [dispatch, userId, loggedInUserId, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            <img
                className="w-32 h-32 rounded-full mx-auto"
                src={user.avatar}
                alt="Profile picture"
            />
            <h2 className="text-center text-2xl font-semibold mt-3">
                {user.first_name} {user.last_name}
            </h2>
            <p className="text-center text-gray-600 mt-1">Software Engineer</p>
            <div className="flex justify-center mt-5">
                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
                    Twitter
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
                    LinkedIn
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
                    GitHub
                </a>
            </div>
            <div className="mt-5">
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-gray-600 mt-2">
                    John is a software engineer with over 10 years of experience in
                    developing web and mobile applications. He is skilled in JavaScript,
                    React, and Node.js.
                </p>
            </div>
        </div>
    );
}

export default Profile;
