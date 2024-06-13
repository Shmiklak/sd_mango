
import {Link} from "@inertiajs/react";

const Error401 = () => {
    return (
      <>
          <div className="error-page">
              <h1>401</h1>
              <p className="mb-5">
                  You don't have access to this page
              </p>
              <Link className="btn btn-primary" href={route('home')}>Return to home page</Link>
          </div>
      </>
    );
}

export default Error401;
