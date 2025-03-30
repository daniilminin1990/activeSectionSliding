import {blocks} from "../components/LayoutSplit.tsx";

export const SplitPage = () => {


  return (
    <>
      {blocks.map((block, index) => (
        <div key={index} id={`block-${index}`} style={{ height: "400px" }}>
          Some data {block.content}
        </div>
      ))}
    </>
  );
};