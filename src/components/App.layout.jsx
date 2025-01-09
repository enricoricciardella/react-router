import { Outlet, NavLink } from "react-router-dom";


function AppLayout() {
    return (
        <div>
            <nav className="navigazione">
                <ul>
                    <li>
                        <NavLink to="/">HOME PAGE</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ChiSiamo">CHI SIAMO?</NavLink>
                    </li>
                    <li>
                        <NavLink to="/PostList">PostList</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default AppLayout;