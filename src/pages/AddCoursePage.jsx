import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

/**
 * מציג ומנהל את טופס הוספת קורס חדש.
 * @param {Object} props פרופס הרכיב.
 * @param {(course: Object) => void} props.onAddCourse callback להוספת קורס.
 * @returns {JSX.Element} עמוד הוספת הקורס.
 */
export default function AddCoursePage({ onAddCourse }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', teacher: '', category: '', isActive: true,
  });

  /**
   * מעדכן שדה בנתוני הטופס לפי שם השדה ואפשרות checkbox.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event אירוע שינוי.
   * @returns {void}
   */
  function updateForm(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  /**
   * מאמת את הטופס, בונה אובייקט קורס חדש ומחזיר לעמוד הקורסים.
   * @param {React.FormEvent<HTMLFormElement>} event אירוע שליחת טופס.
   * @returns {void}
   */
  function submit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.teacher.trim()) return;

    onAddCourse({
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim() || 'קורס חדש במערכת.',
      teacher: form.teacher.trim(),
      category: form.category.trim() || 'כללי',
      lessons: [],
      isActive: form.isActive,
    });
    navigate('/courses');
  }

  return (
    <div className="app-shell">
      <Header activePage="courses" />
      <main className="dashboard">
        <button className="back-button" type="button" onClick={() => navigate('/courses')}>→ חזרה לקורסים</button>
        <form className="course-form" onSubmit={submit}>
          <h1>הוספת קורס חדש</h1>
          <div className="form-grid">
            <label>שם הקורס<input name="name" value={form.name} onChange={updateForm} required /></label>
            <label>מרצה<input name="teacher" value={form.teacher} onChange={updateForm} required /></label>
            <label>קטגוריה<input name="category" value={form.category} onChange={updateForm} /></label>
            <label className="description-field">תיאור<textarea name="description" value={form.description} onChange={updateForm} /></label>
            <label className="checkbox-field"><input name="isActive" type="checkbox" checked={form.isActive} onChange={updateForm} /> קורס פעיל</label>
          </div>
          <button className="primary-button" type="submit">הוספת קורס</button>
        </form>
      </main>
    </div>
  );
}
