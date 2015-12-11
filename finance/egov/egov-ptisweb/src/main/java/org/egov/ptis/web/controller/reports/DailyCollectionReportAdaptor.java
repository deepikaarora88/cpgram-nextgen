/**
 * eGov suite of products aim to improve the internal efficiency,transparency,
   accountability and the service delivery of the government  organizations.

    Copyright (C) <2015>  eGovernments Foundation

    The updated version of eGov suite of products as by eGovernments Foundation
    is available at http://www.egovernments.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/ or
    http://www.gnu.org/licenses/gpl.html .

    In addition to the terms of the GPL license to be adhered to in using this
    program, the following additional terms are to be complied with:

        1) All versions of this program, verbatim or modified must carry this
           Legal Notice.

        2) Any misrepresentation of the origin of the material is prohibited. It
           is required that all modified versions of this material be marked in
           reasonable ways as different from the original version.

        3) This license does not grant any rights to any user of the program
           with regards to rights under trademark law for use of the trade names
           or trademarks of eGovernments Foundation.

  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.ptis.web.controller.reports;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.egov.ptis.domain.entity.property.DailyCollectionReportResult;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class DailyCollectionReportAdaptor implements JsonSerializer<DailyCollectionReportResult> {

    @Override
    public JsonElement serialize(DailyCollectionReportResult dailyCollectionReportResult, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject jsonObject = new JsonObject();
        final SimpleDateFormat receiptDateFormatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        final SimpleDateFormat instDateFormatter = new SimpleDateFormat("dd/MM/yyyy");
        jsonObject.addProperty("receiptNo", dailyCollectionReportResult.getReceiptNumber());
        jsonObject.addProperty("receiptDate", receiptDateFormatter.format(dailyCollectionReportResult.getReceiptDate()));
        jsonObject.addProperty("assessmentNumber", dailyCollectionReportResult.getAssessmentNumber());
        jsonObject.addProperty("ownerName", dailyCollectionReportResult.getOwnerName());
        jsonObject.addProperty("doorNumber", dailyCollectionReportResult.getDoorNumber());
        jsonObject.addProperty("paidAt", dailyCollectionReportResult.getPaidAt());
        jsonObject.addProperty("paymentMode", dailyCollectionReportResult.getPaymentMode());
        jsonObject.addProperty("status", dailyCollectionReportResult.getStatus());
        jsonObject.addProperty("fromDate", null != dailyCollectionReportResult.getFromDate() ? instDateFormatter.format(dailyCollectionReportResult.getFromDate()) : "N/A");
        jsonObject.addProperty("toDate", null != dailyCollectionReportResult.getToDate() ? instDateFormatter.format(dailyCollectionReportResult.getToDate()) : "N/A");
        jsonObject.addProperty("arrearAmt", dailyCollectionReportResult.getArrearAmount());
        jsonObject.addProperty("currAmt", dailyCollectionReportResult.getCurrentAmount());
        jsonObject.addProperty("totalPenalty", dailyCollectionReportResult.getTotalPenalty());
        jsonObject.addProperty("arrearLibCess", dailyCollectionReportResult.getArrearLibCess());
        jsonObject.addProperty("currLibCess", dailyCollectionReportResult.getCurrentLibCess()); 
        jsonObject.addProperty("totalLibCess", dailyCollectionReportResult.getTotalLibCess());
        jsonObject.addProperty("totalCollection", dailyCollectionReportResult.getTotalCollection());
        return jsonObject;
    }

}
