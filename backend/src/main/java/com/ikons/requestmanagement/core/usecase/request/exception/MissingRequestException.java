package com.ikons.requestmanagement.core.usecase.request.exception;

public class MissingRequestException extends RuntimeException {

    public MissingRequestException(final Long requestId) {
        super("request-not-found " + requestId);
    }
}