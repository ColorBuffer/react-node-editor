
import React from 'react'
import {NodeEditor} from '../lib/index'
import And from './logical/blocks/AND'
import Or from './logical/blocks/OR'
import Inverse from './logical/blocks/INVERSE'

export default function App() {

    const [blocks, setBlocks] = React.useState([])
    const [positions, setPositions] = React.useState([])

    return (
        <div>
            <And />
            <Or />
            <Inverse />
            
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
