import React, { useState, useEffect } from "react";
import Loader from "../common/loaders/Loader";
import "./AllBookings.css";
import { getAllBookings } from "./apis/apis";

const AllBookings = () => {
	const [bookings, setBookings] = useState();
	const [loading, setLoading] = useState(true);
	const fetchData = async () => {
		let res = await getAllBookings();
		let { status, data } = res;
		if (status === 200) {
			setBookings(data);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<h1>All Bookings</h1>
			{loading ? (
				<Loader />
			) : (
				<div className='customer-bookings'>
					{Array.isArray(bookings) &&
						bookings?.map((booking) => (
							<div key={booking._id} className='customer-booking'>
								<p>Location ID : {booking.location_id}</p>
								<p>Drone Shoe:{booking.drone_shot_id} </p>
								<p>Start Time : {booking.start_time}</p>
								<p>End Time : {booking.end_time}</p>
								<p>Booking Time: {booking.created_time}</p>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default AllBookings;
