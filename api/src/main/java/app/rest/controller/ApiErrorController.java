package app.rest.controller;

import app.rest.exception.BookException;
import app.rest.model.ApiError;
import app.rest.exception.UserExistedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolationException;

/**
 * Created by Pavel on 27.01.2018.
 */
@RestController
public class ApiErrorController {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolationException(ConstraintViolationException exception) {
        return ResponseEntity.badRequest().body(new ApiError(exception.getMessage()));
    }

    @ExceptionHandler(UserExistedException.class)
    public ResponseEntity<ApiError> handleUserExistedException(UserExistedException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiError(e.getMessage()));
    }

    @ExceptionHandler(BookException.class)
    public ResponseEntity<ApiError> handleUserExistedException(BookException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(e.getMessage()));
    }


}
