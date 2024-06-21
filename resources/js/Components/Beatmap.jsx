import { Link } from "@inertiajs/react";
import { BeatmapStatus } from "@/Components/BeatmapStatus.jsx";
import { useEffect, useState, useRef } from "react";
import { usePreview } from "@/Util/stores";
import { Button } from "@/Components/ui/button";
import { Play, Pause } from "lucide-react";

export const Beatmap = (props) => {
    const [cover, setCover] = useState(props.beatmap.cover);
    const { preview, updatePreview } = usePreview((state) => state);

    const isPlaying = preview.includes(String(props.beatmap.beatmapset_id));
    return (
        <div className="beatmap">
            <div className="beatmap-cover">
                <a
                    href={`https://osu.ppy.sh/beatmapsets/${props.beatmap.beatmapset_id}`}
                    target="_blank"
                >
                    <img
                        src={cover}
                        onError={(e) =>
                            setCover("/static/assets/images/bg_error.png")
                        }
                        alt={`${props.beatmap.artist} - ${props.beatmap.title}`}
                        className="beatmap-image"
                    />
                </a>
                <Link
                    href={route("queue_request", props.beatmap.id)}
                    className="btn btn-primary beatmap-view-btn"
                >
                    <img src="/static/assets/images/icons/eye.svg" />
                </Link>
                <BeatmapStatus beatmap={props.beatmap} />
            </div>
            <div className="beatmap-text">
                <div className="text-center mb-3">
                    <Button
                        onClick={() =>
                            isPlaying
                                ? updatePreview("")
                                : updatePreview(props.beatmap.beatmapset_id)
                        }
                        variant={isPlaying ? "default" : "accent"}
                        className="rounded-full p-2"
                    >
                        {isPlaying ? <Pause /> : <Play />}
                    </Button>
                </div>
                <div className="beatmap-title">
                    <a
                        href={`https://osu.ppy.sh/beatmapsets/${props.beatmap.beatmapset_id}`}
                        target="_blank"
                    >
                        {props.beatmap.artist} - {props.beatmap.title}
                    </a>
                </div>
                <div className="beatmap-author">
                    mapped by {props.beatmap.creator}
                </div>
                <div className="row mt-3">
                    <div className="col-4 mt-2">
                        <strong>Genre</strong>
                        <br />
                        {props.beatmap.genre}
                    </div>
                    <div className="col-4 mt-2">
                        <strong>Language</strong>
                        <br />
                        {props.beatmap.language}
                    </div>
                    <div className="col-4 mt-2">
                        <strong>BPM</strong>
                        <br />
                        {props.beatmap.bpm}
                    </div>
                    <div className="col-4 mt-2">
                        <strong>Style</strong>
                        <br />
                        {props.beatmap.map_style}
                    </div>
                </div>
                <p className="mt-3 mapper-comment">
                    <strong>Mapper comment: </strong> {props.beatmap.comment}
                </p>
            </div>
        </div>
    );
};

export const Beatmaps = (props) => {
    const { preview } = usePreview((state) => state);
    const audioRef = useRef(null);

    useEffect(() => {
        if (preview !== "") {
            audioRef.current.volume = 0.3;
            audioRef.current.play();
        }
    }, [preview]);

    return (
        <>
            {props.beatmaps.data.map((beatmap) => (
                <Beatmap key={beatmap.id} beatmap={beatmap} auth={props.auth} />
            ))}
            <audio ref={audioRef} src={preview} />
        </>
    );
};
