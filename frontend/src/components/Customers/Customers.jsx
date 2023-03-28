import React, { useEffect, useState } from "react";
import "./Customers.css";
import {
	getAllCustomer,
	createCustomer,
	deleteCustomerById,
	editCustomerById,
} from "./apis/apis";
import Loader from "../common/loaders/Loader";
import { Link } from "react-router-dom";
import AddCustomers from "./AddCustomers/AddCustomers";
import EditCustomers from "./EditCustomer/EditCustomer";

const Customers = () => {
	const [customers, setCustomers] = useState();
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [editCustomerModal, setEditCustomerModal] = useState(false);
	const [customer, setCustomer] = useState();
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
	const deleteCustomer = async (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		let confirmation = window.confirm("Confirm Delete Customer");
		if (confirmation) {
			setLoading(true);
			let { status, data } = await deleteCustomerById(id);
			if (status === 200) {
				console.log(data.message);
				fetchData();
			}
		}
		setLoading(false);
	};
	const editCustomerHandler = (e, b) => {
		e.preventDefault();
		e.stopPropagation();
		setCustomer(b);
		setEditCustomerModal(true);
	};
	const submitEditCustomer = async (newData) => {
		console.log(newData);
		setLoading(true);
		let temp = {
			name: newData.name,
			email: newData.email,
			phone_number: newData.phone_number,
		};
		const res = await editCustomerById(newData.customer_id, temp);
		const { data, status } = res;
		if (status === 200) {
			setEditCustomerModal(false);
			fetchData();
			console.log(data.message);
			console.log(data.updatedCustomer);
		}
		setLoading(false);
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
					{Array.isArray(customers) &&
						customers?.map((item) => (
							<Link
								to={`/customers/${item._id}`}
								className='customer'
								key={item._id}
							>
								<h4>{item.name}</h4>
								<p>{item.email}</p>
								<p>{item.phone_number}</p>
								<div className='customer-icons'>
									<div
										className='edit'
										onClick={(e) =>
											editCustomerHandler(e, item)
										}
									></div>
									<div
										className='delete'
										onClick={(e) =>
											deleteCustomer(e, item._id)
										}
									></div>
								</div>
							</Link>
						))}
					{editCustomerModal && (
						<EditCustomers
							setEditCustomerModal={setEditCustomerModal}
							customer={customer}
							submitEditCustomer={submitEditCustomer}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default Customers;
