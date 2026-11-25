import { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import AddCoursePage from './pages/AddCoursePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import './styles/global.css';

const initialCourses = [
	{
		id: 1,
		name: 'פיתוח אפליקציות React',
		description: 'בניית ממשקים מודרניים בניהול state.',
		teacher: 'דנה כהן',
		category: 'פיתוח',
		lessons: [
			{ id: 101, title: 'מבוא ל־Components', duration: 35, isCompleted: true },
			{ id: 102, title: 'Props ו־State', duration: 48, isCompleted: true },
			{ id: 103, title: 'Hooks מתקדמים', duration: 52, isCompleted: false },
		],
		isActive: true,
	},
	{
		id: 2,
		name: 'עיצוב חוויית משתמש',
		description: 'מחקר משתמשים ועיצוב מוצר דיגיטלי.',
		teacher: 'אורי לוי',
		category: 'עיצוב',
		lessons: [
			{ id: 201, title: 'חקר משתמשים', duration: 42, isCompleted: true },
			{ id: 202, title: 'בניית Wireframes', duration: 55, isCompleted: false },
		],
		isActive: true,
	},
	{
		id: 3,
		name: 'JavaScript מתקדם',
		description: 'אסינכרוניות, מודולים ותבניות קוד.',
		teacher: 'מאיה ברק',
		category: 'פיתוח',
		lessons: [
			{ id: 301, title: 'Closures', duration: 38, isCompleted: false },
			{ id: 302, title: 'Promises ו־Async/Await', duration: 50, isCompleted: false },
		],
		isActive: false,
	},
	{
		id: 4,
		name: 'ניהול פרויקטים דיגיטליים',
		description: 'תכנון, עבודה בצוות ושיפור תהליכים.',
		teacher: 'יואב שחר',
		category: 'ניהול',
		lessons: [
			{ id: 401, title: 'תכנון ספרינט', duration: 32, isCompleted: true },
			{ id: 402, title: 'ניהול סיכונים', duration: 46, isCompleted: false },
		],
		isActive: true,
	},
];

// רכיב האפליקציה הראשי
/**
 * מנהל את כל state הקורסים והמשימות ומגדיר את נתיבי React Router.
 * @returns {JSX.Element} עץ הנתיבים של האפליקציה.
 */
export default function App() {
	const [currentStudent, setCurrentStudent] = useState('נועה לוי');
	const [courses, setCourses] = useState(initialCourses);
	const [tasks, setTasks] = useState([
		{ id: 1, title: 'בניית כרטיס קורס', description: 'להוסיף כרטיס React עם מידע, כפתורים ועיצוב RTL.', courseId: 1, priority: 'גבוהה', status: 'בתהליך', dueDate: '2026-11-30' },
		{ id: 2, title: 'מסמך חקר משתמשים', description: 'לרכז תובנות ממשתמשות ולכתוב מסמך סיכום.', courseId: 2, priority: 'בינונית', status: 'פתוחה', dueDate: '2026-12-02' },
		{ id: 3, title: 'תרגול Closures', description: 'פתרון תרגילי Scope ו־Closures.', courseId: 3, priority: 'נמוכה', status: 'הושלמה', dueDate: '2026-11-28' },
		{ id: 4, title: 'תוכנית Sprint', description: 'להגדיר משימות ובעלות זמן לשבוע הקרוב.', courseId: 4, priority: 'גבוהה', status: 'פתוחה', dueDate: '2026-12-05' },
	]);

	/** מעדכן קורס קיים ברשימת הקורסים לפי מזהה. */
	function updateCourse(updatedCourse) {
		setCourses((current) => current.map((course) =>
			course.id === updatedCourse.id ? updatedCourse : course,
		));
	}

	/** מחשב את הקורס לפי courseId בנתיב ומציג את עמוד פרטי הקורס. */
	function CourseDetailsRoute() {
		const { courseId } = useParams();
		const course = courses.find((item) => item.id === Number(courseId));
		if (!course) return <Navigate to="/courses" replace />;
		return <CourseDetailsPage course={course} onUpdateCourse={updateCourse} />;
	}

	return (
		<Routes>
			<Route path="/" element={<Dashboard courses={courses} tasks={tasks} />} />
			<Route path="/courses" element={<CoursesPage courses={courses} setCourses={setCourses} />} />
			<Route path="/courses/add" element={<AddCoursePage onAddCourse={(course) => setCourses((current) => [...current, course])} />} />
			<Route path="/courses/:courseId" element={<CourseDetailsRoute />} />
			<Route path="/tasks" element={<TasksPage courses={courses} tasks={tasks} setTasks={setTasks} />} />
			<Route path="/tasks/add" element={<AddTaskPage courses={courses} onAddTask={(task) => setTasks((current) => [...current, task])} />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
