export const SplitPage = () => {

  const blocks = [
    'Some data block1',
    'Some data block2',
    'Some data block3',
    'Some data block4',
  ]

  return (
    <>
      {
        blocks.map((block, index) => (
          <div key={index} style={{height: "400px"}}>
            Some data {block}
          </div>
        ))
      }
    </>
  );
};