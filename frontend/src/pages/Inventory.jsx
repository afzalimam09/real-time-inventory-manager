import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { apiRequest } from "../requestMethods";
import { initSocket } from "../socket";

const Inventory = () => {
    const [inventories, setInventories] = useState([]);
    const [flag, setFlag] = useState(true);
    const socketRef = useRef(null);
    useEffect(() => {
        const getInventories = async () => {
            try {
                const res = await apiRequest.get("/inventory");
                setInventories(res.data.data);
            } catch (error) {
                console.log("some thing went wrong");
            }
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

    return (
        <>
            <Navbar />
            <div className="container text-center">
                <h1 className="my-4">Inventories List</h1>
                {inventories.length > 0 ? (
                    <div className="inventoryItems">
                        {inventories.map((inventory) => (
                            <div
                                key={inventory._id}
                                className="card mb-3 mx-auto"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={inventory.imageUrl}
                                    className="card-img-top"
                                    alt={inventory.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {inventory.title}
                                    </h5>
                                    <p className="card-text">
                                        {inventory.description.slice(0, 100) +
                                            "..."}
                                    </p>
                                    <div className="d-flex justify-content-evenly">
                                        {/* <button className="btn btn-secondary">
                                        <i className="bi bi-pencil-square"></i>
                                    </button> */}
                                        <Link
                                            to={`/inventory/${inventory._id}`}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-eye"></i>
                                            {"  "}
                                            Click to View
                                        </Link>
                                        {/* <button className="btn btn-danger">
                                        <i className="bi bi-trash"></i>
                                    </button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>No inventories found!</h3>
                )}
            </div>
        </>
    );
};

export default Inventory;
