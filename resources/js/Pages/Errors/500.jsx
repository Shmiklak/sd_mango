
import {Link} from "@inertiajs/react";

const Error500 = () => {
    return (
        <>
            <div className="error-page">
                <h1>503</h1>
                <p className="mb-5">
                    Something went wrong. Please contact Shmiklak.
                </p>
                <Link className="btn btn-primary" href={route('home')}>Return to home page</Link>
            </div>
        </>
    );
}

export default Error500;
