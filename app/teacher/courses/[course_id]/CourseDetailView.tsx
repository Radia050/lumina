"use client";

import TopicNode from "./TopicNode";
import AddTopicForm from "./AddTopicForm";
import { useMemo, useState } from "react";
import { Course, Topic } from "./Types";



export default function CourseDetailView({
  course,
  topics,
}: {
  course: Course;
  topics: Topic[];
}) {
  const [allTopics, setAllTopics] = useState<Topic[]>(topics);
  const [parentId, setParentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const rootTopics = useMemo(
    () => allTopics.filter((topic) => topic.parentId === null),
    [allTopics],
  );

  const openTopicModal = (topicId: string | null) => {
    setParentId(topicId);
    setIsModalOpen(true);
  };

  const closeTopicModal = () => {
    setIsModalOpen(false);
    setParentId(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{course.title}</h2>
        <p className="text-slate-300">{course.description}</p>
        <p className="text-sm text-slate-400">Duration: {course.duration}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Course Topics</h3>
          <button
            type="button"
            onClick={() => openTopicModal(null)}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Add Topic
          </button>
        </div>

        <ul className="space-y-2">
          {rootTopics.map((topic) => (
            <TopicNode
              key={topic.id}
              topic={topic}
              allTopics={allTopics}
              level={0}
              onAddTopic={openTopicModal}
            />
          ))}
        </ul>
      </div>

      {isModalOpen ? (
        <AddTopicForm
          course={course}
          parentId={parentId}
          closeTopicModal={closeTopicModal}
          setAllTopics={setAllTopics}
        />
      ) : null}
    </div>
  );
}
