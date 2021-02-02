package com.ikons.requestmanagement.core.usecase;


import java.io.IOException;

public class CannotDeserializeException extends IllegalStateException {

    public CannotDeserializeException(IOException e) {
        super("cannot-deserialize", e);

    }
}