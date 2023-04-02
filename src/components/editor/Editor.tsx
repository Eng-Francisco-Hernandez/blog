// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";

const Editor = ({ value, onChange }: any) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default Editor;
