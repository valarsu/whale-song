import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function CodeBlock(props) {
  return (
    <div>
      <SyntaxHighlighter language={props.language} style={atomOneDark}>
        {props.value}
      </SyntaxHighlighter>
    </div>
  )
}