import {Link} from "@inertiajs/react";

export const AdminLinks = () => {
    return (
        <div className="admin-links">
            <div className="d-flex">
                <Link href={route('edit_team')}>Edit team</Link>
            </div>
        </div>
    )
}
