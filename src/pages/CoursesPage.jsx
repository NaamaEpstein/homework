import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';

// עמוד רשימת הקורסים: מציג חיפוש, הפעלה/השהיה, מחיקה ופתיחת פרטי קורס.

const emptyForm = {
  name: '',
  description: '',
  teacher: '',
  category: '',
  lessons: '',
  isActive: true,
};

/**
 * מציג את רשימת הקורסים ומנהל חיפוש והפעלה, השהיה ומחיקה.
 * @param {Object} props פרופס הרכיב.
 * @param {Array<Object>} props.courses רשימת הקורסים.
 * @param {(updater: Function) => void} props.setCourses פונקציה לעדכון הקורסים.
 * @returns {JSX.Element} עמוד רשימת הקורסים.
 */
export default function CoursesPage({ courses, setCourses }) {
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const visibleCourses = courses.filter((course) => {
    const query = search.trim().toLowerCase();
    return !query || [course.name, course.teacher, course.category]
      .some((value) => value.toLowerCase().includes(query));
  });

  /** משנה את isActive של קורס. @param {number} id מזהה הקורס. */
  function toggleCourse(id) {
    setCourses((current) => current.map((course) =>
      course.id === id ? { ...course, isActive: !course.isActive } : course,
    ));
  }

  /** מוחק קורס לפי מזהה. @param {number} id מזהה הקורס למחיקה. */
  function deleteCourse(id) {
    setCourses((current) => current.filter((course) => course.id !== id));
  }

  return (
    <div className="app-shell">
      <Header activePage="courses" />
      <main className="dashboard courses-page">
        <section className="courses-header">
          <div>
            <p className="eyebrow">מרכז הלמידה</p>
            <h1>ניהול קורסים</h1>
          </div>
          <button className="primary-button" type="button" onClick={() => navigate('/courses/add')}>
            + קורס חדש
          </button>
        </section>

        <div className="courses-toolbar">
          <label className="search-field">
            <span>חיפוש קורס</span>
            <input ref={searchRef} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="חפשי לפי שם, מרצה או קטגוריה" />
          </label>
          <span className="course-count">{visibleCourses.length} קורסים</span>
        </div>

        {visibleCourses.length ? (
          <div className="course-grid">
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onToggle={() => toggleCourse(course.id)}
                onDelete={() => deleteCourse(course.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">לא נמצאו קורסים התואמים לחיפוש.</div>
        )}
      </main>
    </div>
  );
}
