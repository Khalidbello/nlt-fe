'use client';

import React from "react";

interface AddChapterProps {
    show: React.Dispatch<React.SetStateAction<boolean>>;

}
const AddChapter: React.FC<AddChapterProps> = ({ show }) => {

    return (
        <div className="bg-white flex justify-center items-center fixed top-0 left-0 w-full h-full">
            <form className="bg-gray-100 rounded-xl p-3 relative">
                <h3>Create Chapter</h3>
                <label htmlFor="chapter-name" className="block">Chapter name</label>
                <input type="text" name="chapter-name" className="w-full rounded-full py-2 px-4 border-[1px] border-gray-200" />

                <label htmlFor="chapter-number" className="block mt-4">Chapter number</label>
                <input type="number" name="chapter-number" className="w-full rounded-full py-2 px-4 border-[1px] border-gray-200" />

                <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddChapter;