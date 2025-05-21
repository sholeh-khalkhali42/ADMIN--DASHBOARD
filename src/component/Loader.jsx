import React from 'react';

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <div>Loading...</div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    fontSize: '1.2rem',
    color: '#007bff',
  },
  spinner: {
    width: '40px',
    height: '40px',
    marginBottom: '10px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};


const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default React.memo(Loader);;
