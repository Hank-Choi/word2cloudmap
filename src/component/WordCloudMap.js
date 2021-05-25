import React, {useState} from 'react';
import ReactWordcloud from 'react-wordcloud';
import wordsExample from "./words";

const WordCloudMap = () => {
  const callbacks = {
    // getWordColor: word => word.value > 50 ? "blue" : "red",
    onWordClick: console.log,
    onWordMouseOver: console.log,
    // getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options = {
    rotations: 1,
    rotationAngles: [0, 0],
    fontFamily: "impact",
  };
  const [words, setWords] = useState(wordsExample)
  return <ReactWordcloud
    callbacks={callbacks}
    options={options}
    // size={size}
    words={words}
  />
}
export default WordCloudMap;
