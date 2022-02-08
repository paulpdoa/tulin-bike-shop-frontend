import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ProfileSidebar from '../../components/shop/profile/ProfileSidebar';

const Profile = () => {
  return (
      <div className="content">
        <div className="max-content">
            <div className="grid grid-cols-3">
                <Helmet><title>Tulin Bicycle Shop | Profile</title></Helmet>
                <ProfileSidebar />
                <Outlet />
            </div>
        </div>
      </div>
  );
};

export default Profile;
