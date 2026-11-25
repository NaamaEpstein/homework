/** מציג כרטיס מידע עבור שיעור בודד. @returns {JSX.Element} כרטיס שיעור. */

export default function LessonCard({ number, title, duration, completed }) {
  return (
    <article className={`lesson-card ${completed ? 'completed' : ''}`}>
      <div className="lesson-number" aria-hidden="true">{number}</div>
      <div className="lesson-info">
        <h3>{title}</h3>
        <p>{duration} דקות</p>
      </div>
      <button
        className="icon-button"
        type="button"
        aria-label={completed ? `צפה בשיעור ${title} שוב` : `פתח את השיעור ${title}`}
      >
        {completed ? '✓' : '▶'}
      </button>
    </article>
  );
}
