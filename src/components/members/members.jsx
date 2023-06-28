import React from "react";
import Member from "./member";

const members = (props) => {
  return (
    <>
      {props.members?.map((member) => (
        <Member
          key={member.id}
          member={member}
          handlerButtonEdit={(member) => props.handlerButtonEdit(member)}
          handlerButtonDelete={(id) => props.handlerButtonDelete(id)}
        />
      ))}
    </>
  );
};

export default members;
