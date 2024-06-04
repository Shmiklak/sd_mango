import {Head, router, useForm} from "@inertiajs/react";
import LoginRequired from "@/Components/LoginRequired.jsx";
import App from "@/Layouts/App.jsx";
import Errors from "@/Components/Errors.jsx";

const SendRequest = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        beatmap_link: '',
        comments: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/send-request');
    }

    return (
        <>
            <Head title="Send request"/>
            { auth.user === null ? (<LoginRequired/>) : (<>
                <form onSubmit={submit} className="queue-form">
                    <p className="mb-3">
                        There are very few rules for this queue, as long as your map fits the description of a
                        simple/generic
                        jump or stream focused map, or if it's a high difficulty mechanics based map designed for top
                        players
                        pushing their limits, it should be fine to send here.
                    </p>
                    <p className="mb-3">
                        Even if your map is old or graveyarded and was rejected by every BN you asked before, still feel
                        free to
                        send it.
                    </p>

                    <Errors errors={errors}/>

                    <label>
                        Link to your beatmap:
                    </label>
                    <input className="form-control" type="text" name="beatmap_link" id="beatmap_link" required
                           value={data.beatmap_link}
                           onChange={(e) => setData('beatmap_link', e.target.value)}
                    />

                    <label>
                        Additional comments:
                    </label>
                    <textarea className="form-control" name="comments" id="comments"
                              value={data.comments}
                              onChange={(e) => setData('comments', e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary" disabled={processing}>Submit</button>
                </form>
            </>)}
        </>
    )
}

SendRequest.layout = page => <App children={page}/>
export default SendRequest;
