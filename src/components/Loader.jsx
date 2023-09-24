import React from "react";

export function Loader() {
    return (
        <div className="loader-container">
            <div class="loader3">
                <div class="bars bar1"></div>
                <div class="bars bar2"></div>
                <div class="bars bar3"></div>
                <div class="bars bar4"></div>
                <div class="bars bar5"></div>
                <div class="bars bar6"></div>
                <div class="bars bar7"></div>
                <div class="bars bar8"></div>
                <div class="bars bar9"></div>
                <div class="bars bar10"></div>
            </div>
            <br />
            <p class="loading-text">Retrieving data from Spotify...</p>
        </div>
    )
}