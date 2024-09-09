import { useEffect, useState } from "react";
import "./App.css";
import { initBinaryTree } from "./structures/binary-tree/BinaryTree";

const bTreeEntity = initBinaryTree();

function App() {
  const [bTreeViz, setBTreeViz] = useState<string>("");
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-col gap-2 items-start">
        <span>Value</span>
        <input type="number" className="border w-100" id="number-input" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <span>New value</span>
        <input type="number" className="border w-100" id="number-input-new" />
      </div>
      <div className="flex gap-4">
        <button
          className="border bg-gradient-to-tl from-orange-600 to-purple-900 p-2 rounded-xl"
          onClick={() => {
            const el: HTMLInputElement | null = document.getElementById(
              "number-input"
            ) as HTMLInputElement;
            if (!el) return;
            bTreeEntity.insert(Number(el.value));
            setBTreeViz(bTreeEntity.show(null));
          }}
        >
          Add to bTree
        </button>
        <button
          className="border bg-gradient-to-tl from-orange-600 to-purple-900 p-2 rounded-xl"
          onClick={() => {
            const el: HTMLInputElement | null = document.getElementById(
              "number-input"
            ) as HTMLInputElement;
            if (!el) return;
            bTreeEntity.remove(Number(el.value));
            setBTreeViz(bTreeEntity.show(null));
          }}
        >
          Remove from bTree
        </button>
        <button
          className="border bg-gradient-to-tl from-orange-600 to-purple-900 p-2 rounded-xl"
          onClick={() => {
            const el: HTMLInputElement | null = document.getElementById(
              "number-input"
            ) as HTMLInputElement;
            const elNew: HTMLInputElement | null = document.getElementById(
              "number-input-new"
            ) as HTMLInputElement;
            if (!el || !elNew) return;
            bTreeEntity.edit(Number(el.value), Number(elNew.value));
            setBTreeViz(bTreeEntity.show(null));
          }}
        >
          Replace
        </button>
        <button
          className="border bg-gradient-to-tl from-orange-600 to-purple-900 p-2 rounded-xl"
          onClick={() => {
            const el: HTMLInputElement | null = document.getElementById(
              "number-input"
            ) as HTMLInputElement;
            if (!el) return;
            const value = bTreeEntity.search(Number(el.value));
            alert(value);
          }}
        >
          Search
        </button>
      </div>
      <pre>{bTreeViz}</pre>
    </>
  );
}

export default App;
