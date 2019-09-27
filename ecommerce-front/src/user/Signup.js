import React from 'react';
import Layout from '../core/Layout';
import {API} from '../config'
const Signup = () => {
  console.log(process.env)
  return (
    <Layout title="Sign up">
      
      {API}
    </Layout>
  )

}

export default Signup;
