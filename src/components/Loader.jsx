import React from "react";

export function Loader() {
    return (
        <div className="loader-container" id="load">
            <div class="loading">
                <div class="obj"></div>
                <div class="obj"></div>
                <div class="obj"></div>
                <div class="obj"></div>
                <div class="obj"></div>
                <div class="obj"></div>
                <div class="obj"></div>
                <div class="obj"></div>
            </div>
            <br />
            <p class="loading-text">Retrieving data from Spotify...</p>
        </div>
    )
}