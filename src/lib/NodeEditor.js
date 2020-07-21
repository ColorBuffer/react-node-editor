
import React from 'react'
import DndBackend from 'react-dnd-mouse-backend'
import { DndProvider, useDrop, useDrag } from 'react-dnd'

function centerOfElement(el) {
    const rect = el.getBoundingClientRect()
    const rectVB = document.getElementById('viewbox').getBoundingClientRect()
    return {
        x: rect.left - rectVB.left + rect.width / 2,
        y: rect.top - rectVB.top + rect.height / 2,
    }
}

export default function NodeEditor(props) {

    return (
        <DndProvider backend={DndBackend}>
            <NodeEditorInside
                {...props}
            />
        </DndProvider>
    )
}

function NodeEditorInside({
    blocks,
    selectedBlocks,
    positions,
    setPositions,
    renderBlock,
    renderPipe,
    getBlockIoPosition,
}) {


    function BlockWrapper({
        block,
        isSelected,
        children,
    }) {
        const [{ isDragging, delta }, dragRef] = useDrag({
            item: { id: block.id, left: positions[block.id].left, top: positions[block.id].top, type: 'BOX' },
            collect: monitor => ({
                isDragging: monitor.isDragging(),
                delta: monitor.getDifferenceFromInitialOffset(),
            }),
        })
        return children({block, isSelected, isDragging, delta, dragRef})
    }

    const [, drop] = useDrop({
        accept: 'BOX',
        drop(item, monitor) {
            const movingBlocks = blocks.filter(b => [item.id, ...selectedBlocks].includes(b.id))
            const delta = monitor.getDifferenceFromInitialOffset()
            
            setPositions({
                ...(positions ? positions : {}),
                ...movingBlocks.reduce((prev, block) => {
                    const left = Math.round(positions[block.id].left + delta.x)
                    const top = Math.round(positions[block.id].top + delta.y)
                    return {
                        ...prev,
                        [block.id]: {left, top},
                    }
                }, {}),
            })
            return undefined
        },
    })

    function PipeWrapper({pipe, children}) {
        const p1 = getBlockIoPosition(pipe.source.blockId, 'output', pipe.source.ioIndex)
        const p2 = getBlockIoPosition(pipe.target.blockId, 'input',  pipe.target.ioIndex)

        const sourcePosition = positions[pipe.source.blockId]
        const targetPosition = positions[pipe.target.blockId]

        return children({
            c1: {x: p1.x + sourcePosition.left, y: p1.y + sourcePosition.top},
            c2: {x: p2.x + targetPosition.left, y: p2.y + targetPosition.top},
            pipe,
        })
    }

    const pipes = blocks.reduce((prev, block) => [
        ...prev,
        ...Object.keys(block.args)
            .filter(argKey => block.args[argKey].type === 'variable')
            .map(argKey => ({
                source: {
                    blockId: block.args[argKey].value.blockId,
                    ioIndex: block.args[argKey].value.outIndex,
                },
                target: {
                    blockId: block.id,
                    ioIndex: parseInt(argKey),
                },
            })),
    ], [])

    // const [selectionStart, setSelectionStart] = React.useState(null)
    // const [selectionEnd,   setSelectionEnd]   = React.useState(null)

    return (
        <div
            style={{
                height: '100%',
                overflowY: 'scroll',
            }}
        >
            <div
                ref={drop}
                id="viewbox"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
                // onMouseDown={e => {
                //     setSelectionStart({x: e.clientX, y: e.clientY})
                // }}
                // onMouseMove={e => {
                //     selectionStart && setSelectionEnd({x: e.clientX, y: e.clientY})
                // }}
                // onMouseUp={e => {
                //     setSelectionStart(null)
                //     setSelectionEnd(null)
                // }}
            >
                {pipes.map((pipe, i) => (
                    <PipeWrapper
                        key={i}
                        pipe={pipe}
                    >{renderPipe}</PipeWrapper>
                ))}
                {blocks.map((block) => (
                    <BlockWrapper
                        key={block.id}
                        block={block} 
                        isSelected={selectedBlocks.includes(block.id)}
                    >{renderBlock}</BlockWrapper>
                ))}
                {/* {!(selectionStart && selectionEnd) ? null : (
                    <div
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(33, 150, 243, 0.3)',
                            border: '1px solid rgba(33, 150, 243)',
                            left: Math.min(selectionStart.x, selectionEnd.x),
                            top: Math.min(selectionStart.y,  selectionEnd.y),
                            width: Math.abs(selectionEnd.x  - selectionStart.x),
                            height: Math.abs(selectionEnd.y - selectionStart.y),
                        }}
                    />
                )} */}
            </div>
        </div>
    )
}