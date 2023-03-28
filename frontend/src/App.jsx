import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../frontend/src/components/sidebar/Sidebar";
import Customers from "../../frontend/src/components/Customers/Customers";
import AllBookings from "../../frontend/src/components/Bookings/AllBookings";
import Home from "../../frontend/src/components/Home/Home";
import Customer from "./components/Customers/Customer/Customer";

function App() {
	return (
		<div className='app-component'>
			<Router>
				<Sidebar />
				<Routes>
					<Route path='/' element={<Home />}>
						<Route path='customers' element={<Customers />} />
						<Route path='customers/:id' element={<Customer />} />
						<Route path='allBookings' element={<AllBookings />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
