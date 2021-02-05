package com.ikons.requestmanagement.core.usecase.request;

import com.ikons.requestmanagement.core.entity.RequestMailContent;
import com.ikons.requestmanagement.dataprovider.database.entity.User;

import java.util.List;

public interface RequestActionNotification {


    void sendRequestCreationEmail(final List<User> administrators, final RequestMailContent requestMailContent);
}
