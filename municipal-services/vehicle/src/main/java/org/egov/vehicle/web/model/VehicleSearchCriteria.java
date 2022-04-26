package org.egov.vehicle.web.model;

import java.util.List;

import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleSearchCriteria {
	@JsonProperty("offset")
	private Integer offset;

	@JsonProperty("limit")
	private Integer limit;

	@JsonProperty("tenantId")
	private String tenantId;

	@JsonProperty("mobileNumber")
	private String mobileNumber;

	@JsonProperty("ownerId")
	private List<String> ownerId;
	
	@JsonProperty("ids")
	private List<String> ids;
	
	@JsonProperty("registrationNumber")
	private List<String> registrationNumber;
	
	@JsonProperty("type")
	private List<String> type;
	
	@JsonProperty("model")
	private List<String> model;
	
	@JsonProperty("tankCapacity")
	private Double tankCapacity;
	
	@JsonProperty("suctionType")
	private List<String> suctionType;


	  @JsonProperty("sortBy")
	    private SortBy sortBy;
	    
	    @JsonProperty("sortOrder")
	    private SortOrder sortOrder;
	    
	    public enum SortOrder {
	        ASC,
	        DESC
	    }

	    public enum SortBy {
	        type,
	        model,
	        suctionType,
	        pollutionCertiValidTill,
	        InsuranceCertValidTill,
	        fitnessValidTill,
	        roadTaxPaidTill,
	        tankCapicity,
	        createdTime
	    }
	

	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return (this.tenantId == null && this.offset == null && this.limit == null && this.mobileNumber == null && this.tankCapacity ==null
				&&  CollectionUtils.isEmpty(this.ownerId)  && CollectionUtils.isEmpty(this.type)
				&& CollectionUtils.isEmpty(this.ids) && CollectionUtils.isEmpty(this.registrationNumber)
				&& CollectionUtils.isEmpty(this.model) && CollectionUtils.isEmpty(this.suctionType));
	}

	public boolean tenantIdOnly() {
		// TODO Auto-generated method stub
		return (this.tenantId != null && this.mobileNumber == null && this.tankCapacity ==null
				&&  CollectionUtils.isEmpty(this.ownerId)  && CollectionUtils.isEmpty(this.type)
				&& CollectionUtils.isEmpty(this.ids) && CollectionUtils.isEmpty(this.registrationNumber)
				&& CollectionUtils.isEmpty(this.model) && CollectionUtils.isEmpty(this.suctionType));
	}
}
