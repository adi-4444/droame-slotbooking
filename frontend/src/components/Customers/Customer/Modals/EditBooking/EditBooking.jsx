import React, { useState } from "react";
import "./EditBooking.css";

const EditBooking = ({ setEditModalOpen, booking, submitEditBooking }) => {
	const [bookingData, setBookingData] = useState({
		_id: booking._id,
		customer_id: booking.customer_id,
		location_id: booking.location_id,
		drone_shot_id: booking.drone_shot_id,
		start_time: booking.start_time,
		end_time: booking.end_time,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setBookingData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submitEditBooking(bookingData);
	};
	return (
		<>
			<div className='darkBG' onClick={() => setEditModalOpen(true)} />
			<div className='centered'>
				<div className='modal'>
					<div className='modalHeader'>
						<h5 className='heading'>Edit Booking</h5>
					</div>
					<button
						className='closeBtn'
						onClick={() => setEditModalOpen(false)}
					>
						X
					</button>
					<div className='modalContent'>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<label htmlFor='locationId'>
									Location Id:{" "}
								</label>
								<input
									type='text'
									id='locationId'
									name='location_id'
									value={bookingData.location_id}
									onChange={handleInputChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='droneShot'>
									Drone Shote :{" "}
								</label>
								<input
									type='text'
									id='droneShot'
									name='drone_shot_id'
									value={bookingData.drone_shot_id}
									onChange={handleInputChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='startTime'>Start Time : </label>
								<input
									type='text'
									id='startTime'
									name='start_time'
									value={bookingData.start_time}
									onChange={handleInputChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='endTime'>End Time : </label>
								<input
									type='text'
									id='endTime'
									name='end_time'
									value={bookingData.end_time}
									onChange={handleInputChange}
								/>
							</div>
							<div className='modalActions'>
								<div className='actionsContainer'>
									<button
										className='deleteBtn'
										onClick={() => setEditModalOpen(false)}
									>
										Cancel
									</button>
									<button className='cancelBtn' type='submit'>
										Edit Booking
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

export default EditBooking;
