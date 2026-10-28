import React from "react";

export default function ListInfo() {
  let listInfo = [
    { id: 1, lang: "java", scope: 12 },
    { id: 2, lang: "python", scope: 20 },
    { id: 3, lang: "js", scope: 30 },
    { id: 4, lang: "kotlin", scope: 60 },
    { id: 5, lang: "mojo", scope: 80 },
  ];
  let name = {
    id: 1,
    name: "user 1",
    clas: "react js",
  };
  return (
    <>
      <h1>welcome</h1>
      {listInfo.map((langOb) => {
        return (
          <li key={langOb.id}>
            ID: {langOb.id} Name: {langOb.lang} Scope: {langOb.scope}
          </li>
        );
      })}

      {/* {listInfo.map((item, index) => {
        return <h3 key={index}>{item}</h3>;
      })} */}

      {/* <h2>id:{name.id}</h2>
      <h2>name{name.name}</h2>
      <h2>class:{name.class}</h2> */}
    </>
  );
}
