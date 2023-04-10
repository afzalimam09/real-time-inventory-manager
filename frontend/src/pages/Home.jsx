import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { apiRequest } from "../requestMethods";
import { initSocket } from "../socket";

const Home = () => {
    const [inventories, setInventories] = useState([]);
    const [flag, setFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        const getInventories = async () => {
            setLoading(true);
            try {
                const res = await apiRequest.get("/inventory");
                setInventories(res.data.data);
            } catch (error) {
                console.log("some thing went wrong");
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

    return (
        <>
            <Navbar />
            <div className="container text-center">
                <h1 className="my-5">Inventory Management Application</h1>
                <p className="mb-5 fs-3">
                    This is an inventory management application.
                    <br /> Click below buttons to see the inventories or add a
                    new inventory.
                </p>
                <div>
                    <Link to={"/inventory"} className="btn btn-primary m-2">
                        View All Inventories
                    </Link>
                    <Link
                        to={"/inventory/add"}
                        className="btn btn-secondary m-2"
                    >
                        Add New Inventory
                    </Link>
                </div>
            </div>
            {/* Recent Inventories */}
            {!loading ? (
                <div className="container">
                    <h1 className="my-4 fs-4">Recent Inventories</h1>
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
                                            {inventory.description.slice(
                                                0,
                                                100
                                            ) + "..."}
                                        </p>
                                        <div className="d-flex justify-content-evenly">
                                            <Link
                                                to={`/inventory/${inventory._id}`}
                                                className="btn btn-primary"
                                            >
                                                <i className="bi bi-eye"></i>
                                                {"  "}
                                                Click to View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3>No inventories found!</h3>
                    )}
                </div>
            ) : (
                <h3 className="my-3 text-center">Loading!</h3>
            )}
        </>
    );
};

export default Home;
