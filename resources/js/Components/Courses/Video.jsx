import React from "react";
import "video.js/dist/video-js.css";

function Video({ src }) {
    console.log("re render");
    const renderVideoPlayer = () => {
        return (
            <video
                className="video-js vjs-default-skin"
                controls
                autoPlay
                data-setup={`{ "responsive": "true", "fluid": "true", "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "${src}"}] }`}
            ></video>
        );
    };
    return <div>{renderVideoPlayer()}</div>;
}

export default React.memo(Video);
