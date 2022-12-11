import React from "react";
import VideoItem from "./VideoItem";

function VideoList({ videos }) {
    const listOfVideos = videos.map((video, id) => (
        <VideoItem key={id} video={video} />
    ));

    return <div className="grid mx-32 grid-cols-4">{listOfVideos}</div>;
}

export default VideoList;
