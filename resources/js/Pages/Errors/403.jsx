
import {Link} from "@inertiajs/react";

const Error403 = () => {
    return (
      <>
          <div className="error-page">
              <h1>403</h1>
              <p className="mb-5">
                  You are not authorised
              </p>
              <Link className="btn btn-primary" href={route('home')}>Return to home page</Link>
          </div>
      </>
    );
}

export default Error403;
