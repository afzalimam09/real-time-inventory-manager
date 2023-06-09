import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../requestMethods";
import { initSocket } from "../socket";

const SingleView = () => {
    const [inventory, setInventory] = useState({});
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(true);
    const [loading, setLoading] = useState(false);

    const socketRef = useRef(null);

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const navigate = useNavigate();

    useEffect(() => {
        const getInventories = async () => {
            setLoading(true);
            try {
                const res = await apiRequest.get(`/inventory/${id}`);
                setInventory(res.data.data);
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }
            setLoading(false);
        };
        getInventories();
    }, [flag]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            //Listening for the add inventory event
            socketRef.current.on("add_inventory", (data) => {
                setFlag((prev) => !prev);
            });

            //Listening for the update inventory event
            socketRef.current.on("update_inventory", (data) => {
                setFlag((prev) => !prev);
            });

            //Listening for the delete inventory event
            socketRef.current.on("delete_inventory", (data) => {
                setFlag((prev) => !prev);
            });
        };
        init();
    }, []);

    const handleDelete = async () => {
        try {
            const res = await apiRequest.delete(`/inventory/${id}`);
            navigate("/inventory");
        } catch (error) {
            console.log("some thing went wrong");
        }
    };

    const handleEdit = () => {
        navigate(`/inventory/edit/${id}`);
    };

    return (
        <>
            <Navbar />
            {!loading ? (
                <>
                    {!error ? (
                        <div
                            className="card mb-3 mx-auto my-5"
                            style={{ maxWidth: "22rem" }}
                        >
                            <img
                                src={inventory.imageUrl}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {inventory.title}
                                </h5>
                                <p className="card-text">
                                    {inventory.description}
                                </p>
                                <div>
                                    <p>
                                        <b>Price: ₹ </b>
                                        {inventory.price}
                                    </p>
                                    <p>
                                        <b>Manufacturer: </b>
                                        {inventory.manufacturer}
                                    </p>
                                    <p>
                                        <b>Status: </b>
                                        {inventory.status}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-evenly">
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleEdit}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleDelete}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-center my-5">{error}</h3>
                    )}
                </>
            ) : (
                <h3 className="text-center my-5">Loading...</h3>
            )}
        </>
    );
};

export default SingleView;
