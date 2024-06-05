import {Link, router} from "@inertiajs/react";
import MenuLink from "@/Components/MenuLink.jsx";
import {useState} from "react";

const PageHeader = props => {

    const [menuOpen, setMenuOpen] = useState(false);
    router.on('start', () => {
        setMenuOpen(false)
    })
    return (
        <>
            <header className="page-header">
                <div className="container">
                    <nav className="page-header-nav">
                        <div className="page-header-nav__logo">
                            <Link href={route('home')}>
                                <img src="/static/assets/images/mango.png" alt="#sd_mango"/>
                            </Link>
                        </div>
                        <ul className={menuOpen ? "page-header-nav__menu active" : "page-header-nav__menu"}>
                            <li className="page-header-nav__menu_mobile_logo">
                                <Link href={route('home')}>
                                    <img src="/static/assets/images/mango.png" alt="#sd_mango"/>
                                </Link>
                            </li>
                            <MenuLink link="home" text="Home"/>
                            <MenuLink link="send_request" text="Request"/>
                            <MenuLink link="queue" text="Queue"/>
                            <MenuLink link="team" text="Team"/>
                        </ul>
                        <div className="page-header-nav__profile">
                            {props.auth.user === null ? (
                                <a className="page-header-nav__profile__link btn btn-primary" href={route('osu_login')}>Sign in</a>
                            ) : (
                                <div className="page-header-nav__profile__authorised">
                                    <div className="page-header-nav__profile__authorised__text">
                                        <div className="page-header-nav__profile__authorised__title">
                                            Hello, {props.auth.user.username}
                                        </div>
                                        <div className="page-header-nav__profile__authorised__signout">
                                            <a href={route('logout')}>Sign out</a>
                                        </div>
                                    </div>
                                    <img src={"https://a.ppy.sh/" + props.auth.user.osu_id} alt="Profile picture"/>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-primary mobile-burger">
                            <img src="/static/assets/images/icons/menu.svg"/>
                        </button>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default PageHeader;
