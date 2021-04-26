import * as React from "react";
import { Box, Container, Button, Image } from "@chakra-ui/react";
import Webcam from "react-webcam";
import DragButton from "./DragButton";
const App = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc: any = webcamRef?.current?.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);
  console.log("W", document.body.clientHeight);
  return (
    <Box w="100%" bg="gray">
      <DragButton
        position={{ x: document.body.clientWidth - 100, y: 0 }}
        // position={{
        // 	x: document.body.clientWidth - 100,
        // 	y: document.body.clientHeight - 100
        // }}
        setPosition={setPosition}
      />
      <Container position="absolute">
        {!imgSrc ? (
          <Container>
            {/* <AspectRatio ratio={16 / 9} maxW="1000"> */}
            <Webcam
              videoConstraints={{
                width: 600,
                height: 720,
                facingMode: "user"
              }}
              // width="100%"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            {/* </AspectRatio> */}
            <Button my="2" border="1px solid black" onClick={capture}>
              Capture photo
            </Button>
          </Container>
        ) : (
          <Container>
            <Image alt="selfie" src={imgSrc || ""} />
            <DragButton setPosition={null} position={position} />
            <Button
              mx="auto"
              my="2"
              border="1px solid black"
              onClick={() => setImgSrc(null)}
            >
              Reset
            </Button>
          </Container>
        )}
      </Container>
    </Box>
  );
};
export default App;
