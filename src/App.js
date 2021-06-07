import React, {useState} from "react";
import './App.css';
import WordCloudMap from "./component/WordCloudMap";
import {Resizable} from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import {getSimilarWords, postParagraph} from "./api/word2vec";
import {Form, TextArea, Button} from "semantic-ui-react";

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

function App() {
  const [words, setWords] = useState([])
  const [currentWord, setCurrentWord] = useState('')
  const [paragraph, setParagraph] = useState('')

  return (
    <div>
      <Resizable
        defaultSize={{
          width: 600,
          height: 300
        }}
        style={resizeStyle}
      >
        <div style={{width: "100%", height: "100%"}}>
          <WordCloudMap
            onWordClick={async (word) => {
              setCurrentWord(word.text)
              const similarWords = await getSimilarWords(word.text)
              console.log(similarWords)
              setWords([{text:word.text,value:1},...similarWords.data.words])
            }}
            words={words}/>
        </div>
      </Resizable>
      <Form onSubmit={() => {
        postParagraph(paragraph).then(r => {
            setWords(r)
          }
        )
      }}>
        <Form.Group>
          <Form.TextArea onChange={(event) => setParagraph(event.target.value)} placeholder='Tell us more'
                         style={{minHeight: 100}}/>
          <Form.Button content='Submit'/>
        </Form.Group>
      </Form>
      <button onClick={() => {
        console.log(currentWord)
      }}/>
    </div>
  );
}

export default App;
