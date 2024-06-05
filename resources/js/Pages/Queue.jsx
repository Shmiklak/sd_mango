import {Head, Link} from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import LoginRequired from "@/Components/LoginRequired.jsx";
import {Beatmap} from "@/Components/Beatmap.jsx";

const Queue = ({ auth, beatmaps }) => {
    return (
        <>
            <Head title="Queue"/>
            { auth.user === null ? (<LoginRequired/>) : (<>
                <div className="text-center">
                    <h1 className="section-title text-center">Queue</h1>
                </div>
                <div className="row justify-content-center">
                    {beatmaps.data.map((beatmap) => (
                        <Beatmap beatmap={beatmap} auth={auth}/>
                    ))}
                </div>

                <nav className="mt-5 mb-5">
                    <ul className="pagination justify-content-center">
                        {beatmaps.links.map((link) => (
                            <li className={link.url === null ? "page-item disabled" : (link.active ? "page-item active" : "page-item")}>
                                <Link className="page-link" href={link.url} tabIndex="-1" dangerouslySetInnerHTML={{__html: link.label}}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </>)}
        </>
    )
}

Queue.layout = page => <App children={page}/>
export default Queue;
