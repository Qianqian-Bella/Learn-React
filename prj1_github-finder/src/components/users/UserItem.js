import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  //   const { login, avatar_url, html_url } = props.user;

  //   constructor() {
  //     super();
  //     this.state = {
  //       id: 'id',
  //       login: 'mojombo',
  //       avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  //       html_url: 'https://github.com/mojombo',
  //     };
  //   }

  // 也可以不用constructor
  //   state = {
  //     id: 'id',
  //     login: 'mojombo',
  //     avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  //     html_url: 'https://github.com/mojombo',
  //   };

  // const { login, avatar_url, html_url } = this.state;

  return (
    <div className='card text-center'>
      <img src={avatar_url} alt='' className='round-img' style={{ width: '60px' }} />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.prototype = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
