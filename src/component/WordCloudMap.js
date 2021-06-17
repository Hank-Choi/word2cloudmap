import React, {useState} from 'react';
import ReactWordcloud from '../wordcloud';
import {pickColor} from "../utils/color-picker";

const WordCloudMap = (props) => {
  const callbacks = {
    // getWordColor: word => pickColor(word.value),
    onWordClick: props.onWordClick,
    onWordMouseOver: console.log,
    // getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options = {
    rotations: 2,
    rotationAngles: [0, 90],
    fontFamily: "impact",
    enableOptimizations: true,
    transitionDuration: 1200,
    // scale: 'log'
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
