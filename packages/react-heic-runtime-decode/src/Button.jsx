export const Button = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className='animate-button'
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <p>
        {children}
      </p>
    </div>
  );
};
