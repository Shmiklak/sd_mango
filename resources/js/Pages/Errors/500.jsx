import { Link } from "@inertiajs/react";

const Error500 = () => {
    return (
        <>
            <div className="error-page">
                <h1>503</h1>
                <p className="mb-5">
                    Something went wrong. Please contact Shmiklak.
                </p>
                <Button asChild>
                    <Link href={route("home")}>Return to home page</Link>
                </Button>
            </div>
        </>
    );
};

export default Error500;
