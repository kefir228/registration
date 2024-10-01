import React, { useState } from 'react';
import './Main.css'
import { useMain } from './useMain';
import { Header } from 'components/Header/Header';


export const Main = () => {
    const { isSignUpVisible, handleNameChange, handleSurnameChange, isEmailValid, handleEmailChange, isPasValid, name, surname, isSurnameValid, isNameValid, handlePasChange, clickCheckBox, rememberMe, clickSignIn, handleRememberMe, toggleSignUp, password, email } = useMain()


    return (<>
        <Header
            log= {isSignUpVisible ?  'Sign Up' : "Sign In"}
        />
        <div className='inputs'>

            {isSignUpVisible && (
                <>
                    <input
                        className={`input ${name === "" ? '' : (isNameValid ? 'valid' : 'invalid')}`}
                        type="text"
                        placeholder='First Name *'
                        value={name}
                        onChange={handleNameChange}
                    />
                    <input
                        className={`input ${surname === "" ? '' : (isSurnameValid ? 'valid' : 'invalid')}`}
                        type="text"
                        placeholder='Last Name *'
                        value={surname}
                        onChange={handleSurnameChange}
                    />
                </>
            )}

            <input
                className={`input ${email === "" ? '' : (isEmailValid ? 'valid' : 'invalid')}`}
                type="text"
                placeholder='Email Address *'
                value={email}
                onChange={handleEmailChange}
            />

            <input
                className={`input ${password === "" ? '' : (isPasValid ? 'valid' : 'invalid')}`}
                type="password"
                placeholder='Password *'
                value={password}
                onChange={handlePasChange}
            />

            <main className='check'>
                <input className='checkBox'
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    onClick={clickCheckBox}
                />
                <p>Remember me</p>
            </main>

            <button className='signIn'
                type='button'
                onClick={clickSignIn}
            >
                <p className='text'>
                    {isSignUpVisible ? "SIGN UP" : "SIGN IN"}
                </p>
            </button>

            <footer className='footer'>
                <a href='#' className='forgot'>
                    Forgot password?
                </a>
                <a href='#' className='signUp'
                    onClick={toggleSignUp}
                >
                    {isSignUpVisible ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </a>
            </footer>
        </div>
    </>)
}

