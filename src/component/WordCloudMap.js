import React, {useState} from 'react';
import ReactWordcloud from '../wordcloud';

const WordCloudMap = (props) => {
  const callbacks = {
    // getWordColor: word => word.value > 50 ? "blue" : "red",
    onWordClick: props.onWordClick,
    onWordMouseOver: console.log,
    // getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontFamily: "impact",
    enableOptimizations: true
    // deterministic: true
  };
  return <ReactWordcloud
    callbacks={callbacks}
    options={options}
    // size={size}
    words={props.words}
  />
}
export default WordCloudMap;
