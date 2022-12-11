import React from "react";

export default function VideoItem({ video }) {
    return (
        <div className="m-4" style={{ width: "260px" }}>
            <div>
                <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="rounded-2xl"
                        alt="THUMBNAIL"
                        src={video.snippet.thumbnails.medium.url}
                    />
                    <div className="font-bold my-2  hover:text-blue-800">
                        {video.snippet.title}
                    </div>
                    <div className="text-sm text-gray-800">
                        {video.snippet.description}
                    </div>
                </a>
            </div>
        </div>
    );
}
