import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
	const handleBuyClick = async (type) => {
		const order = await axios.post(
			BASE_URL + "/payment/create",
			{ membershipType: type },
			{ withCredentials: true }
		);

		const { keyId, amount, currency, orderId, notes } =
			order.data.savedPaymentDetails;
		// it will open the razo pay dialogue box
		const options = {
			key: keyId,
			amount,
			currency,
			name: "Dev Tinder",
			description: "Connect to other developers.",
			order_id: orderId,
			prefill: {
				name: notes.firstName + " " + notes.lastName,
				email: notes.emailId,
				contact: 9999999999,
			},
			theme: {
				color: "#F37254",
			},
		};
		const rzp = new window.Razorpay(options);
		rzp.open();
	};

	return (
		<div>
			<div className="flex w-full m-10">
				<div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
					<h1 className="font-bold text-3xl">Silver Membership</h1>
					<ul>
						<li>100 conection request per month</li>
						<li>☑️ silver tick</li>
						<li>chat with connections</li>
						<li>3 months</li>
					</ul>
					<button
						onClick={() => handleBuyClick("silver")}
						className="btn bg-gray-700"
					>
						Buy Silver
					</button>
				</div>
				<div className="divider divider-horizontal">OR</div>
				<div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
					<h1 className="font-bold text-3xl">Gold Membership</h1>
					<ul>
						<li>♾️ Unlimited conection request per month</li>
						<li>🌟 Gold tick</li>
						<li>chat with connections</li>
						<li>6 months</li>
					</ul>
					<button
						onClick={() => handleBuyClick("gold")}
						className="btn bg-yellow-700"
					>
						Buy Gold
					</button>
				</div>
			</div>
		</div>
	);
};

export default Premium;
