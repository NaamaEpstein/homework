import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

/**
 * מציג רשימת משימות ומנהל סינון, הוספה, עריכה ומחיקה.
 * @param {Object} props פרופס הרכיב.
 * @param {Array<Object>} props.courses רשימת הקורסים המשויכים למשימות.
 * @param {Array<Object>} props.tasks רשימת המשימות.
 * @param {(updater: Function) => void} props.setTasks callback לעדכון המשימות.
 * @returns {JSX.Element} עמוד ניהול המשימות.
 */
export default function TasksPage({ courses, tasks, setTasks }) {
  const [form, setForm] = useState(emptyTask);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('הכל');
  const [courseFilter, setCourseFilter] = useState('הכל');
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) =>
    (statusFilter === 'הכל' || task.status === statusFilter) &&
    (courseFilter === 'הכל' || task.courseId === Number(courseFilter)),
  );

  /** מעדכן את נתוני טופס המשימה משדה קלט. @param {React.ChangeEvent<HTMLElement>} event אירוע שינוי. */
  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  /** מאפס את הטופס ומציג אותו במצב הוספה. */
  function openAddForm() {
    setEditingId(null);
    setForm({ ...emptyTask, courseId: courses[0]?.id?.toString() || '' });
    setShowForm(true);
  }

  /** מעמיס נתוני משימה בטופס לעריכה. @param {Object} task המשימה לעריכה. */
  function editTask(task) {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      courseId: task.courseId.toString(),
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    });
    setShowForm(true);
  }

  /** מאמת ושומר משימה חדשה או עדכון של משימה קיימת. @param {React.FormEvent<HTMLFormElement>} event אירוע שליחת טופס. */
  function saveTask(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.courseId) return;

    const savedTask = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      courseId: Number(form.courseId),
    };

    if (editingId) {
      setTasks((current) => current.map((task) =>
        task.id === editingId ? { ...savedTask, id: editingId } : task,
      ));
    } else {
      setTasks((current) => [...current, { ...savedTask, id: Date.now() }]);
    }

    setForm(emptyTask);
    setEditingId(null);
    setShowForm(false);
  }

  /** מוחק משימה לפי מזהה. @param {number} id מזהה המשימה. */
  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  /** משנה את הסטטוס של משימה. @param {number} id מזהה המשימה. @param {string} status הסטטוס החדש. */
  function changeStatus(id, status) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, status } : task,
    ));
  }

  /** ממיר תאריך ISO לפורמט תצוגה. @param {string} date תאריך ISO. @returns {string} תאריך מעוצב. */
  function formatDate(date) {
    if (!date) return 'ללא תאריך יעד';
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="app-shell">
      <Header activePage="tasks" />
      <main className="dashboard tasks-page">
        <section className="courses-header">
          <div>
            <p className="eyebrow">משימות לימודיות</p>
            <h1>ניהול משימות</h1>
          </div>
          <button className="primary-button" type="button" onClick={() => navigate('/tasks/add')}>
            + משימה חדשה
          </button>
        </section>

        {showForm && (
          <form className="course-form task-form" onSubmit={saveTask}>
            <h2>{editingId ? 'עריכת משימה' : 'הוספת משימה חדשה'}</h2>
            <div className="form-grid">
              <label>כותרת<input name="title" value={form.title} onChange={updateForm} required /></label>
              <label>קורס
                <select name="courseId" value={form.courseId} onChange={updateForm} required>
                  <option value="">בחרי קורס</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </label>
              <label>רמת חשיבות
                <select name="priority" value={form.priority} onChange={updateForm}>
                  <option>נמוכה</option>
                  <option>בינונית</option>
                  <option>גבוהה</option>
                </select>
              </label>
              <label>סטטוס
                <select name="status" value={form.status} onChange={updateForm}>
                  <option>פתוחה</option>
                  <option>בתהליך</option>
                  <option>הושלמה</option>
                </select>
              </label>
              <label>תאריך יעד<input name="dueDate" type="date" value={form.dueDate} onChange={updateForm} /></label>
              <label className="description-field">תיאור
                <textarea name="description" value={form.description} onChange={updateForm} />
              </label>
            </div>
            <button className="primary-button" type="submit">{editingId ? 'שמירת שינויים' : 'הוספת משימה'}</button>
          </form>
        )}

        <div className="task-filters">
          <label>סינון לפי סטטוס
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>הכל</option>
              <option>פתוחה</option>
              <option>בתהליך</option>
              <option>הושלמה</option>
            </select>
          </label>
          <label>סינון לפי קורס
            <select value={courseFilter} onChange={(event) => setCourseFilter(event.target.value)}>
              <option value="הכל">הכל</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </label>
          <span className="course-count">{filteredTasks.length} משימות</span>
        </div>

        {filteredTasks.length ? (
          <div className="tasks-grid">
            {filteredTasks.map((task) => {
              const course = courses.find((item) => item.id === task.courseId);
              return (
                <article className={`task-management-card ${task.status === 'הושלמה' ? 'completed' : ''}`} key={task.id}>
                  <div className="task-card-top">
                    <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                    <span className={`task-status status-${task.status}`}>{task.status}</span>
                  </div>
                  <h2>{task.title}</h2>
                  <p className="task-description">{task.description || 'אין תיאור למשימה.'}</p>
                  <div className="task-card-meta">
                    <span><strong>קורס:</strong> {course?.name || 'לא משויך'}</span>
                    <span><strong>תאריך יעד:</strong> {formatDate(task.dueDate)}</span>
                  </div>
                  <label className="status-select">סטטוס
                    <select value={task.status} onChange={(event) => changeStatus(task.id, event.target.value)}>
                      <option>פתוחה</option>
                      <option>בתהליך</option>
                      <option>הושלמה</option>
                    </select>
                  </label>
                  <div className="task-card-actions">
                    <button className="card-button" type="button" onClick={() => editTask(task)}>עריכה</button>
                    <button className="delete-button" type="button" onClick={() => deleteTask(task.id)}>מחיקה</button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">אין משימות התואמות לסינון שנבחר.</div>
        )}
      </main>
    </div>
  );
}
