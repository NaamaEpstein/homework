/** מציג מידע בסיסי על משימה בודדת. @returns {JSX.Element} כרטיס משימה. */

export default function TaskCard({ title, course, dueDate, status }) {
  const statusClass = status === 'הוגשה' ? 'submitted' : status === 'באיחור' ? 'late' : 'pending';

  return (
    <article className="task-card">
      <span className={`status-badge ${statusClass}`}>{status}</span>
      <div>
        <h3>{title}</h3>
        <p className="task-course">{course}</p>
      </div>
      <p className="due-date"><span>תאריך הגשה</span><strong>{dueDate}</strong></p>
      <button className="card-button secondary" type="button">צפייה במשימה</button>
    </article>
  );
}
