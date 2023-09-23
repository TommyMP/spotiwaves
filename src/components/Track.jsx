import React, { useState, useRef } from "react";
import { useEffect } from "react";

export function Track(props) {

    const [track, setTrack] = useState(props.track);
    const canvasRef = useRef(null)

    useEffect(() => {
        const duration = track.audioAnalysis.track.duration;
        const segments = track.audioAnalysis.segments.map(segment => {
            let loudness = segment.loudness_max;
            return {
                start: segment.start / duration,
                duration: segment.duration / duration,
                loudness: 1 - (Math.min(Math.max(loudness, -35), 0) / -35)
            }
        });

        let min = Math.min(...segments.map(segment => segment.loudness))
        let max = Math.max(...segments.map(segment => segment.loudness))

        const levels = []

        for (let i = 0.000; i < 1; i += 0.001) {
            let s = segments.find(segment => {
                return i <= segment.start + segment.duration;
            });

            let loudness = Math.round((s.loudness / max) * 100) / 100

            levels.push(
                loudness
            )
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        for (let x = 0; x < canvas.width; x++) {
            if (x % 8 == 0) {
                let i = Math.ceil(levels.length * (x / canvas.width));
                let h = Math.round(levels[i] * canvas.height) / 2;

                context.fillStyle = "green";
                context.beginPath();
                context.roundRect(x, (canvas.height / 2) - h, 4, h, [10, 10, 0, 0]);
                context.fill();

                context.beginPath();
                context.roundRect(x, (canvas.height / 2), 4, h, [0, 0, 10, 10]);
                context.fill();
            }
        }
    }, [])

    return (
        <div>
            <canvas height={80} width={200} ref={canvasRef}></canvas>
            <h3>{props.track.name}</h3>
            <h4>{props.track.artists[0].name}</h4>
        </div>
    )
}