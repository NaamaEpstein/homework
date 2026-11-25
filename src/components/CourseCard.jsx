import { useNavigate } from 'react-router-dom';

/**
 * מציג נתוני קורס בודד וכפתורי כניסה, הפעלה ומחיקה.
 * @param {Object} props פרופס הכרטיס.
 * @returns {JSX.Element} כרטיס קורס.
 */
export default function CourseCard({ id, name, description, teacher, category, lessons, isActive, onToggle, onDelete }) {
  const navigate = useNavigate();
  const lessonCount = Array.isArray(lessons) ? lessons.length : 0;

  return (
    <article className={`course-card ${isActive ? '' : 'paused'}`}>
      <div className="course-card__top">
        <span className="eyebrow">{category}</span>
        <span className={`course-status ${isActive ? 'active' : 'inactive'}`}>
          {isActive ? 'פעיל' : 'מושהה'}
        </span>
      </div>
      <h2>{name}</h2>
      <p className="course-description">{description}</p>
      <div className="course-meta">
        <span>מרצה: <strong>{teacher}</strong></span>
        <span>{lessonCount} שיעורים</span>
      </div>
      <div className="course-actions">
        <button className="card-button" type="button" onClick={() => navigate(`/courses/${id}`)}>כניסה לקורס</button>
        <button className="delete-button" type="button" onClick={onDelete} aria-label={`מחק את הקורס ${name}`}>
          מחיקה
        </button>
      </div>
      <button className="status-toggle-button" type="button" onClick={onToggle}>
        {isActive ? 'השהה קורס' : 'הפעל קורס'}
      </button>
    </article>
  );
}
