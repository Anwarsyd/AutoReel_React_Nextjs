import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) {
  const { fps } = useVideoConfig();
  const frame=useCurrentFrame()
  const getDureationFrame = () => {
    setDurationInFrame[(captions[captions?.length - 1]?.end / 1000) * fps];
    return (captions[captions?.length - 1]?.end / 100) * fps;
  };

  const getCurrentCaptions=()=>{
    const currentTime=frame/30*1000 // convert frame number into milliseconds {30fps}

    const currentCaption=captions.find((word)=>currentTime>=word.start && currentTime<=word.end)

    return currentCaption?currentCaption?.text:'';
  }

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {
        <>
          <Sequence
            key={index}
            from={(index * getDureationFrame()) / imageList?.length}
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
                }}
              />
              <AbsoluteFill style={{
                color:'white',
                justifyContent:'center',
                top:undefined,
                bottom:50,
                height:150,
                textAlign:'center',
                width:'100%'
              }}>
                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        </>;
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
