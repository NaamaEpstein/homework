import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

/**
 * מציג נתוני קורס, אחוז התקדמות ורשימת שיעורים ניתנת לניהול.
 * @param {Object} props פרופס הרכיב.
 * @param {Object} props.course הקורס הנבחר.
 * @param {(course: Object) => void} props.onUpdateCourse callback לעדכון הקורס.
 * @returns {JSX.Element | null} עמוד פרטי הקורס.
 */
export default function CourseDetailsPage({ course, onUpdateCourse }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');

  if (!course) return null;

  const lessons = course.lessons || [];
  const completedCount = lessons.filter((lesson) => lesson.isCompleted).length;
  const progress = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;

  /**
   * מחליף את רשימת השיעורים ומעדכן את הקורס באפליקציה הראשית.
   * @param {Array<Object>} nextLessons רשימת שיעורים מעודכנת.
   * @returns {void}
   */
  function updateLessons(nextLessons) {
    onUpdateCourse({ ...course, lessons: nextLessons });
  }

  /**
   * הופך את המצב isCompleted של שיעור מסוים.
   * @param {number} id מזהה השיעור.
   * @returns {void}
   */
  function toggleLesson(id) {
    updateLessons(lessons.map((lesson) =>
      lesson.id === id ? { ...lesson, isCompleted: !lesson.isCompleted } : lesson,
    ));
  }

  /**
   * מסיר שיעור מרשימת השיעורים לפי מזהה.
   * @param {number} id מזהה השיעור למחיקה.
   * @returns {void}
   */
  function deleteLesson(id) {
    updateLessons(lessons.filter((lesson) => lesson.id !== id));
  }

  /**
   * מאמת את נתוני השיעור ומוסיף אותו לרשימת הקורס.
   * @param {React.FormEvent<HTMLFormElement>} event אירוע שליחת טופס.
   * @returns {void}
   */
  function addLesson(event) {
    event.preventDefault();
    const lessonTitle = title.trim();
    if (!lessonTitle) return;

    updateLessons([
      ...lessons,
      {
        id: Date.now(),
        title: lessonTitle,
        duration: Number(duration) || 0,
        isCompleted: false,
      },
    ]);
    setTitle('');
    setDuration('');
  }

  return (
    <div className="app-shell">
      <Header activePage="courses" />
      <main className="dashboard course-details">
        <button className="back-button" type="button" onClick={() => navigate('/courses')}>→ חזרה לקורסים</button>

        <section className="course-details-header">
          <div>
            <p className="eyebrow">{course.category}</p>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <div className="details-meta">
              <span>מרצה: <strong>{course.teacher}</strong></span>
              <span>{lessons.length} שיעורים</span>
            </div>
          </div>

          <div className="progress-summary">
            <strong>{progress}%</strong>
            <span>התקדמות</span>
          </div>
        </section>

        <div className="details-progress-track" aria-label={`התקדמות הקורס ${progress}%`}>
          <div style={{ width: `${progress}%` }} />
        </div>

        <section className="lessons-section">
          <div className="section-heading">
            <h2>שיעורי הקורס</h2>
            <span>{completedCount} מתוך {lessons.length} הושלמו</span>
          </div>

          <form className="lesson-form" onSubmit={addLesson}>
            <label>
              שם השיעור
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="לדוגמה: מבוא ל־Hooks" required />
            </label>
            <label>
              משך בדקות
              <input type="number" min="0" value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="45" />
            </label>
            <button className="primary-button" type="submit">הוספת שיעור</button>
          </form>

          {lessons.length ? (
            <div className="lesson-management-list">
              {lessons.map((lesson) => (
                <article className={`lesson-management-row ${lesson.isCompleted ? 'completed' : ''}`} key={lesson.id}>
                  <button
                    className="completion-button"
                    type="button"
                    onClick={() => toggleLesson(lesson.id)}
                    aria-label={lesson.isCompleted ? `סמן את ${lesson.title} כלא הושלם` : `סמן את ${lesson.title} כהושלם`}
                  >
                    {lesson.isCompleted ? '✓' : ''}
                  </button>
                  <div className="lesson-management-info">
                    <h3>{lesson.title}</h3>
                    <span>{lesson.duration} דקות</span>
                  </div>
                  <button className="delete-button lesson-delete" type="button" onClick={() => deleteLesson(lesson.id)}>
                    מחיקה
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">עדיין אין שיעורים בקורס זה.</div>
          )}
        </section>
      </main>
    </div>
  );
}
