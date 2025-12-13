import { useState } from 'react'

// 1. Auto-import all files matching './AppPart*.jsx'
// { eager: true } loads them immediately so we can use them right away.
const modules = import.meta.glob('./AppPart*.jsx', { eager: true })

// 2. Transform the imported modules into a clean array of objects
const parts = Object.keys(modules).map((path) => {
  // path looks like "./AppPart1a.jsx"
  const fileName = path.split('/').pop().replace('.jsx', '') // "AppPart1a"
  const label = fileName.replace('App', '') // "Part1a" (You can format this further if you like)

  return {
    id: fileName,
    label: label,
    Component: modules[path].default // The actual React component
  }
})

// Sort parts alphabetically so they appear in order (optional but recommended)
parts.sort((a, b) => a.label.localeCompare(b.label))

const App = () => {
  const [activePart, setActivePart] = useState(null)

  return (
    <div>
      {/* THE NAVIGATION BAR */}
      <div style={navStyle}>
        <button onClick={() => setActivePart(null)}>Home</button>

        {/* Dynamically generate buttons */}
        {parts.map((part) => (
          <button key={part.id} onClick={() => setActivePart(part)}>
            {part.label}
          </button>
        ))}
      </div>

      <hr />

      {/* THE ACTIVE COMPONENT */}
      <div style={{ padding: '20px' }}>
        {activePart ? (
          <activePart.Component />
        ) : (
          <div>
            <h2>Select an exercise to view</h2>
            <p>Click a button above to render that component.</p>
            <p><em>Tip: Add a new file named "AppPart..." to see it appear automatically!</em></p>
          </div>
        )}
      </div>
    </div>
  )
}

// Simple CSS to make the navbar look decent
const navStyle = {
  display: 'flex',
  gap: '10px',
  padding: '10px',
  background: '#f0f0f0',
  borderBottom: '2px solid #ccc',
  flexWrap: 'wrap' // Allows buttons to wrap to next line if there are many
}

export default App