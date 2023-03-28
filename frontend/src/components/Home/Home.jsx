import "./Home.css";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
	let location = window.location.pathname;
	const navigate = useNavigate();
	useEffect(() => {
		if (location === "/") {
			navigate("/customers");
		}
		// eslint-disable-next-line
	}, []);
	return (
		<div className='home-component'>
			<center>
				<h2>Welcome ! Client</h2>
			</center>
			<Outlet />
		</div>
	);
};

export default Home;
