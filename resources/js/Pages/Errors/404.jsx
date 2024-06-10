import { Link } from "@inertiajs/react";

const Error404 = () => {
    return (
        <>
            <div className="error-page">
                <h1>404</h1>
                <p className="mb-5">Page not found</p>
                <Button asChild>
                    <Link href={route("home")}>
                        Return to home page
                    </Link>
                </Button>
            </div>
        </>
    );
};

export default Error404;
