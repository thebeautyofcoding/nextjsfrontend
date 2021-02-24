import Link from 'next/link'
import { useState } from 'react';
import moment from 'moment'
import {listSearch} from '../../actions/blog'

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        messsage:''
    })

    const { search, results, searched, message } = values
    console.log(search, results, searched, message )

    const searchedBlogs = (results = []) => {
        return (
            <div className="search">
                {message && <p>{message}</p>}
                { results.map((blog, i) => {
                    return (
                        <div className="search-results" key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                            <a>{blog.title}</a></Link>
                        </div>)
                })}
            </div>)
    }



    const searchSubmit = (e) => {
        e.preventDefault()


        listSearch({ search }).then(data => {
            console.log(data)
            setValues({ ...values, results: data, searched: true, message: `${data.length} ${data.length ===1 ? 'blog found': 'blogs found'}` })
              console.log(search, results, searched, message )
        })
    }

    const handleChange = (e) => {
        setValues({...values, search: e.target.value, searched:false, results:[]})
    }


    const searchForm = () => {
        return (
            
            <form className="container container__row mt-small" onSubmit={searchSubmit}>
                <div className="form-component">
                    <input className="input" type="search" placeholder="Search for blog posts..." onChange={handleChange}/>
                </div>
                <div className="form-component">
                    <button className="Button"type="submit">Search</button>
                    </div>
                    



            </form>
       )

  
    }
    

          return (<>
        
              <div>
                  <div className="container__column">
                      {searchForm()}
                  </div>
             
                  {searched && <div className="container__column">{searchedBlogs(results)}</div>}
                   </div>
            </>
        )
}

export default Search