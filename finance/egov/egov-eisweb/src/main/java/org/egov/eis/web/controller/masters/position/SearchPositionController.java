/*
 *    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) 2017  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *            Further, all user interfaces, including but not limited to citizen facing interfaces,
 *            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *            derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *            For any further queries on attribution, including queries on brand guidelines,
 *            please contact contact@egovernments.org
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 *
 */

package org.egov.eis.web.controller.masters.position;

import static org.egov.infra.utils.JsonUtils.toJSON;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.io.IOUtils;
import org.egov.eis.service.DeptDesigService;
import org.egov.eis.service.DesignationService;
import org.egov.eis.service.PositionMasterService;
import org.egov.infra.admin.master.entity.Department;
import org.egov.infra.admin.master.service.DepartmentService;
import org.egov.pims.commons.DeptDesig;
import org.egov.pims.commons.Designation;
import org.egov.pims.commons.Position;
import org.owasp.esapi.ESAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping(value = "/position")
public class SearchPositionController {

	private static final String POSITION_SEARCH = "position-search";
	private static final String DEPARTMENT_ID = "departmentId";
	private static final String DESIGNATION_ID = "designationId";
	private static final String WARNING = "warning";
	private static final String POSITION_NOT_PRESENT = "There is no position added for the selected department and designation.";
	private final DepartmentService departmentService;
	private final DesignationService designationService;
	private final DeptDesigService deptDesigService;
	private final PositionMasterService positionMasterService;

	@Autowired
	private SearchPositionController(final PositionMasterService positionMasterService,
			final DepartmentService departmentService, final DesignationService designationMasterService,
			final DeptDesigService deptDesigService) {
		this.departmentService = departmentService;
		designationService = designationMasterService;
		this.deptDesigService = deptDesigService;
		this.positionMasterService = positionMasterService;
	}

	@ModelAttribute
	public DeptDesig deptDesig() {
		return new DeptDesig();
	}

	@ModelAttribute("departments")
	public List<Department> departments() {
		return departmentService.getAllDepartments();
	}

	@ModelAttribute("designations")
	public List<Designation> designations() {
		return designationService.getAllDesignationsSortByNameAsc();
	}

	@GetMapping(value = "search")
	public String search(final Model model) {
		model.addAttribute("mode", "new");
		return POSITION_SEARCH;
	}

	@GetMapping(value = "position-getTotalPositionCount")
	public @ResponseBody String searchSanctionedAndOutSourcePositions(@RequestParam final String departmentId,
			@RequestParam final String designationId) {
		Long deptid = Long.valueOf(0);
		Long desigid = Long.valueOf(0);
		Integer outsourcedPost = 0;
		Integer sanctionedPost = 0;

		if (departmentId != null && !"".equals(departmentId))
			deptid = Long.valueOf(departmentId);
		if (designationId != null && !"".equals(designationId))
			desigid = Long.valueOf(designationId);

		outsourcedPost = positionMasterService.getTotalOutSourcedPosts(deptid, desigid);
		sanctionedPost = positionMasterService.getTotalSanctionedPosts(deptid, desigid);

		return outsourcedPost + "/" + sanctionedPost;
	}

	@GetMapping(value = "position-update")
	public @ResponseBody String changePosition(@RequestParam final String desigName,
			@RequestParam final String positionName, @RequestParam final String deptName,
			@RequestParam final String isoutsourced, @RequestParam final String positionId) {

		if (positionId != null) {
			final Position positionObj = positionMasterService.getPositionById(Long.valueOf(positionId));
			if (positionObj != null && !positionObj.getName().equalsIgnoreCase(positionName)) {
				final List<Position> positionList = positionMasterService.findByNameContainingIgnoreCase(positionName);
				if (positionList != null && positionList.size() > 0)
					return "POSITIONNAMEALREADYEXIST";
			}
			if(positionObj != null){
			positionObj.setName(positionName);
			}

			if (isoutsourced != null && isoutsourced.equalsIgnoreCase("TRUE")) {
				// Current position outsource is true.
				if (positionObj != null && !positionObj.isPostOutsourced()) {
					positionObj.setPostOutsourced(true);
					positionObj.getDeptDesig()
							.setOutsourcedPosts(positionObj.getDeptDesig().getOutsourcedPosts() != null
									? positionObj.getDeptDesig().getOutsourcedPosts() + 1
									: 1);
				}
			} else // If outsourced is false.
			if (positionObj!=null && positionObj.isPostOutsourced()) {
				positionObj.setPostOutsourced(false);
				positionObj.getDeptDesig()
						.setOutsourcedPosts(positionObj.getDeptDesig().getOutsourcedPosts() != null
								? positionObj.getDeptDesig().getOutsourcedPosts() - 1
								: 0);
			}

			positionMasterService.updatePosition(positionObj);
			return "SUCCESS";
		}
		if (positionName == null)
			return "POSITIONNAMEISNULL";
		return "SUCCESS";
	}

	@GetMapping(value = "resultList-update")
	public @ResponseBody void springPaginationDataTablesUpdate(final HttpServletRequest request,
			final HttpServletResponse response) throws IOException {
		Long departmentId = Long.valueOf(0);
		Long designationId = Long.valueOf(0);

		if (request.getParameter(DEPARTMENT_ID) != null && !"".equals(request.getParameter(DEPARTMENT_ID)))
			departmentId = Long.valueOf(request.getParameter(DEPARTMENT_ID));
		if (request.getParameter(DESIGNATION_ID) != null && !"".equals(request.getParameter(DESIGNATION_ID)))
			designationId = Long.valueOf(request.getParameter(DESIGNATION_ID));

		final String complaintRouterJSONData = commonSearchResult(departmentId, designationId);
		ESAPI.httpUtilities().addHeader(response, "Content-Type", MediaType.APPLICATION_JSON_VALUE);
		IOUtils.write(complaintRouterJSONData, response.getWriter());
	}

	public String commonSearchResult(final Long departmentId, final Long designationId) {

		final List<Position> positionList = positionMasterService.getPageOfPositions(departmentId, designationId);
		final StringBuilder positionJSONData = new StringBuilder("{\"data\":")
				.append(toJSON(positionList, Position.class, PositionAdaptor.class)).append("}");
		return positionJSONData.toString();
	}

	@PostMapping(value = "search")
	public String searchPosition(@Valid @ModelAttribute final DeptDesig deptDesig, final BindingResult errors,
			final RedirectAttributes redirectAttrs, final Model model) {
		if (errors.hasErrors())
			return POSITION_SEARCH;

		final DeptDesig departmentDesignation = deptDesigService
				.findByDepartmentAndDesignation(deptDesig.getDepartment().getId(), deptDesig.getDesignation().getId());

		if (departmentDesignation == null) {
			model.addAttribute(WARNING, POSITION_NOT_PRESENT);
			model.addAttribute("deptDesig", new DeptDesig());
			model.addAttribute("mode", "error");
			return POSITION_SEARCH;
		}

		final List<Position> positionList = positionMasterService
				.getAllPositionsByDeptDesigId(departmentDesignation.getId());
		model.addAttribute("deptDesig", departmentDesignation);
		model.addAttribute("positions", positionList);

		return POSITION_SEARCH;
	}
}
