import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className='sidebar-component'>
			<h1>DROAME</h1>
			<div className='sidebar-Links'>
				<div className='d-flex'>
					<Link to={"/customers"}>Customers</Link>
				</div>
				<div className='d-flex'>
					<Link to={"/allbookings"}>All Bookings</Link>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
