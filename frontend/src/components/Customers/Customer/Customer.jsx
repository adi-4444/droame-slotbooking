import React, { useState, useEffect } from "react";
import "./Customer.css";
import { useParams } from "react-router-dom";
import {
	getAllBookingsById,
	createBookingById,
	deleteBookingById,
	editBookingById,
} from "../apis/apis";
import AddBooking from "./Modals/AddBooking/AddBooking";
import Loader from "../../common/loaders/Loader";
import EditBooking from "./Modals/EditBooking/EditBooking";

const Customer = () => {
	const [customer, setCustomer] = useState();
	const [bookings, setBookings] = useState();
	const [booking, setBooking] = useState();
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

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
	const deleteBooking = async (e, b_id) => {
		e.preventDefault();
		e.stopPropagation();
		let confirmation = window.confirm("Confirm Delete Customer");
		setLoading(true);
		if (confirmation) {
			let { data, status } = await deleteBookingById(id, b_id);
			if (status === 200) {
				console.log(data.message);
				fetchData();
			}
		}
	};
	const editBookingHandler = (e, b) => {
		e.preventDefault();
		e.stopPropagation();
		setBooking(b);
		setEditModalOpen(true);
	};

	const submitEditBooking = async (newData) => {
		console.log("submitEditBooking called");
		setLoading(true);
		let temp = {
			location_id: newData.location_id,
			drone_shot_id: newData.drone_shot_id,
			start_time: newData.start_time,
			end_time: newData.end_time,
		};
		const res = await editBookingById(
			newData.customer_id,
			newData._id,
			temp
		);
		const { data, status } = res;
		if (status === 200) {
			setEditModalOpen(false);
			fetchData();
			console.log(data.message);
			console.log(data.booking);
		}
		setLoading(false);
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
						{Array.isArray(bookings) &&
							bookings?.map((booking) => (
								<div
									key={booking._id}
									className='customer-booking'
								>
									<p>Location ID : {booking.location_id}</p>
									<p>Drone Shoe:{booking.drone_shot_id} </p>
									<p>Start Time : {booking.start_time}</p>
									<p>End Time : {booking.end_time}</p>
									<p>Booking Time: {booking.created_time}</p>
									<div className='booking-icons'>
										<div
											className='edit'
											onClick={(e) =>
												editBookingHandler(e, booking)
											}
										></div>
										<div
											className='delete'
											onClick={(e) =>
												deleteBooking(e, booking._id)
											}
										></div>
									</div>
								</div>
							))}
						{isOpen && (
							<AddBooking
								setIsOpen={setIsOpen}
								onSubmit={onSubmit}
							/>
						)}

						{editModalOpen && (
							<EditBooking
								setEditModalOpen={setEditModalOpen}
								booking={booking}
								submitEditBooking={submitEditBooking}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Customer;
