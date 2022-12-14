import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.min.css";

const VideoPlayer = ({ src }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const player = videojs(playerRef.current, {
            responsive: true,
            fluid: true,
            autoplay: 1,
            controls: true,
        });

        player.src({
            src,
            type: "video/youtube",
        });

        return () => player.dispose();
    }, []);

    return (
        <div>
            <video
                ref={playerRef}
                className="video-js vjs-default-skin"
            ></video>
        </div>
    );
};

export default VideoPlayer;
