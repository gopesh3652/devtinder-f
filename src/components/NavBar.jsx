import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, GUEST_IMAGE } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await axios.post(
				BASE_URL + "/logout",
				{},
				{
					withCredentials: true,
				}
			);

			dispatch(removeUser());
			return navigate("/login");
		} catch (err) {
			if (err.status === 401) {
				navigate("/login");
			}
		}
	};

	return (
		<div className="navbar bg-base-300">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost text-xl">
					🧑‍💻 DevTinder
				</Link>
			</div>
			{user && (
				<div className="flex-none gap-2">
					<div className="form-control">
						Welcome, {user?.firstName || "Guest"}!
					</div>
					<div className="dropdown dropdown-end mx-5">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img alt="Profile photo" src={user?.photoUrl || GUEST_IMAGE} />
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							<li>
								<Link to="/profile" className="justify-between">
									Profile
									<span className="badge">New</span>
								</Link>
							</li>
							<li>
								<Link to="/connections">Connection</Link>
							</li>
							<li>
								<Link to="/requests">Requests</Link>
							</li>
							<li>
								<Link to="/premium">Premium</Link>
							</li>
							<li>
								<a onClick={handleLogout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavBar;
