import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../requestMethods";
import { useLocation, useNavigate } from "react-router-dom";
import { initSocket } from "../socket";

const Edit = () => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);

    const socketRef = useRef(null);
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    useEffect(() => {
        const getInventories = async () => {
            try {
                const res = await apiRequest.get(`/inventory/${id}`);
                setInputs(res.data.data);
            } catch (error) {
                console.log(error);
                setErr(error.response.data.message);
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

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (JSON.stringify(inputs) === "{}") {
            setErr("Please enter required fields!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.put(`/inventory/${id}`, inputs);
            setErr("Inventory Updated!");
            navigate(`/inventory/${id}`);
        } catch (error) {
            setErr(error?.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            {!err ? (
                <main className="mt-3 mx-auto" style={{ maxWidth: "22rem" }}>
                    <h1 className="text-center mb-3">Update Inventory</h1>
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="inputTitle1" className="form-label">
                                Title
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="title"
                                defaultValue={inputs.title}
                                placeholder="Title goes here"
                                className="form-control"
                                id="inputTitle1"
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="inputPrice" className="form-label">
                                Price
                            </label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="price"
                                defaultValue={inputs.price}
                                className="form-control"
                                id="inputPrice"
                                placeholder="99"
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="inputMnf" className="form-label">
                                Manufacturer
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="manufacturer"
                                defaultValue={inputs.manufacturer}
                                className="form-control"
                                placeholder="amazon"
                                id="inputMnf"
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="inputStatus" className="form-label">
                                Status
                            </label>
                            <select
                                onChange={handleChange}
                                name="status"
                                id="inputStatus"
                                className="form-select"
                                defaultValue={inputs.status}
                            >
                                <option value="in_stock">In Stock</option>
                                <option value="out_of_stock">
                                    Out of Stock
                                </option>
                                <option value="back_order">Back Order</option>
                            </select>
                        </div>

                        {/* <div className="col-12">
                        <label htmlFor="inputPhoto" className="form-label">
                            Photo
                        </label>
                        <input
                            onChange={handlePhoto}
                            type="file"
                            name="photo"
                            className="form-control"
                            id="inputPhoto"
                        />
                    </div> */}

                        <div className="col-12">
                            <label
                                htmlFor="inputDescription1"
                                className="form-label"
                            >
                                Description
                            </label>
                            <textarea
                                onChange={handleChange}
                                className="form-control"
                                defaultValue={inputs.description}
                                name="description"
                                placeholder="Description goes here"
                                id="inputDescription1"
                            ></textarea>
                        </div>
                        {err && (
                            <div className="mb-3 text-danger ">
                                <span>{err}</span>
                            </div>
                        )}
                        <div className="col-12 mb-5">
                            {!loading ? (
                                <button
                                    onClick={handleSubmit}
                                    className="w-100 btn btn-primary"
                                    type="button"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    className="w-100 btn btn-secondary disabled"
                                    type="button"
                                >
                                    Please Wait...
                                </button>
                            )}
                        </div>
                    </form>
                </main>
            ) : (
                <h3 className="text-center my-5">{err}</h3>
            )}
        </>
    );
};

export default Edit;
