import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [currentTitle, setCurrentTitle] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
      setCurrentTitle(tabs[0].title);
    });
  }, []);

  const copy = (str: string | undefined) => {
    str &&
      navigator.clipboard.writeText(str).then(() => {
        toast.success("コピーできたよ！");
      });
  };

  return (
    <div style={{ width: 500, height: 350, padding: 0 }}>
      <div
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: "hsl(171, 100%, 41%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          color: "white",
          fontSize: 20,
          marginBottom: "1%",
        }}
      >
        <p>URL Copybox</p>
        <p style={{ fontSize: 8 }}>Var. 1.0</p>
      </div>

      <div style={{ width: "100%", padding: "1rem" }}>
        <div className="box">
          <p className="label">現在のページ</p>
          <p style={{ fontSize: 12, fontWeight: "bold" }}>{currentTitle}</p>
          <p style={{ fontSize: 10 }}>{currentURL}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button" onClick={() => copy(currentURL)}>
            URLコピー
          </button>
          <button
            className="button mx-1"
            onClick={() => copy(`${currentTitle}\n${currentURL}`)}
            style={{ flexGrow: 1 }}
          >
            タイトルとURLをコピー
          </button>
          <button className="button" onClick={() => copy(currentTitle)}>
            タイトルコピー
          </button>
        </div>
        <button
          className="button is-primary mt-1"
          onClick={() => copy(`[${currentTitle}](${currentURL})`)}
          style={{ width: "100%" }}
        >
          Markdownコピー
        </button>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
