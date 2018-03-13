import React from 'react';
import styles from './index.scss';

function Icon(props) {
  if (!(props instanceof Object)) {
    return (
      <span>
        <svg className="icon">
          <use xlinkHref={props} />
        </svg>
      </span>
    );
  }
  return (
    <svg className={`icon ${props.className}`} style={props.style}>
      <use xlinkHref={props.href} />
    </svg>
  );
}

Icon.Circle = (props) => {
  return (
    <div className={`${styles.circle} ${props.className}`} style={{ ...props.style, color: props.color || props.style.color }} />
  );
};
export default Icon;
