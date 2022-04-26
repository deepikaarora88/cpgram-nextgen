package org.egov.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marcosbarbero.cloud.autoconfigure.zuul.ratelimit.config.repository.DefaultRateLimiterErrorHandler;
import com.marcosbarbero.cloud.autoconfigure.zuul.ratelimit.config.repository.RateLimiterErrorHandler;
import org.egov.tracer.model.CustomException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@org.springframework.context.annotation.Configuration
public class Configuration {

    public static final String TOO_MANY_REQUESTS_EXCEPTION_KEY = "TOO_MANY_REQUESTS";

    @Bean
    public RestTemplate restTemplate() {
        return  new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    @Bean
    public RateLimiterErrorHandler rateLimitErrorHandler() {
        return new DefaultRateLimiterErrorHandler() {
            @Override
            public void handleSaveError(String key, Exception e) {
                throw new CustomException(TOO_MANY_REQUESTS_EXCEPTION_KEY, HttpStatus.TOO_MANY_REQUESTS.toString());
            }

            @Override
            public void handleFetchError(String key, Exception e) {
                throw new CustomException(TOO_MANY_REQUESTS_EXCEPTION_KEY, HttpStatus.TOO_MANY_REQUESTS.toString());
            }

            @Override
            public void handleError(String msg, Exception e) {
                throw new CustomException(TOO_MANY_REQUESTS_EXCEPTION_KEY, HttpStatus.TOO_MANY_REQUESTS.toString());
            }
        };
    }


}
