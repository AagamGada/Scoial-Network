import React from 'react';
import "../../style/Profile.css"
const Avatar = ({src, size}) => {
    return (
        <img src={src} alt="avatar" className={size} />
    )
}
export default Avatar