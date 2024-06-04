import {Link} from "@inertiajs/react";

export default function MenuLink({ link, text }) {
    return (
        <li className="page-header-nav__item">
            <Link className={route().current().startsWith(link) ? 'page-header-nav__link active' : 'page-header-nav__link'} href={ route(link) }>
                {text}
            </Link>
        </li>
    )
}
