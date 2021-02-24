
import { userPublicProfile } from './../../actions/user';
import Link from 'next/link';
import Layout from './../../components/Layout';
import moment from 'moment'
import { API } from '../../config';


const UserProfile = ({user, blogs, query}) => {
    if(!user, !blogs)return null

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
           return <li className="center" key={i}><Link href={`/blogs/${blog.slug}`}><a>{blog.title}</a></Link></li>
        })
    }

    return <div className="container__column">
      
            <p className="success">Joined {moment(user.createdAt).fromNow()}</p>

        <img src={`${API}/user/photo/${user.username}`} />
        

        <h5 className="m-medium">Recent blogs by {user.name}</h5>


       <ul className="container__column"> {showUserBlogs()}</ul>
    </div>
}




UserProfile.getInitialProps =  async ({ query }) => {
    

    const data = await userPublicProfile(query.username)
    console.log('16', data.data.userFromDb)
    if (data.error) {
        console.log(data.error)
    } else {
        return {
            user:data.data.userFromDb, blogs:data.data.blogs, query:query
        }
    }
}

export default UserProfile;


