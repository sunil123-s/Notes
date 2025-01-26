
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

const TagInput = ({ tags, setTags }) => {
  const [inputTag, setInputTag] = useState("");

  const handleTagInput = (e) => {
    setInputTag(e.target.value);
  };

  const addNewTag = () => {
    if (inputTag.trim() !== "") {
      setTags([...tags, inputTag.trim()]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                aria-label={`Remove tag ${tag}`}
                className="ml-2 text-sm text-slate-500 hover:text-red-500"
              >
                <RxCross1 />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-5">
        <input
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none w-full sm:w-[250px] md:w-[300px] lg:w-[350px]"
          type="text"
          value={inputTag}
          placeholder="Add tags"
          onChange={handleTagInput}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="w-8 h-8 flex justify-center items-center border border-blue-700 rounded hover:bg-blue-700"
          onClick={addNewTag}
        >
          <GoPlus className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
