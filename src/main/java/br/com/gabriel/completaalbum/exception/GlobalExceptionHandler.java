package br.com.gabriel.completaalbum.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FigurinhaNaoEncontradaException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> tratarFigurinhaNaoEncontrada(
            FigurinhaNaoEncontradaException ex
    ) {

        return Map.of(
                "erro",
                ex.getMessage()
        );
    }
}
