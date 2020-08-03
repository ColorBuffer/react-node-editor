
import React from 'react'
import {NodeEditor} from '../lib/index'
import And from './logical/blocks/AND'
import Or from './logical/blocks/OR'
import Inverse from './logical/blocks/INVERSE'

export default function App() {

    const [blocks, setBlocks] = React.useState([
        {
            id: '1',
            type: 'and',
            title: 'and',
            args: {

            }
        },
        {
            id: '2',
            type: 'or',
            title: 'or',
            args: {

            }
        },
        {
            id: '3',
            type: 'inverse',
            title: 'inverse',
            args: {

            }
        },
    ])
    const [positions, setPositions] = React.useState({
        '1': {left: 0, top: 0},
        '2': {left: 0, top: 0},
        '3': {left: 0, top: 0},
    })

    return (
        <div>
            <NodeEditor
                blocks={blocks}
                setBlocks={setBlocks}
                positions={positions}
                setPositions={setPositions}
                selectedBlocks={[]}
                setSelectedBlocks={() => null}
                renderBlock={({block}) => {
                    if (block.type === 'and') {
                        return (
                            <And />
                        )
                    }
                    if (block.type === 'or') {
                        return (
                            <Or />
                        )
                    }
                    return (
                        <Inverse />
                    )
                }}
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
