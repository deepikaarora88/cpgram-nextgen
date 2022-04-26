package org.egov.fsm.repository.rowmapper;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.fsm.web.model.AuditDetails;
import org.egov.fsm.web.model.FSM;
import org.egov.fsm.web.model.PitDetail;
import org.egov.fsm.web.model.location.Address;
import org.egov.fsm.web.model.location.Boundary;
import org.egov.fsm.web.model.location.GeoLocation;
import org.egov.tracer.model.CustomException;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class FSMRowMapper implements ResultSetExtractor<List<FSM>> {

	@Autowired
	private ObjectMapper mapper;
	
	private int full_count=0;

	public int getFull_count() {
		return full_count;
	}

	public void setFull_count(int full_count) {
		this.full_count = full_count;
	}

	private static final String GET_STRING_TENANT_ID = "tenantid";
	private static final String GET_STRING_ADDITIONAL_DETAILS = "additionalDetails";

	@SuppressWarnings("rawtypes")
	@Override
	public List<FSM> extractData(ResultSet rs) throws SQLException, DataAccessException {

		Map<String, FSM> fmsMap = new LinkedHashMap<String, FSM>();
		this.setFull_count(0);
		while (rs.next()) {
			FSM currentfsm = new FSM();
			// TODO fill the FSM object with data in the result set record
			String id = rs.getString("fsm_id");
			String applicationNo = rs.getString("applicationno");
			currentfsm = fmsMap.get(id);
			String tenantId = rs.getString(GET_STRING_TENANT_ID);
			String accountId = rs.getString("accountId");
			String description = rs.getString("description");
			String additionalDetails = rs.getString(GET_STRING_ADDITIONAL_DETAILS);
			String source = rs.getString("source");
			String sanitationtype = rs.getString("sanitationtype");
			String propertyUsage = rs.getString("propertyUsage");
			int noOfTrips = rs.getInt("noOfTrips");
			String applicationStatus = rs.getString("applicationStatus");
			String status = rs.getString("status");
			String vehicleId = rs.getString("vehicle_id");
			String vehicleType = rs.getString("vehicletype");
			String dsoid = rs.getString("dso_id");
			Long possiblesrvdate = rs.getLong("possible_srv_date");
			this.setFull_count(rs.getInt("full_count"));
			Long compeletedOn = rs.getLong("completed_on");
			if (currentfsm == null) {
				Long lastModifiedTime = rs.getLong("lastmodifiedtime");

				if (rs.wasNull()) {
					lastModifiedTime = null;
				}
				currentfsm = FSM.builder().id(id).applicationNo(applicationNo).tenantId(tenantId)
						.description(description).accountId(accountId).additionalDetails(getAdditionalDetail(GET_STRING_ADDITIONAL_DETAILS,rs))
						.source(source).sanitationtype(sanitationtype).propertyUsage(propertyUsage).noOfTrips(noOfTrips)
						.vehicleId(vehicleId).applicationStatus(applicationStatus).dsoId(dsoid).possibleServiceDate(possiblesrvdate).vehicleType(vehicleType).completedOn(compeletedOn)
						.build();

				fmsMap.put(id, currentfsm);
			}
			addChildrenToProperty(rs, currentfsm);

		}

		return new ArrayList<>(fmsMap.values());

	}

	@SuppressWarnings("unused")
	private void addChildrenToProperty(ResultSet rs, FSM fsm) throws SQLException {

		// TODO add all the child data Vehicle, Pit, address
		String tenantId = fsm.getTenantId(); 
		
		AuditDetails auditdetails = AuditDetails.builder().createdBy(rs.getString("createdBy"))
				.createdTime(rs.getLong("createdTime")).lastModifiedBy(rs.getString("lastModifiedBy"))
				.lastModifiedTime(rs.getLong("lastModifiedTime")).build();

		Double latitude =  rs.getDouble("latitude");
		Double longitude =  rs.getDouble("longitude");

		Boundary locality = Boundary.builder().code(rs.getString("locality")).build();

		GeoLocation geoLocation = GeoLocation.builder().id(rs.getString("fsm_geo_id")).latitude(latitude).longitude(longitude)
				.build();

		Address address = Address.builder().buildingName(rs.getString("buildingName")).city(rs.getString("city"))
				.plotNo(rs.getString("plotno")).district(rs.getString("district")).region(rs.getString("region"))
				.state(rs.getString("state")).country(rs.getString("country")).landmark(rs.getString("landmark"))
				.geoLocation(geoLocation).pincode(rs.getString("pincode")).doorNo(rs.getString("doorno")).id(rs.getString("fsm_address_id"))
				.additionalDetails(rs.getString(GET_STRING_ADDITIONAL_DETAILS)).street(rs.getString("street")).slumName(rs.getString("slumname")).tenantId(rs.getString(GET_STRING_TENANT_ID)).locality(locality).auditDetails(auditdetails)
				.build();

		PitDetail pitDetail = PitDetail.builder().height(rs.getDouble("height")).width(rs.getDouble("width")).diameter(rs.getDouble("diameter"))
				.length(rs.getDouble("length")).distanceFromRoad(rs.getDouble("distanceFromRoad")).id(rs.getString("fsm_pit_id")).tenantId(rs.getString(GET_STRING_TENANT_ID)).build();
		
		
		
		fsm.setAddress(address);
		fsm.setPitDetail(pitDetail);
		fsm.setAuditDetails(auditdetails);
		
	}


    private JsonNode getAdditionalDetail(String columnName, ResultSet rs){

        JsonNode additionalDetail = null;
        try {
            PGobject pgObj = (PGobject) rs.getObject(columnName);
            if(pgObj!=null){
                 additionalDetail = mapper.readTree(pgObj.getValue());
            }
        }
        catch (IOException | SQLException e){
            e.printStackTrace();
            throw new CustomException("PARSING_ERROR","Failed to parse additionalDetail object");
        }
        return additionalDetail;
    }
}