import React, {useEffect, useState} from "react";
import './App.css';
import WordCloudMap from "./component/WordCloudMap";
import {Resizable} from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import {getSimilarWords, postParagraph} from "./api/word2vec";
import {Loader, Dimmer, Breadcrumb, Form} from "semantic-ui-react";

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};



function App() {
  const [words, setWords] = useState([])
  const [currentWords, setCurrentWords] = useState([])
  const [baseWord, setBaseWord] = useState([])
  const [paragraph, setParagraph] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentWords && currentWords.length > 0) {
      getSimilarWords(currentWords.join()).then((response) => {
        setWords(response.data.words)
      })
    }
  }, [currentWords])

  return (
    <div className={'app-header'}>
      <img src="https://img.icons8.com/clouds/100/000000/cloud-file.png" alt={'b'}/>
      <div className={'app'}>
        <Breadcrumb>
          <Breadcrumb.Section link onClick={() => {
            setWords(baseWord)
            setCurrentWords([])
          }}>Home</Breadcrumb.Section>
          {currentWords.map((cur, index) => (
            <>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section link onClick={() => setCurrentWords(currentWords.slice(0, index + 1))}>{cur}
              </Breadcrumb.Section>
            </>))
          }
        </Breadcrumb>
        <Resizable
          defaultSize={{
            width: '100%',
            height: 400
          }}
          style={resizeStyle}
        >
          <div style={{width: "100%", height: "100%"}}>
            {loading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>) : null}
            <WordCloudMap
              onWordClick={(word,e) => {
                if(e.shiftKey)
                  setCurrentWords(prev => [...prev, '-'+word.text])
                else
                  setCurrentWords(prev => [...prev, word.text])
              }}
              words={words}/>
          </div>
        </Resizable>
        <Form onSubmit={() => {
          setLoading(true)
          postParagraph(paragraph).then(r => {
              setWords(r)
              setBaseWord(r)
              setCurrentWords([])
              setLoading(false)
            }
          )
        }}>
          <Form.TextArea onChange={(event) => setParagraph(event.target.value)} placeholder='Tell us more'
                         style={{minHeight: 200}}/>
          <Form.Button content='Submit'/>
        </Form>
      </div>
    </div>
  );
}

export default App;
