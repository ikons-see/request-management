package com.ikons.requestmanagement.core.usecase.request;

import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.User;

import java.util.List;

public interface RequestActionNotification {


    void sendRequestCreationEmail(final List<String> administrators, final RequestMailContentDTO requestMailContent);
}
