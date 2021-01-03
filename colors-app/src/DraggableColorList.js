import React from 'react';
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer((props) => {
  return (
    <div style={{height:"100%"}}>
      {
          props.colors.map((color, i) => {
            return <DraggableColorBox
              index={i}
              key={color.name}
              color={color.color}
              name={color.name}
              handleDelete={() => props.deleteColorBox(color.name)}
            />
          })
        }
    </div>
  )
});

export default DraggableColorList;
