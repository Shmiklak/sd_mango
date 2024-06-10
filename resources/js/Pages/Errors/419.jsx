
import {Link} from "@inertiajs/react";

const Error419 = () => {
    return (
      <>
          <div className="error-page">
              <h1>419</h1>
              <p className="mb-5">
                  Your session has expired. Please try again.
              </p>
              <Link className="btn btn-primary" href={route('home')}>Return to home page</Link>
          </div>
      </>
    );
}

export default Error419;
