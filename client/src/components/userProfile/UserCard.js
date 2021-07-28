import React from 'react'
import Person from '../../images/person1.jpg';
import '../../style/Profile.css';
const UserCard = ({ setShowFollowers, setShowFollowing, }) => {
    const handleCloseAll = () => {
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }
    return (
        <div className="d-flex p-2 align-items-center justify-content-between w-100 ">
            <div>
                <div onClick={handleCloseAll}
                className="d-flex align-items-center">
                    <img src={Person} className="big-avatar" />
                    <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">Misthi</span>
                        <small style={{opacity: 0.7}}>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserCard