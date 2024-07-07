package com.paw.uac.exception;

public class UsernameOrPasswordIsIncorrectException extends RuntimeException{
    public UsernameOrPasswordIsIncorrectException (String message) {
        super (message);
    }
}
