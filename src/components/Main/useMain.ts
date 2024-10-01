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
        if (email.trim() === "" || password.trim() === "") {
            alert('smth wrong ;(')
        } else if (isEmailValid && isPasValid && (!isSignUpVisible || (isNameValid && isSurnameValid))) {
            window.location.reload()
            alert('successfully ;)')
        } else {
            alert('smth wrong ;(')
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