import {Head, Link} from "@inertiajs/react";
import App from "@/Layouts/App.jsx";

const Home = () => {
    return (
        <>
            <Head title="Home"/>
            <div className="home-page">
                <div className="home-page-section text-center">
                    <img src="/static/assets/images/banner2.png" className="w-100"/>
                    <h1>Welcome to #sd_mango queue!</h1>
                    <p>
                        #sd_mango is a team of <a href="https://osu.ppy.sh/groups/28" target="_blank">Beatmap
                        Nominators</a> united to promote the beatmaps <strong>YOU</strong> like.
                    </p>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-lg-6">
                        <div className="home-page-section text-center">
                            <h2 className="section-title mb-3">
                                Our Goal
                            </h2>
                            <p className="mb-3">
                                sd_mango's goal is to reconnect the playerbase with the ranked section once again by
                                promoting a variety of simple jump or stream maps, including highly difficult mechanics
                                focused maps designed for top players to push their limits.
                            </p>
                            <p>
                                By promoting more of these genres of maps, we hope to satisfy the cravings of players
                                who feel like they're constantly replaying the same old maps from years ago, as rarely
                                do maps of their preference seem to get promoted.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-lg-6">
                        <div className="home-page-section text-center">
                            <h2 className="section-title mb-3">
                                Rules
                            </h2>
                            <p className="mb-3">
                                There are very few rules for this queue, as long as your map fits the description of a simple/generic jump or stream focused map, or if it's a high difficulty mechanics based map designed for top players pushing their limits, it should be fine to send here.
                            </p>
                            <p className="mb-5">
                                Even if your map is old or graveyarded and was rejected by every BN you asked before, still feel free to send it.
                            </p>
                            <Link href={route('send_request')} className="btn btn-primary">I am convinced, take me to queue</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Home.layout = page => <App children={page}/>
export default Home;
