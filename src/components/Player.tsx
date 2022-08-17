import React from "react";
import Webamp from "webamp";

const { useState, useEffect } = React;

const config = {
  // Optional.
  initialTracks: [
    {
      metaData: {
        artist: "DJ Mike Llama",
        title: "Llama Whippin' Intro",
      },
      // Can be downloaded from: https://github.com/captbaritone/webamp/raw/master/mp3/llama-2.91.mp3
      url: "path/to/mp3/llama-2.91.mp3",
    },
  ],
};

function Player() {
  const [divRef, setDivRef] = useState(null);

  useEffect(() => {
    if (divRef == null) {
      return;
    }
    const webamp = new Webamp(config);
    webamp.renderWhenReady(divRef);

    return () => {
      webamp.dispose();
    };
  }, [divRef]);

  // Check if Winamp is supported in this browser
  if (!Webamp.browserIsSupported()) {
    return <div>Not supported</div>;
  }

  return <div ref={setDivRef} />;
}

export default Player;
