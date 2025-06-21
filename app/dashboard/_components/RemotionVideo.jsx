import { transform } from "next/dist/build/swc/generated-native";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDureationFrame = () => {
    setDurationInFrame[(captions[captions?.length - 1]?.end / 1000) * fps];
    return (captions[captions?.length - 1]?.end / 100) * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // convert frame number into milliseconds {30fps}

    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );

    return currentCaption ? currentCaption?.text : "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {

        const startTime=(index * getDureationFrame()) / imageList?.length
        const duration = getDureationFrame();


        const scale =(index)=> interpolate(
          frame,[startTime,startTime+duration/2,startTime+duration] , // zoom in & zoom out
          index%2==0 ?[1,1.8,1]:[1.8,1,1.8],
          {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
        )
        return (
          <>
            <Sequence
              key={index}
              from={startTime}
              durationInFrames={getDureationFrame}
            >
              <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform:`scale(${scale(index)})`
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          </>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
