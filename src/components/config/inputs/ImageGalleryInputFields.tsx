import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { CmsImageType } from "../../../types/types";
import { useCallback, useContext } from "react";
import { CmsContext } from "../../util/context";
import styled from "styled-components";
import { DragIcon } from "../../util/icons";


const DroppableContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  gap: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

`;

const DraggableItem = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #fafafa;
  cursor: grab;
  display: grid;
  grid-template-columns: 2rem auto;
  align-items: center;
  svg {
    fill: #999;
  }
`;


interface Props {
  component: Object,
  updateSiteData: (field: string, value: any) => void,
}

const ImageGalleryInputFields = ({ component, updateSiteData }: Props) => {
  
  
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = useCallback((result) => {
    updateSiteData("list", reorder(component?.["list"], result.source.index, result.destination.index))
  }, []);

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId={"image-gallery"}>
        {(provided, snapshot) => (
          <DroppableContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {component["list"]?.map(({ src, alt }: CmsImageType, index) => (
              <Draggable draggableId={`draggable-index-${index}`} index={index}>
                {(provided, snapshot) => (
                  <DraggableItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DragIcon />
                    <p>{alt}</p>
                  </DraggableItem>
                )}
              </Draggable>
            ))}
            </DroppableContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGalleryInputFields;
