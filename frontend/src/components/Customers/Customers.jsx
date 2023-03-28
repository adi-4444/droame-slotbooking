import React, { useEffect, useState } from "react";
import "./Customers.css";
import { getAllCustomer, createCustomer } from "./apis/apis";
import Loader from "../common/loaders/Loader";
import { Link } from "react-router-dom";
import AddCustomers from "./AddCustomers/AddCustomers";

const Customers = () => {
	const [customers, setCustomers] = useState();
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
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
	const addCustomer = () => {
		setIsOpen(true);
	};
	const onSubmit = async (newData) => {
		setLoading(true);
		const res = await createCustomer(newData);
		const { data, status } = res;
		if (status === 201) {
			setIsOpen(false);
			fetchData();
			console.log(data.statusText + "Successfully");
			console.log(data);
		}
	};
	return (
		<div>
			<div className='header'>
				<h1>All Customers</h1>
				<button onClick={addCustomer}>Add Customer</button>
			</div>
			{isOpen && (
				<AddCustomers
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					onSubmit={onSubmit}
				/>
			)}
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
