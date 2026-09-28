import './GlitchText.css';

// React Bits' GlitchText. `as` picks the element (it sits inside headings here), and the text colour,
// size and slice background come from the surrounding CSS instead of being fixed white-on-dark.
const GlitchText = ({
  children,
  as: Tag = 'div',
  speed = 0.5,
  enableShadows = true,
  shadowColors = ['red', 'cyan'],
  enableOnHover = false,
  className = ''
}) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? `-0.06em 0 ${shadowColors[0]}` : 'none',
    '--before-shadow': enableShadows ? `0.06em 0 ${shadowColors[1]}` : 'none'
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <Tag className={`glitch ${hoverClass} ${className}`} style={inlineStyles} data-text={children}>
      {children}
    </Tag>
  );
};

export default GlitchText;
