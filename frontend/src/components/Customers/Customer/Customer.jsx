import React, { useState, useEffect } from "react";
import "./Customer.css";
import { useParams } from "react-router-dom";
import { getAllBookingsById, createBookingById } from "../apis/apis";
import AddBooking from "./Modals/AddBooking/AddBooking";
import Loader from "../../common/loaders/Loader";

const Customer = () => {
	const [customer, setCustomer] = useState();
	const [bookings, setBookings] = useState();
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const { id } = useParams();

	const fetchData = async () => {
		const [customerData, bookingsData] = await getAllBookingsById(id);
		setCustomer(customerData.data);
		setBookings(bookingsData.data);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, [id]);
	const addBookingToCustomer = () => {
		setIsOpen(true);
	};
	const onSubmit = async (newData) => {
		setLoading(true);
		const res = await createBookingById(id, newData);
		const { data, status } = res;
		if (status === 201) {
			setIsOpen(false);
			fetchData();
			console.log(data.message);
			console.log(data.newBooking);
		}
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div>
					<div>Customer Data</div>
					<div className='customer-data'>
						<p>Name: {customer?.name}</p>
						<p>Email: {customer?.email}</p>
						<p>Phone: {customer?.phone_number}</p>
						<button onClick={addBookingToCustomer}>
							Add Booking
						</button>
					</div>
					<div className='customer-bookings'>
						{bookings?.map((booking) => (
							<div key={booking._id} className='customer-booking'>
								<p>Location ID : {booking.location_id}</p>
								<p>Drone Shoe:{booking.drone_shot_id} </p>
								<p>Start Time : {booking.start_time}</p>
								<p>End Time : {booking.end_time}</p>
								<p>Booking Time: {booking.created_time}</p>
								<div className='booking-icons'>
									<div className='edit'></div>
									<div className='delete'></div>
								</div>
							</div>
						))}
						{isOpen && (
							<AddBooking
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								onSubmit={onSubmit}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Customer;
