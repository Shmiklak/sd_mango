import React from "react";
import {Link} from "@inertiajs/react";

export default function CarouselItem({ beatmap }) {
    return (
        <div className="carousel-card">
            <div className="beatmap-cover">
                <img src={beatmap.cover}></img>
            </div>
            <div className="beatmap-text">
                <h5>
                    <Link
                        href={route("queue_request", beatmap.id)}
                    >
                        {beatmap.artist} - {beatmap.title} mapped by {beatmap.creator}
                    </Link>
                </h5>
            </div>
        </div>
    );
}
