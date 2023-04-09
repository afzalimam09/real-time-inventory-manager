import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Inventory from "./pages/Inventory";
import SingleView from "./pages/SingleView";
import "./App.css";
import Edit from "./pages/Edit";
import { useEffect, useRef } from "react";
import { initSocket } from "./socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            //Listening for the add inventory event
            socketRef.current.on("add_inventory", (data) => {
                const navigateToInventory = () => {
                    navigate(`/inventory/${data._id}`);
                };

                toast.success("New Inventory added! Click to View!", {
                    onClick: navigateToInventory,
                });
            });

            //Listening for the update inventory event
            socketRef.current.on("update_inventory", (data) => {
                const navigateToInventory = () => {
                    navigate(`/inventory/${data._id}`);
                };

                toast.success("Inventory updated! Click to View!", {
                    onClick: navigateToInventory,
                });
            });

            //Listening for the delete inventory event
            socketRef.current.on("delete_inventory", (data) => {
                toast.error("An inventory deleted!!");
            });
        };
        init();
    }, []);

    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/add" element={<Add />} />
                <Route path="/inventory/:id" element={<SingleView />} />
                <Route path="/inventory/edit/:id" element={<Edit />} />
            </Routes>
        </div>
    );
};

export default App;
