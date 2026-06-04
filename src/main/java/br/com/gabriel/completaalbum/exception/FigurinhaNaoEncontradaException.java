package br.com.gabriel.completaalbum.exception;

public class FigurinhaNaoEncontradaException
        extends RuntimeException{

    public FigurinhaNaoEncontradaException(String codigo) {
        super("Figurinha não encontrada: " + codigo);
    }
}
