import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
const Error401 = () => {
    return (
        <>
            <div className="error-page">
                <h1>401</h1>
                <p className="mb-5">You don't have access to this page</p>
                <Button asChild>
                    <Link href={route("home")}>
                        Return to home page
                    </Link>
                </Button>
            </div>
        </>
    );
};

export default Error401;
