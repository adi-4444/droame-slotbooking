import React, { useState } from "react";
import "./EditCustomer.css";

const EditCustomers = ({
	setEditCustomerModal,
	customer,
	submitEditCustomer,
}) => {
	const [customerData, setCustomerData] = useState({
		customer_id: customer._id,
		name: customer.name,
		email: customer.email,
		phone_number: customer.phone_number,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCustomerData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submitEditCustomer(customerData);
	};

	return (
		<>
			<div
				className='darkBG'
				onClick={() => setEditCustomerModal(false)}
			/>
			<div className='centered'>
				<div className='modal'>
					<div className='modalHeader'>
						<h5 className='heading'>Edit Customer</h5>
					</div>
					<button
						className='closeBtn'
						onClick={() => setEditCustomerModal(false)}
					>
						X
					</button>
					<div className='modalContent'>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<label htmlFor='name'>Name : </label>
								<input
									type='text'
									id='name'
									name='name'
									value={customerData.name}
									onChange={handleInputChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='email'>email : </label>
								<input
									type='email'
									id='email'
									name='email'
									value={customerData.email}
									onChange={handleInputChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='phone_number'>
									Phone No :{" "}
								</label>
								<input
									type='text'
									id='phone_number'
									name='phone_number'
									value={customerData.phone_number}
									onChange={handleInputChange}
								/>
							</div>
							<div className='modalActions'>
								<div className='actionsContainer'>
									<button
										className='deleteBtn'
										onClick={() =>
											setEditCustomerModal(false)
										}
									>
										Cancel
									</button>
									<button className='cancelBtn' type='submit'>
										Edit Customer
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
export default EditCustomers;
