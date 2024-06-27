import {useForm} from "@inertiajs/react";
import Errors from "@/Components/Errors.jsx";

export const NominatorResponseForm = (props) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        request_id: props.request_id,
        nominator_id: props.auth.user.id,
        comment: '',
        status: 'UNINTERESTED'
    });

    const submit = (e) => {
        e.preventDefault();
        if (data.status === 'ACCEPTED') {
            if (!confirm("Are you sure you want to accept this beatmap? This action will automatically let mapper know about your decision.")) {
                return false;
            }
        }
        post('/update-response');
    }

    return (
        <>
            <h2 className="mt-4 mb-3">Edit my response</h2>
            {/*<p className="mt-2 mb-2">*/}
            {/*    <strong className="accent-text">IMPORTANT NOTE FOR BEATMAP NOMINATORS: </strong>*/}
            {/*    Please do not mark beatmap as "INVALID" in case you are simply not interested in it.*/}
            {/*    In case you are not interested in the map, just skip it. "INVALID" marker should only be used when the*/}
            {/*    beatmap has critical quality issues or does not satisfy the queue rules.*/}
            {/*</p>*/}
            <Errors errors={errors}/>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>
                        Status:
                    </label>
                    <select className="form-control" name="status" id="status" value={data.status}
                            onChange={(e) => setData('status', e.target.value)}>
                        <option value="UNINTERESTED">Not interested</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="MODDED">Modded</option>
                        <option value="RECHECKED">Rechecked</option>
                        <option value="NOMINATED">Nominated</option>
                        <option value="INVALID">Invalid</option>
                        <option value="REMOVE_MY_RESPONSE">Remove my response</option>
                    </select>
                </div>

                {props.auth.user.admin_access ? (<div className="form-group">
                    <label>
                        Nominator:
                    </label>
                    <select className="form-control" name="status" id="status" value={data.nominator_id}
                            onChange={(e) => setData('nominator_id', e.target.value)}>
                        {props.nominators.map((nominator) => (
                            <option value={nominator.id}>{nominator.username}</option>
                        ))}
                    </select>
                </div>) : (<></>)}

                <div className="form-group">
                    <label>
                        Additional comments:
                    </label>
                    <textarea className="form-control" name="comment" id="comment"
                              value={data.comment}
                              onChange={(e) => setData('comment', e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
