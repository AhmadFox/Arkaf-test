import React, { useState, useEffect } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";


const inputStyle = `
p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`

const InputTag = ({ onValueChange, getTags }) => {
	const [tags, setTags] = useState(JSON.parse(getTags) || []);

	const handleDelete = (index) => {
		setTags(tags.filter((_, i) => i !== index));
	};

	const onTagUpdate = (index, newTag) => {
		const updatedTags = [...tags];
		updatedTags.splice(index, 1, newTag);
		setTags(updatedTags);
	};

	const handleAddition = (tag) => {
		setTags((prevTags) => {
			return [...prevTags, tag];
		});
		
	};

	useEffect(() => {
		onValueChange(JSON.stringify(tags))
	}, [tags])

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setTags(newTags);
	};

	const handleTagClick = (index) => {
		console.log("The tag at index " + index + " was clicked");
	};

	const onClearAll = () => {
		setTags([]);
	};

	console.log('tags', tags);

	return (
		<div className="cursor-default">
			<ReactTags
				tags={tags}
				inputFieldPosition="top"
				// suggestions={suggestions}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				// handleDrag={handleDrag}
				handleTagClick={handleTagClick}
				// onTagUpdate={onTagUpdate}
				// editable
				clearAll
				onClearAll={onClearAll}
				maxTags={20}
				// allowAdditionFromPaste
				classNames={{
					tags: 'tagsClass',
					tagInput: 'relative mb-2',
					tagInputField: `${inputStyle}`,
					selected: 'flex flex-wrap gap-2 mt-3',
					tag: 'bg-[#34484f] py-2 px-3 pe-2 rounded-[6px] text-white !cursor-default',
					remove: 'fill-white ms-2 tag-icon-class',
					suggestions: 'suggestionsClass',
					activeSuggestion: 'activeSuggestionClass',
					editTagInput: 'editTagInputClass',
					editTagInputField: 'editTagInputField',
					clearAll: 'absolute text-xs right-1 top-1/2 -translate-y-1/2 text-white bg-red-500 py-2 px-2 rounded-[6px] text-white',
				  }}
			/>
		</div>
	);
};

export default InputTag;
