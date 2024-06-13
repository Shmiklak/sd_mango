import {Link} from "@inertiajs/react";
import {BeatmapStatus} from "@/Components/BeatmapStatus.jsx";
import {useState} from "react";

export const Beatmap = ( props ) => {

    const [cover, setCover] = useState(props.beatmap.cover);

    return (
            <div className="beatmap">
                <div className="beatmap-cover">
                    <a href={`https://osu.ppy.sh/beatmapsets/${props.beatmap.beatmapset_id}`} target="_blank">

                        <img src={cover}
                             onError={(e) => setCover('/static/assets/images/bg_error.png')}
                             alt={`${props.beatmap.artist} - ${props.beatmap.title}`}
                             className="beatmap-image"/>
                    </a>
                    <Link href={route('queue_request', props.beatmap.id)} className="btn btn-primary beatmap-view-btn">
                        <img src="/static/assets/images/icons/eye.svg"/>
                    </Link>
                    <BeatmapStatus beatmap={props.beatmap} />
                </div>
                <div className="beatmap-text">
                    <div className="text-center mb-3">
                        <audio controls={true}>
                            <source src={`https://b.ppy.sh/preview/${props.beatmap.beatmapset_id}.mp3`}/>
                        </audio>
                    </div>
                    <div className="beatmap-title">
                        <a href={`https://osu.ppy.sh/beatmapsets/${props.beatmap.beatmapset_id}`} target="_blank">
                            {props.beatmap.artist} - { props.beatmap.title }
                        </a>
                    </div>
                    <div className="beatmap-author">
                        mapped by {props.beatmap.creator}
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 mt-2">
                            <strong>Genre</strong><br/>
                            {props.beatmap.genre}
                        </div>
                        <div className="col-4 mt-2">
                            <strong>Language</strong><br/>
                            {props.beatmap.language}
                        </div>
                        <div className="col-4 mt-2">
                            <strong>BPM</strong><br/>
                            {props.beatmap.bpm}
                        </div>
                        <div className="col-4 mt-2">
                            <strong>Style</strong><br/>
                            {props.beatmap.map_style}
                        </div>
                    </div>
                    <p className="mt-3 mapper-comment">
                        <strong>Mapper comment: </strong> {props.beatmap.comment}
                    </p>
                </div>
    </div>
    )
}
