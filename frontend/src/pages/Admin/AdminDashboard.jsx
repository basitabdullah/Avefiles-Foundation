import "./AdminDashboard.scss";
import { useState } from "react";
import CreateProduct from "../../components/admin/CreateProduct/CreateProduct";
import Products from "../../components/admin/Products/Products";
import Analytics from "../../components/admin/Analytics/Analytics";
import MetaData from "../../components/MetaData";
import AdminOrders from "./Orders/AdminOrders";
import AdminDonations from "./Donations/AdminDonations";

const AdminDashboard = () => {
  const pages = ["create Product", "products", "analytics", "orders", "donations"];
  const [page, setPage] = useState("create Product");
  
  return (
    <div className="admin">
      <MetaData title={"Avefiles | Admin-Dashboard"} />

      <h1>Admin Dashboard</h1>
      <div className="pageSwitcher">
        {pages?.map((page) => (
          <button 
            className={`page-switcher-btn ${page === page ? 'active' : ''}`} 
            key={page} 
            onClick={() => setPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="page">
        {page === "create Product" && <CreateProduct />}
        {page === "products" && <Products />}
        {page === "analytics" && <Analytics />}
        {page === "orders" && <AdminOrders />}
        {page === "donations" && <AdminDonations />}
      </div>
    </div>
  );
};

export default AdminDashboard;
