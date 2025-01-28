
import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import moment from "moment";

const NoteCard = ({ item, onEdit, onPin, onDelete }) => {
  const onPinNote = () => {
    onPin(item?._id, !item?.isPinned);
  };

  return (
    <div
      className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out cursor-pointer w-full sm:w-96 md:w-[380px] lg:w-[450px]">
      <div className="flex justify-between items-start sm:items-center">
        <div>
          <h6 className="text-sm font-medium">{item?.title}</h6>
          <span className="text-xs text-slate-500">
            {moment(item?.createdOn).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            item?.isPinned ? "text-primary" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">
        {item?.content?.slice(0, 60)}
      </p>
      <div className="flex justify-between items-center mt-2 flex-wrap">
        <div className="text-xs text-slate-500">
          {item?.tags?.length > 0 &&
            item?.tags.map((tag) => `#${tag}`).join(", ")}
        </div>
        <div className="flex text-center gap-2 mt-2 sm:mt-0">
          <MdModeEditOutline
            className="icon-btn text-slate-500 hover:text-blue-500"
            onClick={() => onEdit(item)}
          />
          <FaTrash
            className="icon-btn text-slate-500 hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

