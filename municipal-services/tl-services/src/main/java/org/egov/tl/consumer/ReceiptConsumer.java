package org.egov.tl.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.tl.service.PaymentUpdateService;
import org.egov.tl.service.notification.PaymentNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Slf4j
@Component
public class ReceiptConsumer {

    private PaymentUpdateService paymentUpdateService;

    private PaymentNotificationService paymentNotificationService;


    @Autowired
    public ReceiptConsumer(PaymentUpdateService paymentUpdateService, PaymentNotificationService paymentNotificationService) {
        this.paymentUpdateService = paymentUpdateService;
        this.paymentNotificationService = paymentNotificationService;
    }



    @KafkaListener(topicPattern = "${kafka.topics.receipt.topic.pattern}")
    public void listenPayments(final HashMap<String, Object> record) {

        log.info("Received Record: ",record);
        paymentUpdateService.process(record);
        paymentNotificationService.process(record);
    }
}
