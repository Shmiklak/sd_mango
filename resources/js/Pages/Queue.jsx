import { Head, Link, useForm } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import LoginRequired from "@/Components/LoginRequired.jsx";
import { Beatmap, Beatmaps } from "@/Components/Beatmap.jsx";
import { usePreview } from "@/Util/stores";
import { useEffect, useRef } from "react";

const Queue = ({ auth, beatmaps, title }) => {
    const { preview, updatePreview } = usePreview();
    const audioRef = useRef(null);

    let params = new URLSearchParams(window.location.search);
    let query_url = window.location.pathname;

    const { data, setData, get, processing, errors, reset } = useForm({
        map_style:
            params.get("map_style") === null ? "all" : params.get("map_style"),
        status:
            params.get("status") === null ? "default" : params.get("status"),
    });

    const submit = (e) => {
        e.preventDefault();
        get(query_url, {
            preserveState: true,
        });
    };

    useEffect(() => {
        if (preview !== "") {
            audioRef.current.volume = 0.3;
            audioRef.current.play();
        }
    }, [preview]);

    return (
        <>
            <Head title={title} />
            {auth.user === null ? (
                <LoginRequired />
            ) : (
                <>
                    <div className="text-center">
                        <h1 className="section-title mb-3 text-center">
                            {title}
                        </h1>
                    </div>

                    <div className="alert alert-warning">
                        <p>
                            If you support what we do here at{" "}
                            <strong>sd_mango</strong> and want to shout us out
                            in your map's description, add this to it! (This is
                            entirely optional!)
                        </p>
                        <code className="mt-2 code-block">
                            [notice][centre][size=150]
                            <br />
                            🥭[url=https://x.com/sd_mango_osu][b][i]This map was
                            brought to you by sd_mango [/b][/i][/url]🥭
                            <br />
                            [/centre][/size][/notice]
                        </code>
                    </div>

                    <div className="queue-filter">
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>Request status</label>
                                    <select
                                        className="form-control"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="default">Default</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="ACCEPTED">
                                            Accepted
                                        </option>
                                        <option value="NOMINATED">
                                            Nominated
                                        </option>
                                        <option value="INVALID">Invalid</option>
                                        <option value="HIDDEN">Hidden</option>
                                    </select>
                                </div>
                                <div className="col-lg-4">
                                    <label>Map style</label>
                                    <select
                                        className="form-control"
                                        value={data.map_style}
                                        onChange={(e) =>
                                            setData("map_style", e.target.value)
                                        }
                                    >
                                        <option value="all">All</option>
                                        <option value="Jumps">Jumps</option>
                                        <option value="Streams">Streams</option>
                                        <option value="Both">
                                            Both
                                        </option>
                                    </select>
                                </div>
                                <div className="col-lg-4">
                                    <label>&nbsp;</label>
                                    <button
                                        disabled={processing}
                                        className="btn btn-primary w-100"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Beatmaps beatmaps={beatmaps} auth={auth} />
                    </div>

                    <nav className="mt-5 mb-5">
                        <ul className="pagination justify-content-center">
                            {beatmaps.links.map((link) => (
                                <li
                                    className={
                                        link.url === null
                                            ? "page-item disabled"
                                            : link.active
                                              ? "page-item active"
                                              : "page-item"
                                    }
                                >
                                    <Link
                                        className="page-link"
                                        href={link.url}
                                        tabIndex="-1"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <audio ref={audioRef} src={preview} onEnded={() => {
                        updatePreview("")
                    }}/>
                </>
            )}
        </>
    );
};

Queue.layout = (page) => <App children={page} />;
export default Queue;
