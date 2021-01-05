/**
 * My Home Components
 */
import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

import { getAllCheckedInBusiness, getUserData } from '../lib/utils';

class Activevisitor extends Component {
  constructor() {
    super({
      name: 'Activevisitor',
      model: {},
      routerPath: '/businessDashboard/Activevisitor',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'Activevisitor';

    // display the active users from the business
    const businessId = localStorage.getItem('uid');
    const activeUsers = await getAllCheckedInBusiness(businessId);

    /**  Array contains just userId & date ->
     *  map the active users to the new format that is used in the Frontend
     * to get the userData (firstname, lastname...),
     * the method to get all the userData is called
     * and getting mapped in a new object with userId & date */
    const users = activeUsers.map(async (user) => {
      const userData = await getUserData(user.id);
      return { ...userData, ...user };
    });

    /** Since the map of the activeUsers is async, you'll get
    * an array of promises that need to be awaited
    * with promise.all([Promises]) javascript will await all the users
    * in the array and give the data from the map
    * resolvedUsers can now be used in Frontend */
    const resolvedUsers = await Promise.all(users);

    const userInfo = await userdata();
    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.Activevisitor({
        logout: '/businessDashboard',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'business',
        info: 'Active visitors',
        resolvedUsers,
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default Activevisitor;
