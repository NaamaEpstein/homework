import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * מציג את ניווט המערכת ואת תפריט בחירת התלמידה.
 * @param {Object} props פרופס הכותרת.
 * @param {string} props.student התלמידה הנוכחית.
 * @param {(student: string) => void} props.onStudentChange callback לשינוי תלמידה.
 * @returns {JSX.Element} הכותרת העליונה.
 */
export default function Header({ student = localStorage.getItem('currentStudent') || 'נועה לוי', onStudentChange = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(() =>
    localStorage.getItem('currentStudent') || student || 'נועה לוי',
  );
  const menuRef = useRef(null);

  const students = [
    { name: 'נועה לוי', initials: 'נ' },
    { name: 'מאיה כהן', initials: 'מ' },
    { name: 'תומר ברק', initials: 'ת' },
  ];

  useEffect(() => {
    /** סוגר את תפריט התלמידה כאשר לחיצה נעשית מחוץ לתפריט. */
    function closeMenu(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentStudent', selectedStudent);
    onStudentChange(selectedStudent);
    window.dispatchEvent(new CustomEvent('studentChanged', { detail: selectedStudent }));
  }, [selectedStudent, onStudentChange]);

  const currentStudent = students.find((item) => item.name === selectedStudent) || students[0];

  return (
    <header className="app-header">
      <NavLink className="brand" to="/" aria-label="מערכת ניהול קורסים - עמוד ראשי">
        <span className="brand-mark">ק</span>
        <span>ניהול קורסים</span>
      </NavLink>

      <nav className="main-nav" aria-label="ניווט ראשי">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/courses">קורסים</NavLink>
        <span className="nav-link nav-link-static" aria-label="שיעורים">שיעורים</span>
        <NavLink end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/tasks">משימות</NavLink>
      </nav>

      <div className="profile-menu" ref={menuRef}>
        <button
          className="profile-button"
          type="button"
          aria-label="בחירת תלמידה נוכחית"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {currentStudent.initials}
        </button>

        {menuOpen && (
          <div className="student-dropdown">
            <strong>תלמידה נוכחית</strong>
            {students.map((item) => (
              <button
                key={item.name}
                className={item.name === selectedStudent ? 'selected' : ''}
                type="button"
                onClick={() => {
                  setSelectedStudent(item.name);
                  setMenuOpen(false);
                }}
              >
                <span>{item.initials}</span>
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
