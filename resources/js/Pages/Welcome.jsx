import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    console.log(auth);
    return (
        <>
            <Head title="Welcome"/>

            <a className="btn btn-primary" href={route('osu_login')}>Авторизоваться</a>
        </>
    );
}
