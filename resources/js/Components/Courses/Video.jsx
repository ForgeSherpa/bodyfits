import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.min.css";

const VideoPlayer = ({ src }) => {
    const playerRef = useRef(null);

    // Use the useEffect Hook to initialize the Video.js player
    useEffect(() => {
        // Initialize the Video.js player
        const player = videojs(playerRef.current, {
            // Include any options you want to set for the player
            responsive: true,
            fluid: true,
            autoplay: 1,
            controls: true,
        });
        // Set the source for the YouTube video
        player.src({
            src,
            type: "video/youtube",
        });
        // Clean up the player when the component unmounts
        return () => player.dispose();
    }, []);

    return (
        <div>
            {/* Use the ref to attach the Video.js player to the DOM */}
            <video
                ref={playerRef}
                className="video-js vjs-default-skin"
            ></video>
        </div>
    );
};

export default VideoPlayer;
