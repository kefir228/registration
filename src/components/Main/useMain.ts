import React, { useState } from "react"

const validateEmail = (email: string): boolean => {
    const emailRegex = /^.+@.+\..+$/;
    return emailRegex.test(email);
}

const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password)
}

const validateName = (name: string): boolean => {
    const nameRedex = /^[a-zA-Zа-яА-ЯіІєЄґҐ'ʼ]{3,}$/
    return nameRedex.test(name)
}

const validateSurname = (surname: string): boolean => {
    const surnameRegex = /^[a-zA-Zа-яА-ЯіІєЄґҐ'ʼ]{3,}$/;
    return surnameRegex.test(surname);
};


export const useMain = () => {
    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)

    const [password, setPassword] = useState("")
    const [isPasValid, setIsPasValid] = useState(true)

    const [rememberMe, setRememberMe] = useState(false);

    const [name, setName] = useState('')
    const [isNameValid, setIsNameValid] = useState(true)
    const [surname, setSurname] = useState('')
    const [isSurnameValid, setIsSurnameValid] = useState(true)

    const [isSignUpVisible, setIsSignUpVisible] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
        setIsEmailValid(validateEmail(value))
    }

    const handlePasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
        setIsPasValid(validatePassword(value))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setName(value)
        setIsNameValid(validateName(value))
    }

    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSurname(value)
        setIsSurnameValid(validateSurname(value))
    }

    const saveData = (email: string, password: string) => {
        localStorage.setItem('email', email)
        localStorage.setItem("password", password)
    }

    const loadData = () => {
        const savedEmail = localStorage.getItem("email")
        const savedPassword = localStorage.getItem("password")

        if (savedEmail && savedPassword) {
            setEmail(savedEmail)
            setPassword(savedPassword)
        }
    }

    const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setRememberMe(checked)

        if (checked) {
            saveData(email, password)
        } else {
            localStorage.removeItem(email)
            localStorage.removeItem(password)
        }
    }

    const clickCheckBox = () => {
        if (!rememberMe) {
            loadData()
        }
    }

    const clickSignIn = () => {

        const isEmailEmpty = email.trim() === "";
        const isPasswordEmpty = password.trim() === "";
        const isNameEmpty = name.trim() === "";
        const isSurnameEmpty = surname.trim() === "";

        const accounts = JSON.parse(localStorage.getItem('accounts') || '[]') as Array<{ email: string, password: string, name: string, surname: string }>;

        if (isEmailEmpty || isPasswordEmpty || (isSignUpVisible && (isNameEmpty || isSurnameEmpty))) {
            alert('smth wrong ;(')
        } else if (isSignUpVisible && isEmailValid && isPasValid && isNameValid && isSurnameValid) {
            const accountExist = accounts.find(account => account.email === email)

            if (accountExist) {
                alert('Account with this email already exists.')
            } else {
                const newAccount = { email, password, name, surname }
                accounts.push(newAccount)
                localStorage.setItem('accounts', JSON.stringify(accounts))
                window.location.reload()
                alert('Account created successfully ;)')
            }
        }
        else if (!isSignUpVisible && isEmailValid && isPasValid) {
            
            const account = accounts.find(account => account.email === email && account.password === password)

            if (account) {
                alert(`Welcome back, ${account.name}!`);
                window.location.reload();
            } else {
                alert('Invalid email or password.');
            }
        }
    }
    const toggleSignUp = () => {
        setIsSignUpVisible(prev => !prev);
    };
    return {
        isSignUpVisible, handleNameChange, handleSurnameChange,
        isEmailValid, handleEmailChange, isPasValid, name, surname,
        isSurnameValid, isNameValid, handlePasChange, clickCheckBox,
        rememberMe, clickSignIn, handleRememberMe, toggleSignUp, password, email
    }
}