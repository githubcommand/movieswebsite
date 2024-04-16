import React,{useContext} from 'react'
import { AppContext } from './context'
import Search from './Search';
import Movies from './Movies';

const Home = () => {
  return (
    <div>
        <Search/>
        <Movies/>
    </div>
  )
}

export default Home
