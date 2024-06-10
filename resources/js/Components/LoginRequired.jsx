import { Button } from "@/Components/ui/button";
const LoginRequired = () => {
    return (
        <div className="mt-5 login-required text-center">
            Please sign in using your osu! profile to continue.
            <div className="flex justify-center mt-5">
                <Button asChild>
                    <a href={route("osu_login")}>Sign in</a>
                </Button>
            </div>
        </div>
    );
};

export default LoginRequired;
