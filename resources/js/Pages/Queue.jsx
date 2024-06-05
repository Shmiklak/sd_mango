import {Head, Link, useForm} from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import LoginRequired from "@/Components/LoginRequired.jsx";
import {Beatmap} from "@/Components/Beatmap.jsx";

const Queue = ({ auth, beatmaps }) => {

    let params = new URLSearchParams(window.location.search);

    const { data, setData, get, processing, errors, reset } = useForm({
        map_style: params.get('map_style') === null ? 'all' : params.get('map_style'),
        status: params.get('status') === null ? 'all' : params.get('status'),
    });

    const submit = (e) => {
        e.preventDefault();
        get('/queue', {
            preserveState: true
        });
    }

    return (
        <>
            <Head title="Queue"/>
            { auth.user === null ? (<LoginRequired/>) : (<>
                <div className="text-center">
                    <h1 className="section-title text-center">Queue</h1>
                </div>

                <div className="queue-filter">
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="col-lg-4">
                                <label>
                                    Request status
                                </label>
                                <select className="form-control" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="REJECTED">Rejected</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="NOMINATED">Nominated</option>
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label>
                                    Map style
                                </label>
                                <select className="form-control" value={data.map_style} onChange={(e) => setData('map_style', e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="Jumps">Jumps</option>
                                    <option value="Streams">Streams</option>
                                    <option value="Difficult mechanics">Difficult mechanics</option>
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label>&nbsp;</label>
                                <button disabled={processing} className="btn btn-primary w-100">Filter</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="row justify-content-center">
                    {beatmaps.data.map((beatmap) => (
                        <Beatmap key={beatmap.id} beatmap={beatmap} auth={auth}/>
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
