import React from "react";
import CarouselItem from "./CarouselItem";

export default function AutoplayCarousel(props) {
    return (
        <div className="carousel home-page-section">
            <h2 className="text-center section-title mb-3">
                Ranked Beatmaps
            </h2>
            <div className="carousel-container">
                <div className="carousel-track">
                    {props.beatmaps.map((beatmap) => {
                        return (
                            <CarouselItem
                                beatmap={beatmap}
                            ></CarouselItem>
                        );
                    })}
                    {props.beatmaps.map((beatmap) => {
                        return (
                            <CarouselItem
                                beatmap={beatmap}
                            ></CarouselItem>
                        );
                    })}
                </div>
            </div>
        </div>

    );
}
