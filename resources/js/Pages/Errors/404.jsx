
import {Link} from "@inertiajs/react";

const Error404 = () => {
    return (
      <>
          <div className="error-page">
              <h1>404</h1>
              <p className="mb-5">
                  Page not found
              </p>
              <Link className="btn btn-primary" href={route('home')}>Return to home page</Link>
          </div>
      </>
    );
}

export default Error404;
