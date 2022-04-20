import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ProfileSidebar from '../../components/shop/profile/ProfileSidebar';

const Profile = () => {
  return (
      <div className="content">
        <div className="max-content">
            <div className="grid md:grid-cols-3 grid-rows-2 md:grid-rows-none">
                <Helmet><title>Tulin Bicycle Shop | Profile</title></Helmet>
                <ProfileSidebar />
                <Outlet />
            </div>
        </div>
      </div>
  );
};

export default Profile;
