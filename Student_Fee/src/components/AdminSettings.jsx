import React, { useEffect, useState } from 'react';
import {useMyContext} from '../global/MyContext.jsx';

const AdminSettings = (props) => {
    useEffect(() => {
        props.setTitle("Settings");
    }, [props.setTitle]);

    const { logo, setLogo, title, setTitle, courses, setCourses, universities, setUniversities } = useMyContext();

    // Local states for form fields
    const [localLogo, setLocalLogo] = useState(logo);
    const [localTitle, setLocalTitle] = useState(title);
    const [localCourses, setLocalCourses] = useState(courses);
    const [localUniversities, setLocalUniversities] = useState(universities || [""]);

    // Sync local state with context when context changes
    useEffect(() => { setLocalLogo(logo); }, [logo]);
    useEffect(() => { setLocalTitle(title); }, [title]);
    useEffect(() => { setLocalCourses(courses); }, [courses]);
    useEffect(() => { setLocalUniversities(universities && universities.length ? universities : [""]); }, [universities]);

    // Handle course change (local only)
    const handleCourseChange = (index, field, value) => {
        const updatedCourses = [...localCourses];
        updatedCourses[index][field] = value;
        setLocalCourses(updatedCourses);
    };

    // Add new course (local only)
    const addCourse = () => {
        setLocalCourses([...localCourses, { name: '', fee: '' }]);
    };

    // Remove course (local only)
    const removeCourse = (index) => {
        const updatedCourses = localCourses.filter((_, i) => i !== index);
        setLocalCourses(updatedCourses);
    };

    // Handle university change (local only)
    const handleUniversityChange = (index, value) => {
        const updatedUniversities = [...localUniversities];
        updatedUniversities[index] = value;
        setLocalUniversities(updatedUniversities);
    };

    // Add new university (local only)
    const addUniversity = () => {
        setLocalUniversities([...localUniversities, ""]);
    };

    // Remove university (local only)
    const removeUniversity = (index) => {
        const updatedUniversities = localUniversities.filter((_, i) => i !== index);
        setLocalUniversities(updatedUniversities.length ? updatedUniversities : [""]);
    };

    // Handle form submit (update context here)
    const handleSubmit = (e) => {
        e.preventDefault();
        setTitle(localTitle);
        setCourses(localCourses);
        setLogo(localLogo);
        setUniversities(localUniversities.filter(u => u.trim() !== ""));
        setTimeout(() => {
            alert('Settings saved!');
        }, 0);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Institute Title</label>
                    <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        value={localTitle}
                        onChange={(e) => setLocalTitle(e.target.value)}
                        placeholder="Enter institute title"
                    />
                </div>

                {/* Courses & Fee Structure */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Courses & Fee Structure</label>
                    {localCourses.map((course, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                className="border rounded px-2 py-2 flex-1"
                                placeholder="Course Name"
                                value={course.name}
                                onChange={(e) => handleCourseChange(idx, 'name', e.target.value)}
                            />
                            <input
                                type="number"
                                className="border rounded px-2 py-2 w-32"
                                placeholder="Fee"
                                value={course.fee}
                                onChange={(e) => handleCourseChange(idx, 'fee', e.target.value)}
                            />
                            <button
                                type="button"
                                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                                    localCourses.length === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                                onClick={() => removeCourse(idx)}
                                disabled={localCourses.length === 1}
                                title="Remove"
                                style={{ fontSize: '1.5rem', lineHeight: 1 }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full mt-1 hover:bg-green-700 transition-colors"
                        onClick={addCourse}
                    >
                        <span className="text-xl font-bold">+</span>
                        <span>Add Course</span>
                    </button>
                </div>

                {/* Universities */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Universities</label>
                    {localUniversities.map((university, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                className="border rounded px-3 py-2 flex-1"
                                placeholder="University Name"
                                value={university}
                                onChange={(e) => handleUniversityChange(idx, e.target.value)}
                            />
                            <button
                                type="button"
                                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                                    localUniversities.length === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                                onClick={() => removeUniversity(idx)}
                                disabled={localUniversities.length === 1}
                                title="Remove"
                                style={{ fontSize: '1.5rem', lineHeight: 1 }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full mt-1 hover:bg-green-700 transition-colors"
                        onClick={addUniversity}
                    >
                        <span className="text-xl font-bold">+</span>
                        <span>Add University</span>
                    </button>
                </div>

                {/* Logo URL Input */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Logo URL</label>
                    <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        value={localLogo}
                        onChange={(e) => {
                            setLocalLogo(e.target.value);
                        }}
                        placeholder="Enter direct image URL (e.g., https://example.com/logo.svg)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        <span className="font-semibold">Note:</span> Please provide a direct link to an image file (preferably <span className="font-mono">.svg</span>). Google Drive links are <span className="font-semibold text-red-600">not supported</span>. The URL should end with <span className="font-mono">.svg</span>, <span className="font-mono">.png</span>, <span className="font-mono">.jpg</span>, etc.
                    </p>
                    {localLogo && (
                        <div className="mt-2">
                            <img src={localLogo} alt="Logo Preview" className="h-16" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default AdminSettings;