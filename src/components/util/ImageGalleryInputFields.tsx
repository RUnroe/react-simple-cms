import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { CmsImageType } from "../../types/types";
import { useCallback } from "react";

interface Props {
  component: Object;
}

const ImageGalleryInputFields = ({ component }: Props) => {

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId={"image-gallery"}>
        {component["list"]?.map(({ src, alt }: CmsImageType, index) => (
          <Draggable draggableId={`draggable-index-${index}`} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <p>{src}</p>
              </div>
            )}
          </Draggable>
        ))}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGalleryInputFields;
