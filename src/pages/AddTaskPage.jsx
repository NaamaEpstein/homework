import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

/**
 * מציג טופס להוספת משימה ומשייך אותה לקורס קיים.
 * @param {Object} props פרופס הרכיב.
 * @param {Array<Object>} props.courses רשימת הקורסים לבחירה.
 * @param {(task: Object) => void} props.onAddTask callback להוספת משימה.
 * @returns {JSX.Element} עמוד הוספת המשימה.
 */
export default function AddTaskPage({ courses, onAddTask }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', courseId: courses[0]?.id?.toString() || '',
    priority: 'בינונית', status: 'פתוחה', dueDate: '',
  });

  /**
   * מעדכן שדה בטופס המשימה לפי name של שדה הטופס.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event אירוע שינוי.
   * @returns {void}
   */
  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  /**
   * מאמת ומשלים את נתוני המשימה החדשה לפני המעבר לעמוד המשימות.
   * @param {React.FormEvent<HTMLFormElement>} event אירוע שליחת טופס.
   * @returns {void}
   */
  function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.courseId) return;

    onAddTask({
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      courseId: Number(form.courseId),
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
    });
    navigate('/tasks');
  }

  return (
    <div className="app-shell">
      <Header activePage="tasks" />
      <main className="dashboard">
        <button className="back-button" type="button" onClick={() => navigate('/tasks')}>→ חזרה למשימות</button>
        <form className="course-form task-form" onSubmit={submit}>
          <h1>הוספת משימה חדשה</h1>
          <div className="form-grid">
            <label>כותרת<input name="title" value={form.title} onChange={updateForm} required /></label>
            <label>קורס
              <select name="courseId" value={form.courseId} onChange={updateForm} required>
                <option value="">בחרי קורס</option>
                {courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
              </select>
            </label>
            <label>רמת חשיבות
              <select name="priority" value={form.priority} onChange={updateForm}><option>נמוכה</option><option>בינונית</option><option>גבוהה</option></select>
            </label>
            <label>סטטוס
              <select name="status" value={form.status} onChange={updateForm}><option>פתוחה</option><option>בתהליך</option><option>הושלמה</option></select>
            </label>
            <label>תאריך יעד<input name="dueDate" type="date" value={form.dueDate} onChange={updateForm} /></label>
            <label className="description-field">תיאור<textarea name="description" value={form.description} onChange={updateForm} /></label>
          </div>
          <button className="primary-button" type="submit">הוספת משימה</button>
        </form>
      </main>
    </div>
  );
}
