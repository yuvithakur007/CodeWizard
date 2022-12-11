import { useState } from "react";
import axios from "axios";
import { CodeBlock, dracula } from "react-code-blocks";
import pro from "./pro.json";
import Lottie from "lottie-react";
import VideoList from "./VideoList.js";
import youtube from "./api/Youtube";

function App() {
    const [comment, setComment] = useState("");
    const [data, setData] = useState();
    const [language, setLanguage] = useState("");
    const [videos, setVideos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let postData = { data: comment };
        axios
            .post("http://localhost:3001/", postData)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        youtube
            .get("search", {
                params: {
                    part: "snippet",
                    maxResults: 10,
                    key: "YOUTUBE_API_KEY",
                    q: comment,
                },
            })
            .then((result) => {
                setVideos(result.data.items);
                console.log(videos);
            });
    };
    return (
        <div>
            <div className="poppins text-2xl font-bold text-white bg-black py-2 flex justify-center">
                Heavy Coder
            </div>
            <div className="p-4 flex justify-center">
                <form onSubmit={handleSubmit} className="flex justify-center">
                    <input
                        style={{ width: "550px" }}
                        className="shadow-lg appearance-none border border-rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline signUp-font"
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comment"
                    />

                    <button
                        className="bg-black hover:bg-white hover:text-black border-black border  text-white h-12 py-2 pt-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline poppins"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="flex justify-center">
                <select
                    className="poppins my-4 mt-0 shadow-lg p-1"
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                    }}
                >
                    <option value="">Language</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="py">Python</option>
                    <option value="js">Javascript</option>
                    <option value="ruby">Ruby</option>
                    <option value="go">Golang</option>
                    <option value="java">Java</option>
                </select>
            </div>
            {data === undefined ? (
                <div className="mt-6">
                    <Lottie
                        style={{ height: "500px" }}
                        animationData={pro}
                        loop={false}
                    />
                </div>
            ) : (
                <div className="px-20 pb-20">
                    <CodeBlock
                        text={data.text}
                        language={language}
                        theme={dracula}
                    />
                    {videos ? (
                        <div>
                            <div className="flex justify-start poppins text-xl mt-8 pb-4 font-bold">
                                Suggested Videos
                            </div>
                            <VideoList videos={videos} />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
