import CourseDetailView from "./CourseDetailView";

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {

  const course = {
    "id": "course-101",
    "title": "Introduction to Algebra",
    "description": "Core algebraic concepts with guided practice.",
    "duration": "6 weeks"
  };
  
  const topics: any[] = [
  {
    "id": "topic-1",
    "courseId": "course-101",
    "title": "Variables and Expressions",
    "description": "Understand variables, constants, and algebraic expressions.",
    "parentId": null
  },
  {
    "id": "topic-2",
    "courseId": "course-101",
    "title": "Simplifying Expressions",
    "description": "Use arithmetic rules to simplify expressions.",
    "parentId": "topic-1"
  },
  {
    "id": "topic-3",
    "courseId": "course-101",
    "title": "Linear Equations",
    "description": "Solve one-variable linear equations.",
    "parentId": null
  },
  {
    "id": "topic-4",
    "courseId": "course-102",
    "title": "Ancient Civilizations",
    "description": "Explore early civilizations and their innovations.",
    "parentId": null
  },
  {
    "id": "topic-5",
    "courseId": "course-103",
    "title": "Cell Structure",
    "description": "Identify and explain core parts of cells.",
    "parentId": null
  }
]
;

  

  return <CourseDetailView course={course} topics={topics} />;
}