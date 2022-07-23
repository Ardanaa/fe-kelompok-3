import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/floatingButton.css"

function FloatingButton() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [user, setUser] = useState({});

	useEffect(() => {
		const validateLogin = async () => {
			try {
				const token = localStorage.getItem("token");
				const currentUserRequest = await axios.get(
					"http://binar-secondhand-be.herokuapp.com/v1/auth/me",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const currentUserResponse = currentUserRequest.data;

				if (currentUserResponse.status) {
					setUser(currentUserResponse.data.user);
				}
			} catch (err) {
				setIsLoggedIn(false);
			}
		};

		validateLogin();
	}, []);

	const handleJual = () => {
		isLoggedIn ? user.picture ? user.city ? user.address ? user.phoneNumber ?
		navigate('/infoProduct') : 
		navigate(`/infoProfile/${user.id}`) : 
		navigate(`/infoProfile/${user.id}`) : 
		navigate(`/infoProfile/${user.id}`) : 
		navigate(`/infoProfile/${user.id}`) : 
		navigate('/login')
	}


	return (
		<Button onClick={handleJual} className="ms-auto pe-4 radius-secondary floating-button bg-color-tertiary border-0">
			<FiPlus className="mx-2 mb-1" />
			Jual
		</Button>
	);
}

export default FloatingButton;
