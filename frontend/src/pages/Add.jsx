import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

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
            const res = await apiRequest.post("inventory", inputs);
            setErr("Inventory Created!");
            navigate("/");
        } catch (error) {
            setErr(error?.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main className="mt-3 mx-auto" style={{ maxWidth: "22rem" }}>
                <h1 className="text-center mb-3">Add Inventory</h1>
                <form className="row g-3">
                    <div className="col-12">
                        <label htmlFor="inputTitle1" className="form-label">
                            Title
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="title"
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
                        >
                            <option defaultValue>Choose...</option>
                            <option value="in_stock">In Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
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
        </>
    );
};

export default Add;
