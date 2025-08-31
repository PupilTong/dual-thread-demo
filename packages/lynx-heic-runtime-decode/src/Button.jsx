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
      <text>
        {children}
      </text>
    </view>
  );
};
