
import React from 'react'
import {NodeEditor} from '../lib/index'
import and from './logical/blocks/AND.svg'
import or from './logical/blocks/OR.svg'
import inverse from './logical/blocks/INVERSE.svg'

export default function App() {

    const [blocks, setBlocks] = React.useState([])
    const [positions, setPositions] = React.useState([])

    return (
        <div>
            <img src={and} />
            <img src={or} />
            <img src={inverse} />
            
            <NodeEditor
                blocks={blocks}
                setBlocks={setBlocks}
                selectedBlocks={[]}
                setSelectedBlocks={() => null}
                renderBlock={() => (
                    null
                )}
                renderPipe={({c1, c2, pipe}) => (
                    null
                )}
                getBlockIoPosition={(blockId, ioType, ioIndex) => {
                    return null
                }}
            />
        </div>
    )
}
