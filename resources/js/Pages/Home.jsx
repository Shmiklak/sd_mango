import React from "react";
import { Head, Link } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import { Button } from "@/Components/ui/button";
const Home = () => {
    return (
        <>
            <Head title="Home" />
            <div className="home-page w-full">
                <div className="home-page-section text-center">
                    <img
                        src="/static/assets/images/banner2.png"
                        className="w-100"
                    />
                    <h1 className="my-4 text-4xl font-bold">
                        Welcome to #sd_mango queue!
                    </h1>
                    <p>
                        #sd_mango is a team of{" "}
                        <a href="https://osu.ppy.sh/groups/28" target="_blank">
                            Beatmap Nominators
                        </a>{" "}
                        united to promote the beatmaps <strong>YOU</strong>{" "}
                        like.
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="max-w-2xl">
                        <div className="home-page-section text-center">
                            <h2 className="section-title mb-3">Our Goal</h2>
                            <p className="mb-3">
                                sd_mango's goal is to reconnect the playerbase
                                with the ranked section once again by promoting
                                a variety of simple jump or stream maps,
                                including highly difficult mechanics focused
                                maps designed for top players to push their
                                limits.
                            </p>
                            <p className="mb-5">
                                By promoting more of these genres of maps, we
                                hope to satisfy the cravings of players who feel
                                like they're constantly replaying the same old
                                maps from years ago, as rarely do maps of their
                                preference seem to get promoted.
                            </p>
                            <Button
                                className="font-extrabold"
                                size="lg"
                                asChild
                            >
                                <Link href={route("send_request")}>
                                    I am convinced, take me to queue
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Home.layout = (page) => <App children={page} />;
export default Home;
