import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import Saved from "./pages/Saved";

export default function AppRouter() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppLayout>
    );
}
