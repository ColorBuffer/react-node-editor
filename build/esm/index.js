import _extends from '@babel/runtime/helpers/esm/extends';
import DndBackend from 'react-dnd-mouse-backend';
import { DndProvider, useDrop, useDrag } from 'react-dnd';

function Circuite(_ref) {
  var blocks = _ref.blocks,
      selectedBlocks = _ref.selectedBlocks,
      positions = _ref.positions,
      setPositions = _ref.setPositions,
      renderBlock = _ref.renderBlock,
      renderPipe = _ref.renderPipe,
      getBlockIoPosition = _ref.getBlockIoPosition;
  return /*#__PURE__*/React.createElement(DndProvider, {
    backend: DndBackend
  }, /*#__PURE__*/React.createElement(CircuiteInside, {
    blocks: blocks,
    selectedBlocks: selectedBlocks,
    positions: positions,
    setPositions: setPositions,
    renderBlock: renderBlock,
    renderPipe: renderPipe,
    getBlockIoPosition: getBlockIoPosition
  }));
}

function CircuiteInside(_ref2) {
  var blocks = _ref2.blocks,
      selectedBlocks = _ref2.selectedBlocks,
      positions = _ref2.positions,
      setPositions = _ref2.setPositions,
      renderBlock = _ref2.renderBlock,
      renderPipe = _ref2.renderPipe,
      getBlockIoPosition = _ref2.getBlockIoPosition;

  function BlockWrapper(_ref3) {
    var block = _ref3.block,
        isSelected = _ref3.isSelected,
        children = _ref3.children;

    var _useDrag = useDrag({
      item: {
        id: block.id,
        left: positions[block.id].left,
        top: positions[block.id].top,
        type: 'BOX'
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
          delta: monitor.getDifferenceFromInitialOffset()
        };
      }
    }),
        _useDrag$ = _useDrag[0],
        isDragging = _useDrag$.isDragging,
        delta = _useDrag$.delta,
        dragRef = _useDrag[1];

    return children({
      block: block,
      isSelected: isSelected,
      isDragging: isDragging,
      delta: delta,
      dragRef: dragRef
    });
  }

  var _useDrop = useDrop({
    accept: 'BOX',
    drop: function drop(item, monitor) {
      var movingBlocks = blocks.filter(function (b) {
        return [item.id].concat(selectedBlocks).includes(b.id);
      });
      var delta = monitor.getDifferenceFromInitialOffset();
      setPositions(_extends({}, positions ? positions : {}, movingBlocks.reduce(function (prev, block) {
        var _extends2;

        var left = Math.round(positions[block.id].left + delta.x);
        var top = Math.round(positions[block.id].top + delta.y);
        return _extends({}, prev, (_extends2 = {}, _extends2[block.id] = {
          left: left,
          top: top
        }, _extends2));
      }, {})));
      return undefined;
    }
  }),
      drop = _useDrop[1];

  function PipeWrapper(_ref4) {
    var pipe = _ref4.pipe,
        children = _ref4.children;
    var p1 = getBlockIoPosition(pipe.source.blockId, 'output', pipe.source.ioIndex);
    var p2 = getBlockIoPosition(pipe.target.blockId, 'input', pipe.target.ioIndex);
    var sourcePosition = positions[pipe.source.blockId];
    var targetPosition = positions[pipe.target.blockId];
    return children({
      c1: {
        x: p1.x + sourcePosition.left,
        y: p1.y + sourcePosition.top
      },
      c2: {
        x: p2.x + targetPosition.left,
        y: p2.y + targetPosition.top
      },
      pipe: pipe
    });
  }

  var pipes = blocks.reduce(function (prev, block) {
    return [].concat(prev, Object.keys(block.args).filter(function (argKey) {
      return block.args[argKey].type === 'variable';
    }).map(function (argKey) {
      return {
        source: {
          blockId: block.args[argKey].value.blockId,
          ioIndex: block.args[argKey].value.outIndex
        },
        target: {
          blockId: block.id,
          ioIndex: parseInt(argKey)
        }
      };
    }));
  }, []); // const [selectionStart, setSelectionStart] = React.useState(null)
  // const [selectionEnd,   setSelectionEnd]   = React.useState(null)

  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'scroll'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: drop,
    id: "viewbox",
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    } // onMouseDown={e => {
    //     setSelectionStart({x: e.clientX, y: e.clientY})
    // }}
    // onMouseMove={e => {
    //     selectionStart && setSelectionEnd({x: e.clientX, y: e.clientY})
    // }}
    // onMouseUp={e => {
    //     setSelectionStart(null)
    //     setSelectionEnd(null)
    // }}

  }, pipes.map(function (pipe, i) {
    return /*#__PURE__*/React.createElement(PipeWrapper, {
      key: i,
      pipe: pipe
    }, renderPipe);
  }), blocks.map(function (block) {
    return /*#__PURE__*/React.createElement(BlockWrapper, {
      key: block.id,
      block: block,
      isSelected: selectedBlocks.includes(block.id)
    }, renderBlock);
  })));
}

export { Circuite };
