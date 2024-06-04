import App from "@/Layouts/App.jsx";
import {Head} from "@inertiajs/react";

const Team = ({auth, members}) => {
    return (
        <>
            <Head title="Team"/>
            <div className="team-page">
                <h1 className="section-title mb-3 text-center">Our team</h1>
                <p className="text-center mb-5">In case you are a beatmap nominator and want to join our subdivision make sure to contact <strong>Basensorex</strong> or <strong>Malphs</strong>.</p>

                <div className="row justify-content-center">
                    {members.map((member, index) => (
                        <div className="col-lg-2 col-sm-4 col-6">
                            <a href={`https://osu.ppy.sh/users/${member.osu_id}`} className="team-page-member" target="_blank" key={index}>
                                <img src={"https://a.ppy.sh/" + member.osu_id} className="team-page-profile-pic" alt="Profile picture"/>
                                <span className="team-page-name">{member.username}</span>
                            </a>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

Team.layout = page => <App children={page}/>
export default Team;
