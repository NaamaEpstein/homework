import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// עמוד הבית: מחשב נתונים מסכמים ומציג את המשימות הקרובות ואת התקדמות הלמידה.

/**
 * ממיר תאריך ISO לפורמט תצוגה יום.חודש.שנה.
 * @param {string} date תאריך בפורמט YYYY-MM-DD.
 * @returns {string} תאריך בפורמט תצוגה.
 */
function formatDate(date) {
  if (!date) return 'ללא תאריך יעד';
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}

/**
 * מציג נתונים מסכמים, אחוז התקדמות ורשימת משימות קרובות.
 * @param {Object} props פרופס העמוד.
 * @param {Array<Object>} props.courses רשימת הקורסים.
 * @param {Array<Object>} props.tasks רשימת המשימות.
 * @returns {JSX.Element} עמוד הבית.
 */
export default function Dashboard({ courses = [], tasks = [] }) {
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState(() =>
    localStorage.getItem('currentStudent') || 'נועה לוי',
  );

  useEffect(() => {
    /** מעדכן את שם התלמידה הנבחרת בכל רכיבי עמוד הבית. */
    function handleStudentChange(event) {
      setCurrentStudent(event.detail);
    }
    window.addEventListener('studentChanged', handleStudentChange);
    return () => window.removeEventListener('studentChanged', handleStudentChange);
  }, []);

  const activeCourses = courses.filter((course) => course.isActive).length;
  const totalLessons = courses.reduce((total, course) => total + (course.lessons?.length || 0), 0);
  const completedLessons = courses.reduce((total, course) =>
    total + (course.lessons?.filter((lesson) => lesson.isCompleted).length || 0), 0);
  const openTasks = tasks.filter((task) => task.status === 'פתוחה' || task.status === 'בתהליך').length;
  const completedTasks = tasks.filter((task) => task.status === 'הושלמה').length;
  const totalProgress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const upcomingTasks = [...tasks]
    .filter((task) => task.status !== 'הושלמה' && task.dueDate)
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
    .slice(0, 3);

  const summaryCards = [
    { label: 'קורסים פעילים', value: activeCourses, icon: '📚', className: 'navy' },
    { label: 'שיעורים כוללים', value: totalLessons, icon: '▶', className: 'orange' },
    { label: 'שיעורים שהושלמו', value: completedLessons, icon: '✓', className: 'green' },
    { label: 'משימות פתוחות', value: openTasks, icon: '○', className: 'blue' },
    { label: 'משימות שהושלמו', value: completedTasks, icon: '★', className: 'purple' },
  ];

  return (
    <div className="app-shell">
      <Header activePage="dashboard" student={currentStudent} onStudentChange={setCurrentStudent} />
      <main className="dashboard">
        <section className="welcome-section">
          <div><p className="eyebrow">מרכז הלמידה</p><h1>בוקר טוב, {currentStudent}</h1><p>תמונת מצב עדכנית על הלמידה והמשימות שלך.</p></div>
        </section>

        <section className="summary-grid" aria-label="נתונים מסכמים">
          {summaryCards.map((card) => (
            <article className="summary-stat-card" key={card.label}>
              <span className={`stat-icon ${card.className}`}>{card.icon}</span>
              <div><strong>{card.value}</strong><span>{card.label}</span></div>
            </article>
          ))}
        </section>

        <section className="learning-progress-section">
          <div className="section-heading"><h2>התקדמות כוללת בלמידה</h2><strong className="overall-progress-value">{totalProgress}%</strong></div>
          <div className="overall-progress-track" aria-label={`התקדמות כוללת ${totalProgress}%`}><div style={{ width: `${totalProgress}%` }} /></div>
        </section>

        <section className="upcoming-section">
          <div className="section-heading"><h2>3 המשימות הקרובות</h2><button type="button" onClick={() => navigate('/tasks')}>כל המשימות</button></div>
          {upcomingTasks.length ? (
            <div className="upcoming-task-list">
              {upcomingTasks.map((task) => {
                const course = courses.find((item) => item.id === task.courseId);
                const formattedDate = formatDate(task.dueDate);
                return (
                  <article className="upcoming-task" key={task.id}>
                    <div className="upcoming-date"><strong>{formattedDate.split('.')[0]}</strong><span>{formattedDate.split('.').slice(1).join('.')}</span></div>
                    <div className="upcoming-task-info"><h3>{task.title}</h3><p>{course?.name || 'קורס לא משויך'} · {task.priority}</p></div>
                    <span className={`task-status status-${task.status}`}>{task.status}</span>
                  </article>
                );
              })}
            </div>
          ) : <div className="empty-state">אין משימות פתוחות עם תאריך יעד.</div>}
        </section>

        <div className="dashboard-links">
          <button type="button" onClick={() => navigate('/courses')}>מעבר לניהול קורסים</button>
          <button type="button" onClick={() => navigate('/tasks')}>מעבר לניהול משימות</button>
        </div>
      </main>
    </div>
  );
}
