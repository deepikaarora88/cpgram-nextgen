import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import Timeline from "../../../../../../src/components/Timeline" AB;
import { FormStep } from "@egovernments/digit-ui-react-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Collapse from "react-bootstrap/Collapse";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { getDocShareholding } from "../ScrutinyDevelopment/docview.helper";

import ModalChild from "../Remarks/ModalChild";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useStyles } from "../css/personalInfoChild.style";

const DeveloperCapacity = ({ t, config, onSelect, showTable, formData, formDataValue, data, capacityScrutinyInfo, iconColorState ,developerType,getRemarkData}) => {
  const { pathname: url } = useLocation();
  const userInfo = Digit.UserService.getUser();
  let validation = {};
  let isOpenLinkFlow = window.location.href.includes("openlink");

  const [isDevType, setIsDevType] = useState(false);
  const [isDevTypeComp, setIsDevTypeComp] = useState(false);
  const [modal, setmodal] = useState(false);
  const [modalColony, setmodalColony] = useState(false);
  const [capacityDevelopColonyHdruAct, setModalCapacityDevelopColonyHdruAct] = useState(
    formDataValue?.DeveloperCapacity?.capacityDevelopColonyHdruAct || []
  );
  // const [modalColonyDevGrpValuesArray, setModalColonyDevGrpValuesArray] = useState([]);
  const [capacityDevelopColonyLawAct, setCapacityDevelopColonyLawAct] = useState(formDataValue?.DeveloperCapacity?.capacityDevelopColonyLawAct || []);
  const [capacityDevelopAColony, setcapacityDevelopAColony] = useState([]);

  const [licenceNumber, setModalLcNo] = useState(formDataValue?.DeveloperCapacity?.licenceNumber || "");
  const [nameOfDeveloper, setModalDevName] = useState(formDataValue?.DeveloperCapacity?.nameOfDeveloper || "");
  const [purposeOfColony, setModalPurposeCol] = useState(formDataValue?.DeveloperCapacity?.purposeOfColony || "");
  const [sectorAndDevelopmentPlan, setModalDevPlan] = useState(formDataValue?.DeveloperCapacity?.sectorAndDevelopmentPlan || "");
  const [validatingLicence, setModalDevValidity] = useState(formDataValue?.DeveloperCapacity?.validatingLicence || "");

  const [coloniesDeveloped, setColonyDev] = useState(formDataValue?.DeveloperCapacity?.coloniesDeveloped || "");
  const [area, setColonyArea] = useState(formDataValue?.DeveloperCapacity?.area || "");
  const [purpose, setColonyPurpose] = useState(formDataValue?.DeveloperCapacity?.purpose || "");
  const [statusOfDevelopment, setColonyStatusDev] = useState(formDataValue?.DeveloperCapacity?.statusOfDevelopment || "");
  const [outstandingDues, setColonyoutstandingDue] = useState(formDataValue?.DeveloperCapacity?.outstandingDues || "");

  const [engineerName, setEngineerName] = useState(formDataValue?.DeveloperCapacity?.engineerName || "");
  const [engineerQualification, setEngineerQualification] = useState(formDataValue?.DeveloperCapacity?.engineerQualification || "");
  const [engineerSign, setEngineerSign] = useState(formDataValue?.DeveloperCapacity?.engineerSign || "");
  const [engineerDegree, setEngineerDegree] = useState(formDataValue?.DeveloperCapacity?.engineerDegree || "");
  const [architectName, setArchitectName] = useState(formDataValue?.DeveloperCapacity?.architectName || "");
  const [architectQualification, setArchitectQualification] = useState(formDataValue?.DeveloperCapacity?.architectQualification || "");
  const [architectSign, setArchitectSign] = useState(formDataValue?.DeveloperCapacity?.architectSign || "");
  const [architectDegree, setArchitectDegree] = useState(formDataValue?.DeveloperCapacity?.architectDegree || "");
  const [townPlannerName, setTownPlannerName] = useState(formDataValue?.DeveloperCapacity?.townPlannerName || "");
  const [townPlannerQualification, setTownPlannerQualification] = useState(formDataValue?.DeveloperCapacity?.townPlannerQualification || "");
  const [townPlannerSign, setTownPlannerSign] = useState(formDataValue?.DeveloperCapacity?.townPlannerSign || "");
  const [townPlannerDegree, setTownPlannerDegree] = useState(formDataValue?.DeveloperCapacity?.townPlannerDegree || "");
  const [existingDeveloperAgreement, setExistingDev] = useState(formDataValue?.DeveloperCapacity?.existingDeveloperAgreement || "");
  const [existingDeveloperAgreementDoc, setExistingDevDoc] = useState(formDataValue?.DeveloperCapacity?.existingDeveloperAgreementDoc || "");
  const [technicalCapacity, setTechnicalCapacity] = useState(formDataValue?.DeveloperCapacity?.technicalCapacity || "");
  const [technicalCapacityDoc, setTechnicalCapacityDoc] = useState(formDataValue?.DeveloperCapacity?.technicalCapacityDoc || "");
  const [engineerNameN, setengineerNameN] = useState(formDataValue?.DeveloperCapacity?.engineerNameN || "");
  const [engineerDocN, setEngineerDocN] = useState(formDataValue?.DeveloperCapacity?.engineerDocN || "");
  const [architectNameN, setArchitectNameN] = useState(formDataValue?.DeveloperCapacity?.architectNameN || "");
  const [architectDocN, setArchitectDocN] = useState(formDataValue?.DeveloperCapacity?.architectDocN || "");
  const [uplaodSpaBoard, setUplaodSpaBoard] = useState(formDataValue?.DeveloperCapacity?.uplaodSpaBoard || "");
  const [uplaodSpaBoardDoc, setUplaodSpaBoardDoc] = useState(formDataValue?.DeveloperCapacity?.uplaodSpaBoardDoc || "");
  const [agreementDoc, setAgreementDoc] = useState(formDataValue?.DeveloperCapacity?.agreementDoc || "");
  const [boardDoc, setBoardDoc] = useState(formDataValue?.DeveloperCapacity?.boardDoc || "");
  const [registeredDoc, setRegisteredDoc] = useState(formDataValue?.DeveloperCapacity?.registeredDoc || "");
  const [boardDocY, setBoardDocY] = useState(formDataValue?.DeveloperCapacity?.boardDocY || "");
  const [earlierDocY, setEarlierDocY] = useState(formDataValue?.DeveloperCapacity?.earlierDocY || "");
  const [boardDocN, setBoardDocN] = useState(formDataValue?.DeveloperCapacity?.boardDocN || "");
  const [earlierDocN, setEarlierDocN] = useState(formDataValue?.DeveloperCapacity?.earlierDocN || "");
  const [technicalAssistanceAgreementDoc, setTechnicalAssistanceAgreementDoc] = useState(
    formDataValue?.DeveloperCapacity?.technicalAssistanceAgreementDoc || ""
  );

  // console.log("AUTHNAME", authUserName);

  // const dispatch = useDispatch();

  const [uncheckedValue, setUncheckedVlue] = useState([]);
  const [checkValue, setCheckedVAlue] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [messege, setMessege] = useState("");
  const [developerLabel, setDeveloperLabel] = useState(true);
  const [show, setshow] = useState(false);
  const [show3, setshow3] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [noChecked, setNochecked] = useState(true);
  const [warningOrred, setwarningOrred] = useState("#ffcf33");
  const [color, setColor] = useState({ yes: false, no: false });

  const [modaldData, setmodaldData] = useState({ label: "", Remarks: "" });
  const [isyesOrNochecked, setYesorNochecked] = useState(true);
  // const [fieldValue1, setFieldValue1] = useState("");




  const handleYesOrNochecked = (data) => {
    setYesorNochecked(data.data);
  };
  const handlemodalsubmit = () => {
    console.log("here");
    const filteredObj = uncheckedValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    const filteredObjCheked = checkValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    if (filteredObj.length !== 0) {
      const removedList = uncheckedValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setUncheckedVlue(removedList);
    }
    if (filteredObjCheked.length !== 0) {
      const removedList = checkValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setCheckedVAlue(removedList);
    }

    if (isyesOrNochecked === false) {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObj.length === 0) {
          setUncheckedVlue((prev) => [...prev, modaldData]);
        }
      }
    } else {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObjCheked.length === 0) {
          setCheckedVAlue((prev) => [...prev, modaldData]);
        }
      }
    }
  };
  useEffect(() => {
    console.log("called");
    handlemodalsubmit();
  }, [modaldData.Remarks]);
  //   useEffect(() => {
  //     props.passUncheckedList({ data: uncheckedValue });
  //   }, [uncheckedValue]);

  //   useEffect(() => {
  //     props.passCheckedList({ data: checkValue });
  //   }, [checkValue]);
  console.log("unchecked values", uncheckedValue);

  console.log(uncheckedValue.indexOf("developer"));

  const developerInputFiledColor = uncheckedValue.filter((obj) => {
    return obj.label === "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975";
  });
  const developerInputCheckedFiledColor = checkValue.filter((obj) => {
    return obj.label === "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975";
  });
  const developerInputFiledColor1 = uncheckedValue.filter((obj) => {
    return obj.label === "Whether any technical expert(s) engaged";
  });
  const developerInputCheckedFiledColor1 = checkValue.filter((obj) => {
    return obj.label === "Whether any technical expert(s) engaged";
  });
  const developerInputFiledColor2 = uncheckedValue.filter((obj) => {
    return obj.label === "technical capacity sought";
  });
  const developerInputCheckedFiledColor2 = checkValue.filter((obj) => {
    return obj.label === "technical capacity sought";
  });
  const developerInputFiledColor3 = uncheckedValue.filter((obj) => {
    return obj.label === "Licences/permissions granted to Developer/ group company for development of colony under any other law/Act as";
  });
  const developerInputCheckedFiledColor3 = checkValue.filter((obj) => {
    return obj.label === "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975";
  });
  const developerInputFiledColor4 = uncheckedValue.filter((obj) => {
    return obj.label === "the proposed developer company/firm";
  });
  const developerInputCheckedFiledColor4 = checkValue.filter((obj) => {
    return obj.label === "the proposed developer company/firm";
  });

  ////////////////////////////////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm([{ XLongitude: "", YLatitude: "" }]);
  const formSubmit = (data) => {
    console.log("data", data);
  };
  const [AppliedDetailFormSubmitted, SetAppliedDetailFormSubmitted] = useState(false);

  const [open, setOpen] = useState(false);
  const [showhide, setShowhide] = useState("No");
  const [showhide1, setShowhide1] = useState("no");
  const [showhide0, setShowhide0] = useState("No");
  const [showhide6, setShowhide6] = useState("No");

  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide(getshow);
  };
  const handleshow0 = (e) => {
    const getshow = e.target.value;
    setShowhide0(getshow);
  };
  const handleshow1 = (e) => {
    const getshow = e.target.value;
    setShowhide1(getshow);
  };

  const handleshow6 = (e) => {
    const getshow = e.target.value;
    setShowhide6(getshow);
  };

  const handleChange = (e) => {
    this.setState({ isRadioSelected: true });
  };

  const devTypeFlagVal = localStorage.getItem("devTypeValueFlag");

  const handleArrayValues = () => {
    if (licenceNumber !== "" && nameOfDeveloper !== "" && purposeOfColony !== "") {
      const values = {
        licenceNumber: licenceNumber,
        nameOfDeveloper: nameOfDeveloper,
        purposeOfColony: purposeOfColony,
        sectorAndDevelopmentPlan: sectorAndDevelopmentPlan,
        validatingLicence: validatingLicence,
      };
      setModalCapacityDevelopColonyHdruAct((prev) => [...prev, values]);
      setmodal(!modal);
    }
    console.log("DevCapacityFirst", capacityDevelopColonyHdruAct);
    localStorage.setItem("DevCapacityDetails", JSON.stringify(capacityDevelopColonyHdruAct));
  };

  const handleColonyDevGrp = () => {
    const colonyDevValues = {
      coloniesDeveloped: coloniesDeveloped,
      area: area,
      purpose: purpose,
      statusOfDevelopment: statusOfDevelopment,
      outstandingDues: outstandingDues,
    };
    setCapacityDevelopColonyLawAct((prev) => [...prev, colonyDevValues]);
    setmodalColony(!modalColony);
    console.log("DevCapacityColony", capacityDevelopColonyLawAct);
  };

  const submitTechdevData = async (e) => {
    //   e.preventDefault();
    const formDataValues = {
      capacityDevelopAColony: {
        capacityDevelopColonyHdruAct: capacityDevelopColonyHdruAct,
        capacityDevelopColonyLawAct: capacityDevelopColonyLawAct,
        technicalExpertEngaged: {
          engineerName: engineerName,
          engineerQualification: engineerQualification,
          engineerSign: engineerSign,
          engineerDegree: engineerDegree,
          architectName: architectName,
          architectQualification: architectQualification,
          architectSign: architectSign,
          architectDegree: architectDegree,
          townPlannerName: townPlannerName,
          townPlannerQualification: townPlannerQualification,
          townPlannerSign: townPlannerSign,
          townPlannerDegree: townPlannerDegree,
          existingDeveloperAgreement: existingDeveloperAgreement,
          existingDeveloperAgreementDoc: existingDeveloperAgreementDoc,
          technicalCapacity: technicalCapacity,
          technicalCapacityDoc: technicalCapacityDoc,
          engineerNameN: engineerNameN,
          engineerDocN: engineerDocN,
          architectNameN: architectNameN,
          architectDocN: architectDocN,
          uplaodSpaBoard: uplaodSpaBoard,
          uplaodSpaBoardDoc: uplaodSpaBoardDoc,
        },
        designationDirector: {
          agreementDoc: agreementDoc,
          boardDoc: boardDoc,
        },
        obtainedLicense: {
          registeredDoc: registeredDoc,
          boardDocY: boardDocY,
          earlierDocY: earlierDocY,
          boardDocN: boardDocN,
          earlierDocN: earlierDocN,
          technicalAssistanceAgreementDoc: technicalAssistanceAgreementDoc,
        },
      },
    };
    onSelect(config.key, formDataValues);

    console.log("FINAL SUBMIT", formDataValues);
    localStorage.setItem("capacity", JSON.stringify(formDataValues));
    setcapacityDevelopAColony((prev) => [...prev, formDataValues]);
  };
  const jsonobj = localStorage.getItem("capacity");
  console.log(JSON.parse(jsonobj));

  const [noofRows, setNoOfRows] = useState(1);
  const [noofRow, setNoOfRow] = useState(1);
  const [noofRow1, setNoOfRow1] = useState(1);
  const onSkip = () => onSelect();





  const classes = useStyles();

  const [smShow, setSmShow] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const Colors = {
    approved: "#09cb3d",
    disapproved: "#ff0000",
    info: "#FFB602"
  }
  const [selectedFieldData, setSelectedFieldData] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [openedModal, setOpennedModal] = useState("")
  const [fieldIconColors, setFieldIconColors] = useState({
    caution1: Colors.info,
    caution2: Colors.info,
    caution3: Colors.info,
    caution4: Colors.info,
    caution5: Colors.info,
  })

  const fieldIdList = [{ label: "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975", key: "caution1" },{ label: "Licences/permissions granted to Developer/ group company for development of colony under any other law/Act as", key: "caution2" },{ label: "Whether any technical expert(s) engaged", key: "caution3" },{ label: "If director/partner of the proposed developer company/firm also holds designation of director/partner in any other company/firm who has already obtained license(s) under act of 1975", key: "caution4" },{ label: "In case of technical capacity sought from another company/firm who has already obtained license(s) under act of 1975 or outside Haryana", key: "caution5" },]


  const getColorofFieldIcon = () => {
    let tempFieldColorState = fieldIconColors;
    fieldIdList.forEach((item) => { 
      if (iconColorState !== null && iconColorState !== undefined) {
        console.log("color method called");
        const fieldPresent = iconColorState.egScrutiny.filter(ele => (ele.fieldIdL === item.label));
        console.log("filteration value", fieldPresent, fieldPresent[0]?.isApproved);
        if (fieldPresent && fieldPresent.length) {
          console.log("filteration value1", fieldPresent, fieldPresent[0]?.isApproved);
          tempFieldColorState = { ...tempFieldColorState, [item.key]: fieldPresent[0].isApproved ? Colors.approved : Colors.disapproved }

        }
      }
    })

    setFieldIconColors(tempFieldColorState);

  };


  useEffect(() => {
    getColorofFieldIcon();
    console.log("repeating1...",)
  }, [iconColorState])

  useEffect(() => {
    if (labelValue) {
      const fieldPresent = iconColorState.egScrutiny.filter(ele => (ele.fieldIdL === labelValue));
      setSelectedFieldData(fieldPresent[0]);
    } else {
      setSelectedFieldData(null);
    }
  }, [labelValue])



  const currentRemarks = (data) => {
    // props.
    showTable({ data: data.data });
    // props.
    getRemarkData()

  };

  const handlemodaldData = (data) => {
    // setmodaldData(data.data);
    setSmShow(false);
    console.log("here", openedModal, data);
    if (openedModal && data) {
      setFieldIconColors({ ...fieldIconColors, [openedModal]: data.data.isApproved ? Colors.approved : Colors.disapproved })
    }
    setOpennedModal("");
    setLabelValue("");
  };






  return (
    <div>
      <ModalChild
        labelmodal={labelValue}
        passmodalData={handlemodaldData}
        displaymodal={smShow}
        onClose={() => setSmShow(false)}
        selectedFieldData={selectedFieldData}
        fieldValue={fieldValue}
        remarksUpdate={currentRemarks}
        // getRemarkData={props.getRemarkData}
      ></ModalChild>

      <div
        className="collapse-header"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{
          background: "#f1f1f1",
          padding: "0.25rem 1.25rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          display: "flex",
          cursor: "pointer",
          color: "#817f7f",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <span style={{ color: "#817f7f", fontSize: 14 }} className="">
          - Developer Capacity
        </span>
        {open ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <FormStep config={config} onSelect={submitTechdevData} onSkip={onSkip} t={t}>
            {developerType === "Individual" && (
              <div className="card-body">
                <div className="form-group row mb-12">
                  <label className="col-sm-3 col-form-label">Individual</label>
                  <div className="col-sm-12">
                    {/* <textarea type="text" className="employee-card-input" id="details" placeholder="Enter Details" /> */}
                    <table className="table table-bordered" size="sm">
                      <thead>
                        <tr>
                          <th class="fw-normal">S.No.</th>
                          <th class="fw-normal">Particulars of document</th>
                          <th class="fw-normal">Details </th>
                          <th class="fw-normal">Annexure </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td>Net Worth in case of individual certified by CA/ Or Income tax return in case of an individual (for the last three years)</td>
                          <td>
                            {/* <input type="file" name="upload" placeholder="" class="employee-card-input" /> */}
                            <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                          </td>
                          <td align="center" size="large">
                          <div>
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                          </td>
                        </tr>
                        <tr>
                          <td> 2 </td>
                          <td>Bank statement for the last 3 years</td>
                          <td>
                            {/* <input type="file" name="upload" placeholder="" class="employee-card-input" /> */}
                            <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                          </td>
                          <td align="center" size="large">
                          <div>
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
{/* {developerType} */}



            {developerType === "Company" && (
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-sm-12">
                    <table className="table table-bordered" size="sm">
                      <thead>
                        <tr>
                          <th class="fw-normal">S.No.</th>
                          <th class="fw-normal">Particulars of document</th>
                          <th class="fw-normal">Details </th>
                          <th class="fw-normal">Annexure </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td>Balance sheet of last 3 years </td>
                          <td>
                            {/* <input type="file" name="upload" placeholder="" class="employee-card-input" /> */}
                            <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                          </td>
                          <td align="center" size="large">
                          <div>
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                          </td>
                        </tr>
                        <tr>
                          <td> 2 </td>
                          <td>Ps-3(Representing Paid-UP capital)</td>
                          <td>
                            {/* <input type="file" name="upload" placeholder="" class="employee-card-input" /> */}
                            <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                         </td>
                          <td align="center" size="large">
                          <div>
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                          </td>
                        </tr>
                        <tr>
                          <td> 3 </td>
                          <td>Reserves and surpluses</td>
                          <td>
                            {/* <input type="file" name="upload" placeholder="" class="employee-card-input" /> */}
                            <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                          </td>
                          <td align="center" size="large">
                          <div>
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                          </td>
                        </tr>
                        <tr>
                          <td> 4 </td>
                          <td>Any other documents (in the case of the company)</td>
                          <td>
                            {/* <input type="file" name="upload" placeholder="" class="employee-card-input" /> */}
                            <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                         </td>
                          <td align="center" size="large">
                          <div>
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* {developerType === "LLP" && (
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">LLP</label>
                  <div className="col-sm-12">
                    <input type="text" className="employee-card-input" id="llp" placeholder="Enter Email" />
                    <table className="table table-bordered" size="sm">
                      <thead>
                        <tr>
                          <th class="fw-normal">S.No.</th>
                          <th class="fw-normal">Particulars of document</th>
                          <th class="fw-normal">Details </th>
                          <th class="fw-normal">Annexure </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td>Net Worth in case of individual certified by CA/ Or Income tax return in case of an individual (for the last three years) </td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large">
                            
                            
                          </td>
                        </tr>
                        <tr>
                          <td> 2 </td>
                          <td>Bank statement for the last 3 years</td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large">
                           
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )} */}

            <div className="card-body">
              <p>1. We hereby submit the following information/ enclose the relevant documents:-</p>
              <p className="ml-3">
                (i) Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975: *{" "}
              </p>
              <div className="d-flex flex-row align-items-center ml-4">
                <input type="radio" value="Yes" checked={capacityScrutinyInfo?.permissionGrantedHRDU === "Y"?true:false}  disabled />
                <label className="m-0  mx-1" for="Yes">Yes</label>
                <input type="radio" value="No"  checked={capacityScrutinyInfo?.permissionGrantedHRDU === "N"?true:false} disabled />
                <label className="m-0 mx-2" for="No">No</label>
                <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>

              </div>
              <div>
              {/* {developerType === "Company" && ( */}

                {capacityScrutinyInfo?.permissionGrantedHRDU === "Y" && (
                <div className="card-body">
                  {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                  <div className="table-bd">
                    <Table className="table table-bordered">
                      <thead>
                        <tr>
                          {/* <th class="fw-normal">S. no</th>
                          <th class="fw-normal"> Licence No / year and date of grant of licence </th>
                          <th class="fw-normal">Name of developer *</th>
                          <th class="fw-normal">Purpose of colony </th>
                          <th class="fw-normal">Sector and development plan </th>
                          <th class="fw-normal">Validity of licence including renewals if any</th> */}
                          <th class="fw-normal">S. no</th>
                                                    <th class="fw-normal"> Licence No. </th>
                                                    <th class="fw-normal">Date of grant of license</th>
                                                    <th class="fw-normal">Purpose of colony</th>
                                                    <th class="fw-normal">Validity of Licence</th>
                                                    <th class="fw-normal">Technical Expert Engaged</th>
                                                    <th class="fw-normal">Degrees of Engineer</th>
                                                    <th class="fw-normal">Degrees of Architect</th>
                                                    <th class="fw-normal">Degrees of Town Planner</th>
                                                    <th class="fw-normal">Actions</th>
                          {/* <th>Remove</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {capacityDevelopColonyHdruAct.length > 0
                          ? capacityDevelopColonyHdruAct.map((elementInArray, input) => {
                              return ( */}

                        {
                          capacityScrutinyInfo?.capacityDevelopColonyHdruAct?.map((item,index)=>(

                            <tr>
                            <td>{index+1}</td>
                            <td>
                              <input
                                type="text"
                                // value={item?.licenceNumber}
                                placeholder={item?.licenceNumber}
                                class="employee-card-input"
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                // value={item?.nameOfDeveloper}
                                placeholder={item?.nameOfDeveloper}
                                class="employee-card-input"
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                // value={item?.purposeOfColony}
                                placeholder={item?.purposeOfColony}
                                class="employee-card-input"
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                // Validity of Licence
                                placeholder={item?.purposeOfColony}
                                class="employee-card-input"
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                // Technical Expert Engaged
                                placeholder={item?.purposeOfColony}
                                class="employee-card-input"
                                disabled
                              />
                            </td>
                            <td>
                              <div className="row">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                                 <div className="btn btn-sm col-md-6">
                                 <IconButton onClick={()=>getDocShareholding(item?.sectorAndDevelopmentPlan)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                 </div>
                                 <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                 <IconButton onClick={()=>getDocShareholding(item?.sectorAndDevelopmentPlan)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                              </div>
                            </td>
                            <td>
                              <div className="row">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                               
                                 <div className="btn btn-sm col-md-6">
                                <IconButton onClick={()=>getDocShareholding(item?.validatingLicence)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                 <IconButton onClick={()=>getDocShareholding(item?.validatingLicence)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 
                              </div>
                            </td>
                            <td>
                              <div className="row">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                               
                                 <div className="btn btn-sm col-md-6">
                                <IconButton onClick={()=>getDocShareholding(item?.validatingLicence)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                 <IconButton onClick={()=>getDocShareholding(item?.validatingLicence)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 
                              </div>
                            </td>
                            <td>
                            <div className="btn btn-sm col-md-6">
                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                </div>
                            

                            </td>
                          </tr>

                          ))
                        }

                       
                      </tbody>
                    </Table>
                    <div>
                      {/* <div>
                        <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
                          <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>

                          <ModalBody>
                            <div className="card2">
                              <div className="popupcard">
                                <form className="text1">
                                  <Row>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Licence No / year of licence
                                      </label>
                                      <input type="text" onChange={(e) => setModalLcNo(e.target.value)} placeholder="" class="employee-card-input" />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Name of developer *
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(e) => setModalDevName(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Purpose of colony
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(e) => setModalPurposeCol(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Sector and development plan
                                      </label>
                                      <input
                                        type="file"
                                        onChange={(e) => setModalDevPlan(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Validity of licence{" "}
                                      </label>
                                      <input
                                        type="file"
                                        onChange={(e) => setModalDevValidity(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                  </Row>
                                </form>
                              </div>
                              <div className="submit-btn">
                                <div className="form-group col-md6 mt-6">
                                  <button type="button" onClick={handleArrayValues} style={{ float: "right" }} className="btn btn-success">
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </ModalBody>
                          <ModalFooter toggle={() => setmodal(!modal)}></ModalFooter>
                        </Modal>
                      </div> */}
                    </div>

                    {/* <br></br> */}
                    {/* <br></br> */}
                  </div>
                </div>
                )} 
              </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
<br></br>
{capacityScrutinyInfo?.permissionGrantedHRDU === "N" && (
<div>
<div className="hl"></div>
              <p className="ml-3">
              (ii) If director/partner of the proposed developer company/firm also holds designation of director/partner in any other company/firm who has already obtained license(s) under act of 1975:
                
              </p>
              <div className="ml-3" >
                  <input
                    type="radio"
                    value="Yes"
                    
                    className="mx-2 mt-1"
                    checked={capacityScrutinyInfo?.designatedDirectors === "Y" ?true:false}
                    // onChange={(e) => handleChange(e.target.value)}
                    // 
                    // onClick={handleshow}
                    disabled
                  />
                  <label className="m-0  mx-1" for="Yes">Yes</label>

                  <input
                    type="radio"
                    value="No"
                    
                    className="mx-2 mt-1"
                    checked={capacityScrutinyInfo?.designatedDirectors === "N" ?true:false}
                    // onChange={(e) => handleChange(e.target.value)}
                    // 
                    // onClick={handleshow}
                    disabled
                  />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      color:fieldIconColors.caution4
                    }}
                    onClick={() => {
                      setOpennedModal("caution4")
                      setLabelValue("If director/partner of the proposed developer company/firm also holds designation of director/partner in any other company/firm who has already obtained license(s) under act of 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution4: null);
                    }}
                  ></ReportProblemIcon>
                </div>
               
                
                <br></br>

              

                {capacityScrutinyInfo?.designatedDirectors === "Y" && (
               <div className="row "> 
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <Col xs="12" md="12" sm="12">
                        <Table className="table table-bordered" size="sm">
                          <thead>
                            <tr>
                              <th class="fw-normal">S.No.</th>
                              <th class="fw-normal">Professional </th>
                              <th class="fw-normal"> Annexure</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 &nbsp;&nbsp;</td>
                              <td> Agreement between the entities to provide technical assistance</td>
                              <td align="center" size="large">
                                <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.agreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 2&nbsp;&nbsp; </td>
                              <td>Board resolutions of authorized signatory of firm/company provided technical assistance</td>
                              <td align="center" size="large">
                                <div className="row">
                               
                                 <div className="btn btn-sm col-md-6">
                                <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button> */}
                                  {/* <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </div>
                  </div>
            </div>
                )} 
      
              </div>
                 )}

{/* /////////////////////////////////////////////////////////////////////////////////////// */}
{/* <br></br> */}
<br></br>
<div className="hl"></div>
                        <p >
                            (iii) In case of technical capacity of company/firm developed projects outside Haryana:-
                        </p>

                        <div >
                        {/* <div className="d-flex flex-row align-items-center ml-4">
                <input type="radio" value="Yes" checked={capacityScrutinyInfo?.permissionGrantedHRDU === "Y"?true:false}  disabled />
                <label className="m-0  mx-1" for="Yes">Yes</label>
                <input type="radio" value="No"  checked={capacityScrutinyInfo?.permissionGrantedHRDU === "N"?true:false} disabled />
                <label className="m-0 mx-2" for="No">No</label>
                <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>

              </div> */}
              <div >
                            <input
                                type="radio"
                                value="Y"
                                checked={capacityScrutinyInfo?.technicalCapacityOutsideHaryana === "Y" ? true : false}
                                id="technicalCapacityOutsideHaryana"
                                className="mx-2 mt-1"
                                // onChange={(e) => setTechnicalCapacityOutsideHaryana(e.target.value)}
                                name="technicalCapacityOutsideHaryana"
                                disabled
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                checked={capacityScrutinyInfo?.technicalCapacityOutsideHaryana=== "N" ? true : false}
                                id="technicalCapacityOutsideHaryanaN"
                                className="mx-2 mt-1"
                                // onChange={(e) => setTechnicalCapacityOutsideHaryana(e.target.value)}
                                name="technicalCapacityOutsideHaryana"
                                disabled
                            />
                            <label for="No">No</label>

                            <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
                            </div>
                            {capacityScrutinyInfo?.technicalCapacityOutsideHaryana === "Y" && (
                                <Row>
                                    <Col md={4} xxl lg="4">
                                        <label htmlFor="project" className="text"> Project </label>
                                        {/* <input
                                            type="text"
                                            name="project"
                                            value={technicalCapacityOutsideHaryanaDetails.project}
                                            onChange={(e) => setTechnicalCapacityOutsideHaryanaDetails({ ...technicalCapacityOutsideHaryanaDetails, project: e.target.value })}
                                            placeholder=""
                                            class="employee-card-input"
                                        /> */}
                                         <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>

                                    </Col>

                                    <Col md={4} xxl lg="4">
                                        <label htmlFor="authority" className="text"> Authority </label>
                                        {/* <input
                                            type="text"
                                            name="authority"
                                            value={technicalCapacityOutsideHaryanaDetails.authority}
                                            onChange={(e) => setTechnicalCapacityOutsideHaryanaDetails({ ...technicalCapacityOutsideHaryanaDetails, authority: e.target.value })}
                                            placeholder=""
                                            class="employee-card-input"
                                        /> */}
                                           <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>

                                    </Col>

                                    <Col md={4} xxl lg="4">
                                        <label htmlFor="statusOfDevelopment" className="text"> (iii) Status of Development </label>
                                        {/* <input
                                            type="text"
                                            name="statusOfDevelopment"
                                            value={technicalCapacityOutsideHaryanaDetails.statusOfDevelopment}
                                            onChange={(e) => setTechnicalCapacityOutsideHaryanaDetails({ ...technicalCapacityOutsideHaryanaDetails, statusOfDevelopment: e.target.value })}
                                            placeholder=""
                                            class="employee-card-input"
                                        /> */}
                                           <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>

                                    </Col>
                                </Row>
                           )} 
                        </div>


{/* /////////////////////////////////////////////////////////////////////////////////// */}
{/* <br></br> */}
<br></br>
<div className="hl"></div>
                        <p>
                            (iv). In case of technical capacity sought from another
                            company/firm who has already obtained license(s) under act of
                            1975 or outside Haryana:
                        </p>
                        <div >
                          <div >
                            <input
                                type="radio"
                                value="Y"
                                id="alreadtObtainedLic"
                                className="mx-2 mt-1"
                                checked={capacityScrutinyInfo?.alreadtObtainedLic === "Y" ? true : false}
                                // onChange={changeAlreadyObtainedLic}
                                name="alreadtObtainedLic"
                                disabled
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                id="alreadtObtainedLicN"
                                className="mx-2 mt-1"
                                // onChange={changeAlreadyObtainedLic}
                                checked={capacityScrutinyInfo?.alreadtObtainedLic === "N" ? true : false}
                                name="alreadtObtainedLic"
                                onClick={handleshow6}
                                disabled
                            />
                            <label for="No">No</label>
                            </div>
                            <br></br>
                            {capacityScrutinyInfo?.alreadtObtainedLic === "Y" && (
                              <div>
                                <div>
                                <div className="row">
                    <div className="col-sm-12">
                      <div className="table-bd">
                        
                                    {/* <div className="row ">
                                        <div className="form-group row">
                                            <div className="col-sm-12"> */}
                                                {/* <Col xs="12" md="12" sm="12"> */}
                                                    <div>
                                                        <Table className="table table-bordered" >
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No.</th>
                                                                    <th>Agreement*</th>
                                                                    <th>Upload Document </th>
                                                                    <th>Annexure </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td> 1 </td>

                                                                    <td>
                                                                        Agreement between the proposed developer and existing colonizer
                                                                    </td>
                                                                    <td align="center" size="large">
                                                                        {/* <input
                                                                            type="file"
                                                                            name="agreementDocY"
                                                                            onChange={((e)=> setEarlierDocY(e.target.value))}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "agreementDocY")}
                                                                            class="employee-card-input"
                                                                        /> */}
                                                                        <div className="row">
                               
                               <div className="btn btn-sm col-md-6">
                              <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <VisibilityIcon color="info" className="icon" /></IconButton>
                                    </div>
                               <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <FileDownloadIcon color="info" className="icon" /></IconButton>
                                    </div>
                              </div>

                                                                    </td>
                                                                    <td>
                                                                        {/* {DevelopersAllData?.agreementDocY !== "" ?
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => getDocShareholding(DevelopersAllData?.agreementDocY)}
                                                                            >
                                                                                <VisibilityIcon />
                                                                            </button> : <p></p>
                                                                        } */}
                                                          <div className={classes.fieldContainer}>
                              {/* <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                               placeholder={item?.din} 
                               disabled></Form.Control> */}
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>

                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td> 2 </td>

                                                                    <td>
                                                                        Board resolution of authorised signatory of the existing colonizer
                                                                    </td>
                                                                    <td align="center" size="large">
                                                                        {/* <input
                                                                            type="file"
                                                                            name="boardDocX"
                                                                            onChange={((e)=> setEarlierDocY(e.target.value))}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocX")}
                                                                            class="employee-card-input"
                                                                        /> */}
                                                                        <div className="row">
                               
                               <div className="btn btn-sm col-md-6">
                              <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <VisibilityIcon color="info" className="icon" /></IconButton>
                                    </div>
                               <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <FileDownloadIcon color="info" className="icon" /></IconButton>
                                    </div>
                              </div>
                                                                    </td>
                                                                    <td>
                                                                        {/* {DevelopersAllData?.boardDocX !== "" ?
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => getDocShareholding(DevelopersAllData?.boardDocX)}
                                                                            >
                                                                                <VisibilityIcon />
                                                                            </button> : <p></p>
                                                                        } */}
                                                                        <div className={classes.fieldContainer}>
                              {/* <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                               placeholder={item?.din} 
                               disabled></Form.Control> */}
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td> 3 </td>
                                                                    <td> Registered and Irrevocable Agreement</td>
                                                                    <td align="center" size="large">
                                                                        {/* <input
                                                                            type="file"
                                                                            name="registeredDoc"
                                                                            // onChange={((e)=> setRegisteredDoc(e.target.value))}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "registeredDoc")}
                                                                            class="employee-card-input"
                                                                        /> */}
                                                                        <div className="row">
                               
                               <div className="btn btn-sm col-md-6">
                              <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <VisibilityIcon color="info" className="icon" /></IconButton>
                                    </div>
                               <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <FileDownloadIcon color="info" className="icon" /></IconButton>
                                    </div>
                              </div>
                                                                    </td>
                                                                    <td>
                                                                        {/* {DevelopersAllData?.registeredDoc !== "" ?
                                                                            <a href={urlGetRegisteredDocUrl} target="_blank" >
                                                                                <VisibilityIcon />
                                                                            </a> : <p></p>
                                                                        } */}
                                                                        <div className={classes.fieldContainer}>
                              {/* <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                               placeholder={item?.din} 
                               disabled></Form.Control> */}
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td> 4 </td>
                                                                    <td>
                                                                        Board resolutions of authorized signatory of
                                                                        firm/company provided technical assistance
                                                                    </td>
                                                                    <td align="center" size="large">
                                                                        {/* <input
                                                                            type="file"
                                                                            // onChange={((e)=> setBoardDocY(e.target.value))}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocY")}
                                                                            class="employee-card-input"
                                                                        /> */}
                                                                        <div className="row">
                               
                               <div className="btn btn-sm col-md-6">
                              <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <VisibilityIcon color="info" className="icon" /></IconButton>
                                    </div>
                               <div className="btn btn-sm col-md-6">
                                {/* <button className="btn btn-sm col-md-6">
                                  <VisibilityIcon color="info" className="icon" />
                                </button> */}
                                {/* <button className="btn btn-sm col-md-6">
                                  <FileDownloadIcon color="primary" />
                                </button> */}
                                <IconButton onClick={()=>getDocShareholding(item?.boardDoc)}>
                                    <FileDownloadIcon color="info" className="icon" /></IconButton>
                                    </div>
                              </div>
                                                                    </td>
                                                                    <td>
                                                                        {/* {DevelopersAllData?.boardDocY !== "" ?
                                                                            <a href={urlGetBoardDocYUrl} target="_blank" >
                                                                                <VisibilityIcon />
                                                                            </a> : <p></p>
                                                                        } */}
                                                                           <div className={classes.fieldContainer}>
                              {/* <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                               placeholder={item?.din} 
                               disabled></Form.Control> */}
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>{" "}
                                                        </Table>
                                                    </div>
                                                {/* </Col> */}
                                               
                                            </div>
                                        </div>
                                    </div>
                                    </div>
<br></br>
                                    <div className="row">
                                        <div className="col col-4">
                                            <div >
                                                <label htmlFor="licNo">License No.</label>
                                                {/* <input
                                                    type="text"
                                                    name="licNo"
                                                    value={technicalCapacitySoughtFromAnyColonizer.licNo}
                                                    onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, licNo: e.target.value })}
                                                    className="employee-card-input"
                                                    maxLength={10}
                                                /> */}
                                                   <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>
                                            </div>
                                        </div>

                                        <div className="col col-4">
                                            <div >
                                                <label htmlFor="licDate">Date</label>
                                                {/* <input
                                                    type="date"
                                                    name="licDate"
                                                    value={technicalCapacitySoughtFromAnyColonizer.dateOfGrantingLic}
                                                    onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, dateOfGrantingLic: e.target.value })}
                                                    className="employee-card-input"
                                                    maxLength={10}
                                                /> */}
                                                   <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>
                                            </div>
                                        </div>

                                        <div className="col col-4">
                                            <div >
                                                <label htmlFor="licValidity">Validity</label>
                                                {/* <input
                                                    type="date"
                                                    name="licValidity"
                                                    value={technicalCapacitySoughtFromAnyColonizer.licValidity}
                                                    onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, licValidity: e.target.value })}
                                                    className="employee-card-input"
                                                maxLength={10}
                                                /> */}
                                                   <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>
                                            </div>
                                        </div>

                                        <div className="col col-4">
                                            <div c>
                                                <label htmlFor="licValidity">Purpose</label>
                                                {/* <Select
                                                    value={technicalCapacitySoughtFromAnyColonizer.purpose}
                                                    onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, purpose: e.target.value })}
                                                    className="w-100"
                                                    variant="standard"
                                                >
                                                    {
                                                        purposeOptions?.data.map((item, index) => (
                                                            <MenuItem value={item.value} >{item?.label}</MenuItem>
                                                        ))
                                                    }
                                                </Select> */}
                                                   <div className={classes.fieldContainer}>
                              <Form.Control style={{ maxWidth: 200, marginRight: 5, height: 30 }}
                              //  placeholder={item?.din} 
                               disabled></Form.Control>
                               &nbsp;&nbsp;
                               <ReportProblemIcon
                  style={{
                    color: fieldIconColors.caution1
                  }}
                  onClick={() => {
                    setOpennedModal("caution1")
                    setLabelValue("Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act, 1975"),
                      setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution1: null);
                  }}
                ></ReportProblemIcon>
            </div>

                                            </div>
                                        </div>
                                    </div>
</div>
                            )}
                            {/* {alreadtObtainedLic === "N" && (
                                <div className="row ">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <div>
                                                <Table className="table table-bordered" size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Agreement*</th>
                                                            <th>Annexure </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td> 1 </td>
                                                            <td>
                                                                Agreement between the entities to provide
                                                                technical assistance
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e)=> setTechnicalAssistanceAgreementDoc(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td> 2 </td>
                                                            <td>
                                                                Board resolutions of authorized signatory of
                                                                firm/company provided technical assistance
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e)=> setBoardDocN(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 3 </td>

                                                            <td>
                                                                Auto populate details of earlier license(s)
                                                                granted to existing developer company/firm to
                                                                set up a colony under act of 1975.
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e)=> setEarlierDocN(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )} */}
                        </div>

{/* /////////////////////////////////////////////////////////////////////////////////// */}
<br></br>
<br></br>
<div className="hl"></div>
              <p>(v) Whether any technical expert(s) engaged   &nbsp;&nbsp;&nbsp;
                <div className="d-flex flex-row align-items-center ml-2">
                  <input type="radio" value="Yes"  className="mx-2 mt-1" checked={capacityScrutinyInfo?.technicalExpert === "Y" ? true : false} disabled />
                  <label className="m-0  mx-1" for="Yes">Yes</label>
                  <input type="radio" value="No"  className="mx-2 mt-1" checked={capacityScrutinyInfo?.technicalExpert === "N" ? true : false} disabled />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      color: fieldIconColors.caution3
                    }}
                    onClick={() => {
                      setOpennedModal("caution3")
                    setLabelValue("Whether any technical expert(s) engaged"),
                    setSmShow(true),
                    console.log("modal open"),
                    setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution3: null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </p>
              <br></br>
              <div>
                {/* <input type="radio" value="Yes"  className="mx-2 mt-1" onChange={handleChange}  onClick={handleshow1} />
                <label className="m-0  mx-1" for="Yes">Yes</label>
                
                <input type="radio" value="No"  className="mx-2 mt-1" onChange={handleChange}  onClick={handleshow1} />
              <label className="m-0 mx-2" for="No">No</label> */}

                {capacityScrutinyInfo?.technicalExpert === "Y" && (
                <div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="table-bd">
                        <Table className="table table-bordered">
                          <thead>
                            <tr>
                              <th class="fw-normal">S.No</th>
                              <th class="fw-normal">Professional </th>
                              <th class="fw-normal">Qualification</th>
                              <th class="fw-normal">Signature</th>
                              <th class="fw-normal">Annexure</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  placeholder={capacityScrutinyInfo?.technicalExpertEngaged[0]?.engineerName}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  placeholder={capacityScrutinyInfo?.technicalExpertEngaged[0]?.engineerQualification}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>

                              <td>
                                <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button> */}
                                
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.engineerSign)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                  {/* <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                    </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.engineerSign)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                              </td>
                              <td align="center" size="large">
                              <ReportProblemIcon
                    style={{
                      color: fieldIconColors.caution3
                    }}
                    onClick={() => {
                      setOpennedModal("caution3")
                    setLabelValue("Whether any technical expert(s) engaged"),
                    setSmShow(true),
                    console.log("modal open"),
                    setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution3: null);
                    }}
                  ></ReportProblemIcon>
                              </td>
                            </tr>

                            <tr>
                              <td>2</td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  placeholder={capacityScrutinyInfo?.technicalExpertEngaged[0]?.architectName}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  placeholder={capacityScrutinyInfo?.technicalExpertEngaged[0]?.architectQualification}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>

                              <td>
                                <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button> */}
                                   
                                 <div className="btn btn-sm col-md-6">
                                   <IconButton onClick={()=>getDocShareholding(item?.architectSign)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 <div className="btn btn-sm col-md-6">
                                  
                                  {/* <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                  <IconButton onClick={()=>getDocShareholding(item?.architectSign)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                              </td>
                              <td align="center" size="large">
                              <ReportProblemIcon
                    style={{
                      color: fieldIconColors.caution3
                    }}
                    onClick={() => {
                      setOpennedModal("caution3")
                    setLabelValue("Whether any technical expert(s) engaged"),
                    setSmShow(true),
                    console.log("modal open"),
                    setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution3: null);
                    }}
                  ></ReportProblemIcon>
                              </td>
                            </tr>

                            <tr>
                              <td>3</td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  placeholder={capacityScrutinyInfo?.technicalExpertEngaged[0]?.townPlannerName}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  placeholder={capacityScrutinyInfo?.technicalExpertEngaged[0]?.townPlannerQualification}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                        
                              <td>
                                <div className="row">
                                  {/* <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button> */}
                                   
                                 <div className="btn btn-sm col-md-6">
                                      <IconButton onClick={()=>getDocShareholding(item?.townPlannerSign)}>
                                      <VisibilityIcon color="info" className="icon" /></IconButton>
                                      </div>
                                 
                                  
                                  {/* <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button> */}
                                 
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.townPlannerSign)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </div>
                              </td>
                              <td align="center" size="large">
                              <ReportProblemIcon
                    style={{
                      color: fieldIconColors.caution3
                    }}
                    onClick={() => {
                      setOpennedModal("caution3")
                    setLabelValue("Whether any technical expert(s) engaged"),
                    setSmShow(true),
                    console.log("modal open"),
                    setFieldValue(capacityScrutinyInfo !== null ? capacityScrutinyInfo?.caution3: null);
                    }}
                  ></ReportProblemIcon>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
               )} 
                {showhide1 === "No" && (
                  <div className="row ">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <div className="table-bd">
                          <Table className="table table-bordered" size="sm">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Professional </th>
                                <th> Annexure</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td> 1 &nbsp;&nbsp;</td>
                                <td>Agreement with existing colonizer/developer who has already developed a colony</td>
                                <td align="center" size="large">
                                  {/* <input type="file" onChange={(e) => setExistingDevDoc(e.target.value)} placeholder="" class="employee-card-input" /> */}
                                  
                                 <div className="btn btn-sm col-md-6"></div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.existingDeveloperAgreementDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </td>
                              </tr>
                              <tr>
                                <td> 2&nbsp;&nbsp; </td>
                                <td>
                                  <input
                                    type="text"
                                    onChange={(e) => setTechnicalCapacity(e.target.value)}
                                    placeholder="Technical Capacity"
                                    class="employee-card-input"
                                  />
                                </td>
                                <td align="center" size="large">
                                  {/* <input
                                    type="file"
                                    onChange={(e) => setTechnicalCapacityDoc(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  /> */}  
                                 <div className="btn btn-sm col-md-6"></div>
                                    
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.technicalCapacityDoc)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </td>
                              </tr>
                              <tr>
                                <td> 3 &nbsp;&nbsp;</td>
                                {/* <td colSpan={2}>Larry the Bird</td> */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Name of Engineer"
                                    onChange={(e) => setengineerNameN(e.target.value)}
                                    class="employee-card-input"
                                  />
                                </td>
                                <td align="center" size="large">
                                  {/* <input type="file" onChange={(e) => setEngineerDocN(e.target.value)} placeholder="" class="employee-card-input" /> */}
                                  
                                 <div className="btn btn-sm col-md-6">
                                  </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.engineerDocN)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </td>
                              </tr>
                              <tr>
                                <td> 4&nbsp;&nbsp; </td>
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Name of Architect"
                                    onChange={(e) => setArchitectNameN(e.target.value)}
                                    class="employee-card-input"
                                  />
                                </td>
                                <td align="center" size="large">
                                  {/* <input type="file" onChange={(e) => setArchitectDocN(e.target.value)} placeholder="" class="employee-card-input" /> */}
                                
                                 <div className="btn btn-sm col-md-6">
                                  </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.architectDocN)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </td>
                              </tr>
                              <tr>
                                <td> 5&nbsp;&nbsp; </td>
                                <td>Upload SPA/GPA/ Board Resolution to sign collaboration agreement on behalf of land owner(s)</td>
                                <td align="center" size="large">
                                  {/* <input type="file" class="employee-card-input" onChange={(e) => setUplaodSpaBoardDoc(e.target.value)} /> */}
                               
                                 <div className="btn btn-sm col-md-6">
                                  </div>
                                 <div className="btn btn-sm col-md-6">
                                  <IconButton onClick={()=>getDocShareholding(item?.architectNameN)}>
                                      <FileDownloadIcon color="info" className="icon" /></IconButton>
                                      </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <br></br>



{/* //////////////////////////////////////////////////////////////////////////////////////////////// */}


            </div>
          </FormStep>
        </div>
      </Collapse>
    </div>
  );
};
export default DeveloperCapacity;
