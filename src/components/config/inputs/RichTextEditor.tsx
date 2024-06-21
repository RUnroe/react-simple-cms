import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({inputField, component, setValueCallback}) => {

  // https://www.npmjs.com/package/react-quilljs
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
        [{ list: 'ordered'}, { list: 'bullet' }],
        ['link'],
        [{ color: [] }, { background: [] }],
    
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      'bold', 'italic', 'underline', 'strike',
      'align', 'list', 
      'link', 
      'color', 'background',
    ]
  });
  useEffect(() => {
    if (quill) {
      //Default value
      quill.clipboard.dangerouslyPasteHTML(component?.[inputField["key"]]);
      //On Change
      quill.on("text-change", (delta, oldDelta, source) => {
        setValueCallback(inputField["key"], quill.root.innerHTML)
      });
    }
  }, [quill]);
  return ( 
    <div style={{minHeight: 300 }} id={`cms-input-${inputField["key"]}`}>
      <div ref={quillRef} />
    </div>
   );
}
 
export default RichTextEditor;