import { useState } from "react";
import axios from "axios";
import { CodeBlock, dracula } from "react-code-blocks";
import pro from "./pro.json";
import video from "./video.json";
import Lottie from "lottie-react";
import VideoList from "./VideoList.js";
import youtube from "./api/Youtube";

function App() {
  const [comment, setComment] = useState("");
  const [data, setData] = useState();
  const [language, setLanguage] = useState("");
  const [videos, setVideos] = useState([]);
  const [link, setLink] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let postData = { data: comment };
    axios
      .post("https://effulgent-pothos-6dbfa7.netlify.app/", postData)
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
          key: "AIzaSyAc90K8NVx0OTE6lHH0t3Bf-Xr6QCROEy8",
          q: comment,
        },
      })
      .then((result) => {
        setVideos(result.data.items);
        console.log(videos);
      });
  };

  const handleSubmitLink = (e) => {
    e.preventDefault();
    let id = link.split("=")[1];
    setId(id);
  };

  return (
    <div>
      <div className="poppins text-2xl font-bold text-white bg-black py-2 flex justify-center">
        CodeWizard
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
            className="bg-blue-700 hover:bg-white hover:text-blue-700 border-blue-700  border  text-white h-12 py-2 pt-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline poppins"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-between  mx-20">
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
        {/* <div className="poppins text-sm grid grid-cols-4 gap-4 mr-20">
          <a
            className="hover:text-blue-800"
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode
          </a>
          <a
            className="hover:text-blue-800"
            href="https://www.geeksforgeeks.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            GeeksForGeeks
          </a>
          <a
            className="hover:text-blue-800"
            href="https://www.hackerrank.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            HackerRank
          </a>
          <a
            className="hover:text-blue-800"
            href="https://www.codechef.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codechef
          </a>
        </div> */}
      </div>
      {data === undefined ? (
        <div className="my-6">
          <Lottie
            style={{ height: "500px" }}
            animationData={pro}
            loop={false}
          />
        </div>
      ) : (
        <div className="px-20 pb-20">
          <div className="grid grid-cols-2">
            <CodeBlock text={data.text} language={language} theme={dracula} />
            <div>
              <form onSubmit={handleSubmitLink} className="flex justify-center">
                <input
                  style={{ width: "350px" }}
                  className="shadow-lg appearance-none border border-rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline signUp-font"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                />

                <button
                  className="bg-blue-700 hover:bg-white hover:text-blue-700 border-blue-700 border  text-white h-12 py-2 pt-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline poppins"
                  type="submit"
                >
                  Open
                </button>
              </form>
              <div className="mx-4">
                {id ? (
                  <iframe
                    frameBorder="0"
                    height="350px"
                    width="100%"
                    title="Video Player"
                    src={`https://www.youtube.com/embed/${id}`}
                  />
                ) : (
                  <div>
                    <Lottie
                      className="mt-8"
                      style={{ height: "300px" }}
                      animationData={video}
                      loop={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
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
      <div className="poppins text-lg text-white bg-black py-2 flex justify-center">
        made with ❤️ for programmers
      </div>
    </div>
  );
}

export default App;
