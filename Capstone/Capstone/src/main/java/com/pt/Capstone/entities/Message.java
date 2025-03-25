package com.pt.Capstone.entities;

import com.pt.Capstone.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String senderName;
    private String receiverName;
    private String content;
    private String date;
    private Status status;
}
