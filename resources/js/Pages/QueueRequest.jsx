import {Head, Link} from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import {NominatorResponseForm} from "@/Components/NominatorResponseForm.jsx";
import {BeatmapStatus} from "@/Components/BeatmapStatus.jsx";
import {useState} from "react";

const QueueRequest = ({ auth, beatmap }) => {
    const [cover, setCover] = useState(beatmap.cover);
    return (
        <>
            <Head title={`${beatmap.artist} - ${beatmap.title}`} />
            <div className="mt-5 queue-request">
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title text-center">{beatmap.artist} - {beatmap.title}</h1>
                    </div>
                    <div className="col-lg-6">
                        <div className="queue-request-beatmap mb-3">
                            <div className="beatmap-cover">
                                <img src={cover}
                                     onError={(e) => setCover('/static/assets/images/bg_error.png')}
                                     alt={`${beatmap.artist} - ${beatmap.title}`}
                                     className="beatmap-image"/>
                                <BeatmapStatus beatmap={beatmap}/>
                            </div>

                            <div className="beatmap-text">
                                <div className="text-center mb-3">
                                <audio controls={true}>
                                        <source src={`https://b.ppy.sh/preview/${beatmap.beatmapset_id}.mp3`}/>
                                    </audio>
                                </div>
                                <div className="beatmap-author">
                                    mapped by <strong>{beatmap.creator}</strong>
                                </div>
                                <div className="beatmap-author">
                                    requested by <strong>{beatmap.author.username}</strong> at <strong>{new Date(beatmap.created_at).toUTCString()}</strong>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4 mt-2">
                                        <strong>Genre</strong><br/>
                                        {beatmap.genre}
                                    </div>
                                    <div className="col-4 mt-2">
                                        <strong>Language</strong><br/>
                                        {beatmap.language}
                                    </div>
                                    <div className="col-4 mt-2">
                                        <strong>BPM</strong><br/>
                                        {beatmap.bpm}
                                    </div>
                                    <div className="col-4 mt-2">
                                        <strong>Style</strong><br/>
                                        {beatmap.map_style}
                                    </div>
                                </div>
                                <p className="mt-3 mapper-comment">
                                    <strong>Mapper comment: </strong> {beatmap.comment}
                                </p>
                            </div>
                        </div>
                        <a href={`https://osu.ppy.sh/beatmapsets/${beatmap.beatmapset_id}`} target="_blank" className="btn btn-primary mb-5">Open on osu! website</a>
                        <Link href={route('queue')} className="btn btn-default mb-5 mx-2">Back to queue</Link>
                    </div>
                    <div className="col-lg-6">
                        <div className="queue-request-nominators-info mb-5">
                            <h2 className="mb-4">Responses</h2>
                            {beatmap.responses.length === 0 ?
                                (<p>There are no responses available for this beatmap. Please check back later.</p>) :
                                beatmap.responses.map((response, index) => (
                                <div className="nominator-response mb-3">
                                    <p>
                                        <strong>{response.nominator.username}</strong> has marked this beatmap
                                        as <span className="accent-text">{response.status}</span>
                                    </p>

                                    {response.comment !== null ? (
                                        <p className="mapper-comment">
                                            <strong>Comment:</strong> {response.comment}
                                        </p>
                                    ) : (<></>)}
                                </div>
                            ))}
                            { auth.user.elevated_access ? (<NominatorResponseForm auth={auth} responses={beatmap.responses} request_id={beatmap.id}/>) : (<></>) }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

QueueRequest.layout = page => <App children={page}/>
export default QueueRequest;
