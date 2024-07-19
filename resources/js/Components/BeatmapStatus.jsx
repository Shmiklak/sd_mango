export const BeatmapStatus = (props) => {

    return (
        <div className={props.beatmap.is_ranked ? 'beatmap-status beatmap-status-ranked' : `beatmap-status beatmap-status-${props.beatmap.status}`}>
            {props.beatmap.is_ranked ? 'RANKED' : props.beatmap.status} {props.beatmap.status === 'ACCEPTED' ? (<span>({props.beatmap.total_accepted})</span>) :
            (props.beatmap.status === 'NOMINATED' ? (<span>({props.beatmap.total_nominated})</span>) : (<></>))}
        </div>
    )
}
