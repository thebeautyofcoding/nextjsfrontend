
import { userPublicProfile } from './../../actions/user';
import Link from 'next/link';
import Layout from './../../components/Layout';
import moment from 'moment'
import { API } from '../../config';


const UserProfile = ({user, blogs, query}) => {
    if(!user, !blogs)return null

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
           return <div key={i}><Link href={`/blogs/${blog.slug}`}><a>{blog.title}</a></Link></div>
        })
    }

    return <>
      
            <p>Joined {moment(user.createdAt).fromNow()}</p>

        <img src={`${API}/user/photo/${user.username}`} />
        

        <h5>Recent blogs by {user.name}</h5>


        <p>{showUserBlogs()}</p>
    </>
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


