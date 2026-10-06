package com.permuta.ejemplo_mapper.djinn.exception;

public class DjinnNotFoundException extends RuntimeException {

    public DjinnNotFoundException(Long id) {
        super("No existe ningún djinn con id " + id);
    }
}
