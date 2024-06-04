import {useState} from "react";

export const Beatmap = ( props ) => {

    return (
        <div className="col-lg-4 col-md-6 col-12">
            <div className="beatmap">
                <div className="beatmap-cover">
                    <a href={`https://osu.ppy.sh/beatmapsets/${props.beatmap.beatmapset_id}`} target="_blank">
                        <img src={props.beatmap.cover} className="beatmap-image"/>
                    </a>
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
                        <div className="col-4">
                            <strong>Genre</strong><br/>
                            {props.beatmap.genre}
                        </div>
                        <div className="col-4">
                            <strong>Language</strong><br/>
                            {props.beatmap.language}
                        </div>
                        <div className="col-4">
                            <strong>BPM</strong><br/>
                            {props.beatmap.bpm}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
