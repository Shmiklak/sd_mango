export const BeatmapStatus = (props) => {

    return (
        <div className={`beatmap-status beatmap-status-${props.beatmap.status}`}>
            {props.beatmap.status} {props.beatmap.status === 'ACCEPTED' ? (<span>({props.beatmap.total_accepted})</span>) :
            (props.beatmap.status === 'NOMINATED' ? (<span>({props.beatmap.total_nominated})</span>) : (<></>))}
        </div>
    )
}
