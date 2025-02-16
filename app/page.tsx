import React from 'react'

import Main from './Main'

import bcrypt from 'bcrypt'
const saltRounds = 10; // cost factor
const myPlaintextPassword = 'Whiz@123';

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Hashed password:', hash);
});

const page = () => {
  return (
    <div>
     
     <Main/>
    </div>
  )
}

export default page
