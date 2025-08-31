export const Button = ({ onClick, children }) => {
  return (
    <view
      bindtap={onClick}
      className='animate-button'
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <text style={{ color: 'white', fontFamily: 'system-ui' }}>
        {children}
      </text>
    </view>
  );
};
