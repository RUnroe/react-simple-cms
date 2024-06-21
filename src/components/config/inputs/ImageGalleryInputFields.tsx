import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { CmsImageType } from "../../../types/types";
import { useCallback, useContext, useState } from "react";
import { CmsContext } from "../../util/context";
import styled from "styled-components";
import { DragIcon, EditIcon } from "../../util/icons";
import { ImageSelectModal } from "./ImageModal";


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
  grid-template-columns: 2rem auto 2rem;
  align-items: center;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  svg {
    fill: #999;

    &.edit-icon {
      cursor: pointer;
      padding: 0.5rem;
      transition: fill 0.1s ease;
      &:hover {
        fill: #37a0f0;
      }
    }
  }
`;


const AddItemButton = styled.button`
  width: 80%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #fafafa;
  cursor: pointer;
  align-items: center;

  position: absolute;
  bottom: 1rem;
  transform: translateX(-50%);
  left: 50%;
`;

interface Props {
  component: Object,
  updateSiteData: (field: string, value: any) => void,
}

const ImageGalleryInputFields = ({ component, updateSiteData }: Props) => {
  const [imageSetter, setImageSetter] = useState();
  
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
    <>
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId={`image-gallery-${component?.["cmsKey"]}}`}>
        {(provided, snapshot) => (
          <DroppableContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {component["list"]?.map(({ src, alt }: CmsImageType, index) => (
              <Draggable draggableId={`draggable-index-${index}`} index={index} key={`${component?.["cmsKey"]}-draggable-index-${index}`}>
                {(provided, snapshot) => (
                  <DraggableItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DragIcon />
                    <p>{alt}</p>
                    <EditIcon />
                  </DraggableItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DroppableContainer>
        )}
      </Droppable>
      
    </DragDropContext>
    <AddItemButton>Add Image</AddItemButton>
    <ImageSelectModal setSetter={setImageSetter} setter={imageSetter}/>
  </>
  );
};

export default ImageGalleryInputFields;
