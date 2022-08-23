package org.egov.rn.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.experimental.SuperBuilder;
import org.springframework.validation.annotation.Validated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

/**
 * A representation of org.egov.rn.web.models.web.Household
 */
@ApiModel(description = "A representation of org.egov.rn.web.models.web.Household")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2022-08-23T14:53:48.053+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Household extends Registration  {
        @JsonProperty("isHead")
        private Boolean isHead = null;


}

