import React from 'react'

const Footer = () => {
  return (
    <div style={{}}>
      <div
        style={{ height: '3rem', background: 'var(--backgroundColor)' }}
      ></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          background: '#355764',
          height: '4rem',
        }}
      >
        Made with ❤️ for IBM
      </div>
    </div>
  )
}

export default Footer
