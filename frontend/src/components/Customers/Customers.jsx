import React, { useEffect, useState } from "react";
import "./Customers.css";
import { getAllCustomer } from "./apis/apis";
import Loader from "../common/loaders/Loader";
import { Link } from "react-router-dom";

const Customers = () => {
	const [customers, setCustomers] = useState();
	const [loading, setLoading] = useState(true);
	const fetchData = () => {
		setTimeout(async () => {
			let res = await getAllCustomer();
			setCustomers(res.data);
			setLoading(false);
		}, 800);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<div className='header'>
				<h1>All Customers</h1>
				<button>Add Customer</button>
			</div>

			{loading ? (
				<Loader />
			) : (
				<div className='all-customers'>
					{customers?.map((item) => (
						<Link
							to={`/customers/${item._id}`}
							className='customer'
							key={item._id}
						>
							<h4>{item.name}</h4>
							<p>{item.email}</p>
							<p>{item.phone_number}</p>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default Customers;
