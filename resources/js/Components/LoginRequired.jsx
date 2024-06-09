const LoginRequired = () => {
    return (
        <div className="mt-5 login-required text-center">
            Please sign in using your osu! profile to continue.
            <div className="flex justify-center mt-5">

                <a className="btn btn-primary" href={route('osu_login')}>Sign in</a>
            </div>
        </div>
    )
}

export default LoginRequired;
