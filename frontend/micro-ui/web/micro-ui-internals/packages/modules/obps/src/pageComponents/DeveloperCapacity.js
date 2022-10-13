import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Timeline from "../components/Timeline";
import { FormStep } from "@egovernments/digit-ui-react-components";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const DeveloperCapacity = ({t, config, onSelect,formData, formDataValue, data}) => {
    const { pathname: url } = useLocation();
    const userInfo = Digit.UserService.getUser();
    let validation = {};
    let isOpenLinkFlow = window.location.href.includes("openlink");
    // const financialCapacity = useSelector(selectFinancialCapacity)
    // const cin_Number = useSelector(selectCinNumber)
    // const companyName = useSelector(selectCompanayNAme)
    // const dateOfCorporation = useSelector(selectDateOfCorporation)
    // const registeredAddress = useSelector(selectRegisteredAddress)
    // const email = useSelector(selectEmail)
    // const mobileNumber = useSelector(selectMobileNumber)
    // const gst_Number = useSelector(selectGst_Number)
    // const shareHoldingPatterens = useSelector(selectShareHoldingPatterens)
    // const directorsData = useSelector(selectDirectorsInformation);
    // const authUserName = useSelector(selectmodalAuthUserValuesArray);
    const [isDevType, setIsDevType] = useState(false)
    const [isDevTypeComp, setIsDevTypeComp] = useState(false)
    const [modal, setmodal] = useState(false);
    const [modalColony, setmodalColony] = useState(false);
    const [capacityDevelopColonyHdruAct, setModalCapacityDevelopColonyHdruAct] = useState(formDataValue?.DeveloperCapacity?.capacityDevelopColonyHdruAct || []);
    // const [modalColonyDevGrpValuesArray, setModalColonyDevGrpValuesArray] = useState([]);
    const [capacityDevelopColonyLawAct, setCapacityDevelopColonyLawAct] = useState(formDataValue?.DeveloperCapacity?.capacityDevelopColonyLawAct || []);
    const [capacityDevelopAColony, setcapacityDevelopAColony] = useState([]);
  
    const [licenceNumber, setModalLcNo] = useState(formDataValue?.DeveloperCapacity?.licenceNumber || "");
    const [nameOfDeveloper, setModalDevName] = useState(formDataValue?.DeveloperCapacity?.nameOfDeveloper || "");
    const [purposeOfColony, setModalPurposeCol] = useState(formDataValue?.DeveloperCapacity?.purposeOfColony || "");
    const [sectorAndDevelopmentPlan, setModalDevPlan] = useState(formDataValue?.DeveloperCapacity?.sectorAndDevelopmentPlan || "");
    const [validatingLicence, setModalDevValidity] = useState(formDataValue?.DeveloperCapacity?.validatingLicence || "");
  
    
    const [coloniesDeveloped,setColonyDev] = useState(formDataValue?.DeveloperCapacity?.coloniesDeveloped || "");
    const [area,setColonyArea] = useState(formDataValue?.DeveloperCapacity?.area || "");
    const [purpose,setColonyPurpose] = useState(formDataValue?.DeveloperCapacity?.purpose || "");
    const [statusOfDevelopment,setColonyStatusDev] = useState(formDataValue?.DeveloperCapacity?.statusOfDevelopment || "");
    const [outstandingDues,setColonyoutstandingDue] = useState(formDataValue?.DeveloperCapacity?.outstandingDues || "");
  
    const [engineerName,setEngineerName] = useState(formDataValue?.DeveloperCapacity?.engineerName || "")
    const [engineerQualification,setEngineerQualification] = useState(formDataValue?.DeveloperCapacity?.engineerQualification || "")
    const [engineerSign,setEngineerSign] = useState(formDataValue?.DeveloperCapacity?.engineerSign || "")
    const [engineerDegree,setEngineerDegree] = useState(formDataValue?.DeveloperCapacity?.engineerDegree || "")
    const [architectName,setArchitectName] = useState(formDataValue?.DeveloperCapacity?.architectName || "")
    const [architectQualification,setArchitectQualification] = useState(formDataValue?.DeveloperCapacity?.architectQualification || "")
    const [architectSign,setArchitectSign] = useState(formDataValue?.DeveloperCapacity?.architectSign || "")
    const [architectDegree,setArchitectDegree] = useState(formDataValue?.DeveloperCapacity?.architectDegree || "")
    const [townPlannerName,setTownPlannerName] = useState(formDataValue?.DeveloperCapacity?.townPlannerName || "")
    const [townPlannerQualification,setTownPlannerQualification] = useState(formDataValue?.DeveloperCapacity?.townPlannerQualification || "")
    const [townPlannerSign,setTownPlannerSign] = useState(formDataValue?.DeveloperCapacity?.townPlannerSign || "")
    const [townPlannerDegree,setTownPlannerDegree] = useState(formDataValue?.DeveloperCapacity?.townPlannerDegree || "")
    const [existingDeveloperAgreement,setExistingDev] = useState(formDataValue?.DeveloperCapacity?.existingDeveloperAgreement || "")
    const [existingDeveloperAgreementDoc,setExistingDevDoc] = useState(formDataValue?.DeveloperCapacity?.existingDeveloperAgreementDoc || "")
    const [technicalCapacity,setTechnicalCapacity] = useState(formDataValue?.DeveloperCapacity?.technicalCapacity || "")
    const [technicalCapacityDoc,setTechnicalCapacityDoc] = useState(formDataValue?.DeveloperCapacity?.technicalCapacityDoc || "")
    const [engineerNameN,setengineerNameN] = useState(formDataValue?.DeveloperCapacity?.engineerNameN || "")
    const [engineerDocN,setEngineerDocN] = useState(formDataValue?.DeveloperCapacity?.engineerDocN || "")
    const [architectNameN,setArchitectNameN] = useState(formDataValue?.DeveloperCapacity?.architectNameN || "")
    const [architectDocN,setArchitectDocN] = useState(formDataValue?.DeveloperCapacity?.architectDocN || "")
    const [uplaodSpaBoard,setUplaodSpaBoard] = useState(formDataValue?.DeveloperCapacity?.uplaodSpaBoard || "")
    const [uplaodSpaBoardDoc,setUplaodSpaBoardDoc] = useState(formDataValue?.DeveloperCapacity?.uplaodSpaBoardDoc || "")
    const [agreementDoc,setAgreementDoc] = useState(formDataValue?.DeveloperCapacity?.agreementDoc || "")
    const [boardDoc,setBoardDoc] = useState(formDataValue?.DeveloperCapacity?.boardDoc || "")
    const [registeredDoc,setRegisteredDoc] = useState(formDataValue?.DeveloperCapacity?.registeredDoc || "")
    const [boardDocY,setBoardDocY] = useState(formDataValue?.DeveloperCapacity?.boardDocY || "")
    const [earlierDocY,setEarlierDocY] = useState(formDataValue?.DeveloperCapacity?.earlierDocY || "")
    const [boardDocN,setBoardDocN] = useState(formDataValue?.DeveloperCapacity?.boardDocN || "")
    const [earlierDocN,setEarlierDocN] = useState(formDataValue?.DeveloperCapacity?.earlierDocN || "")
    const [technicalAssistanceAgreementDoc,setTechnicalAssistanceAgreementDoc] = useState(formDataValue?.DeveloperCapacity?.technicalAssistanceAgreementDoc || "")
  
    
    // console.log("AUTHNAME", authUserName);
  
    // const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm([{ XLongitude: "", YLatitude: "" }]);
    const formSubmit = (data) => {
      console.log("data", data);
    };
    const [AppliedDetailFormSubmitted, SetAppliedDetailFormSubmitted] =
      useState(false);
    // const AppliedDetailFormSubmitHandler = (e) => {
    //   e.preventDefault();
    //   SetAppliedDetailFormSubmitted(true);
    // };
    // useEffect(() => {
    //   if (AppliedDetailFormSubmitted) {
    //     props.AppliedDetailsFormSubmit(true);
    //   }
    // }, [AppliedDetailFormSubmitted]);
    const [showhide, setShowhide] = useState("No");
    const [showhide1, setShowhide1] = useState("no");
    const [showhide0, setShowhide0] = useState("No");
    // const [showhide2, setShowhide2] = useState("No");
    // const [showhide3, setShowhide3] = useState("No");
    // const [showhide4, setShowhide4] = useState("No");
    // const [showhide5, setShowhide5] = useState("No");
    const [showhide6, setShowhide6] = useState("no");
  
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
    // const handleshow2 = (e) => {
    //   const getshow = e.target.value;
    //   setShowhide2(getshow);
    // };
    // const handleshow3 = (e) => {
    //   const getshow = e.target.value;
    //   setShowhide3(getshow);
    // };
    // const handleshow4 = (e) => {
    //   const getshow = e.target.value;
    //   setShowhide4(getshow);
    // };
    // const handleshow5 = (e) => {
    //   const getshow = e.target.value;
    //   setShowhide5(getshow);
    // };
    const handleshow6 = (e) => {
      const getshow = e.target.value;
      setShowhide6(getshow);
    };
  
    const handleChange = (e) => {
      this.setState({ isRadioSelected: true });
    };
    
    const devTypeFlagVal = localStorage.getItem('devTypeValueFlag');
    
    // if(devTypeFlagVal == "1"){
    //     setIsDevType(true);
    // }
    // if(devTypeFlagVal == "0"){
    //     setIsDevTypeComp(true);
    // }



    const handleArrayValues = () => {
  
      if (licenceNumber !== "" && nameOfDeveloper !== "" && purposeOfColony !== "") {
  
        const values = {
          
            licenceNumber: licenceNumber,
            nameOfDeveloper: nameOfDeveloper,
            purposeOfColony: purposeOfColony,
            sectorAndDevelopmentPlan: sectorAndDevelopmentPlan,
            validatingLicence: validatingLicence
          
        }
        setModalCapacityDevelopColonyHdruAct((prev) => [...prev, values]);
        setmodal(!modal)
      }
      console.log("DevCapacityFirst", capacityDevelopColonyHdruAct);
      localStorage.setItem("DevCapacityDetails", JSON.stringify(capacityDevelopColonyHdruAct))
    }
  
  
    const handleColonyDevGrp=()=>{
      const colonyDevValues = {
        
          coloniesDeveloped:coloniesDeveloped,
          area:area,
          purpose:purpose,
          statusOfDevelopment:statusOfDevelopment,
          outstandingDues:outstandingDues
        
        
      }
      setCapacityDevelopColonyLawAct((prev) => [...prev, colonyDevValues]);
      setmodalColony(!modalColony)
      console.log("DevCapacityColony", capacityDevelopColonyLawAct);
    }
  
    const submitTechdevData = async (e) => {
    //   e.preventDefault();
      const formDataValues = {
        // "developerDetail" :[
        //   {
        //     "devDetail":{
        //       addInfo:{
        //         financialCapacity:financialCapacity,
        //         cin_Number:cin_Number,
        //         companyName:companyName,
        //         dateOfCorporation:dateOfCorporation,
        //         registeredAddress:registeredAddress,
        //         email:email,
        //         mobileNumber:mobileNumber,
        //         gst_Number:gst_Number,
        //         shareHoldingPatterens:shareHoldingPatterens,
        //         directorsData:directorsData,
        //       },
        //       addRemoveAuthoizedUsers:{
        //         authUserName:authUserName
        //       },
        //       capacityDevelopAColony: {
        //         capacityDevelopColonyHdruAct: capacityDevelopColonyHdruAct,
        //         capacityDevelopColonyLawAct:capacityDevelopColonyLawAct,
        //         technicalExpertEngaged:{
        //           engineerName:engineerName,
        //           engineerQualification:engineerQualification,
        //           engineerSign:engineerSign,
        //           engineerDegree:engineerDegree,
        //           architectName:architectName,
        //           architectQualification:architectQualification,
        //           architectSign:architectSign,
        //           architectDegree:architectDegree,
        //           townPlannerName:townPlannerName,
        //           townPlannerQualification:townPlannerQualification,
        //           townPlannerSign:townPlannerSign,
        //           townPlannerDegree:townPlannerDegree,
        //           existingDeveloperAgreement:existingDeveloperAgreement,
        //           existingDeveloperAgreementDoc:existingDeveloperAgreementDoc,
        //           technicalCapacity:technicalCapacity,
        //           technicalCapacityDoc:technicalCapacityDoc,
        //           engineerNameN:engineerNameN,
        //           engineerDocN:engineerDocN,
        //           architectNameN:architectNameN,
        //           architectDocN:architectDocN,
        //           uplaodSpaBoard:uplaodSpaBoard,
        //           uplaodSpaBoardDoc:uplaodSpaBoardDoc
        //         },
        //         designationDirector:{
        //           agreementDoc:agreementDoc,
        //           boardDoc:boardDoc
        //         },
        //         obtainedLicense:{
        //           registeredDoc:registeredDoc,
        //           boardDocY:boardDocY,
        //           earlierDocY:earlierDocY,
        //           boardDocN:boardDocN,
        //           earlierDocN:earlierDocN,
        //           technicalAssistanceAgreementDoc:technicalAssistanceAgreementDoc
        //         }
                
                
        //       },
  
        //     }
        //   }
        // ]
        capacityDevelopAColony: {
        capacityDevelopColonyHdruAct: capacityDevelopColonyHdruAct,
        capacityDevelopColonyLawAct:capacityDevelopColonyLawAct,
        technicalExpertEngaged:{
            engineerName:engineerName,
            engineerQualification:engineerQualification,
            engineerSign:engineerSign,
            engineerDegree:engineerDegree,
            architectName:architectName,
            architectQualification:architectQualification,
            architectSign:architectSign,
            architectDegree:architectDegree,
            townPlannerName:townPlannerName,
            townPlannerQualification:townPlannerQualification,
            townPlannerSign:townPlannerSign,
            townPlannerDegree:townPlannerDegree,
            existingDeveloperAgreement:existingDeveloperAgreement,
            existingDeveloperAgreementDoc:existingDeveloperAgreementDoc,
            technicalCapacity:technicalCapacity,
            technicalCapacityDoc:technicalCapacityDoc,
            engineerNameN:engineerNameN,
            engineerDocN:engineerDocN,
            architectNameN:architectNameN,
            architectDocN:architectDocN,
            uplaodSpaBoard:uplaodSpaBoard,
            uplaodSpaBoardDoc:uplaodSpaBoardDoc
        },
        designationDirector:{
            agreementDoc:agreementDoc,
            boardDoc:boardDoc
        },
        obtainedLicense:{
            registeredDoc:registeredDoc,
            boardDocY:boardDocY,
            earlierDocY:earlierDocY,
            boardDocN:boardDocN,
            earlierDocN:earlierDocN,
            technicalAssistanceAgreementDoc:technicalAssistanceAgreementDoc
        }
        
        
        },
        
      }
      onSelect(config.key, formDataValues);
    //   try {
    //     let res = await axios.post("http://localhost:8081/user/developer/_registration",formDataValues,{
    //       headers:{
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-origin':"*",
    //     }
    //     }).then((response)=>{
    //       return response
    //     });
        
        
    //   } catch (err) {
    //     console.log(err);
    //   }
      
      console.log("FINAL SUBMIT",formDataValues)
      localStorage.setItem("capacity",JSON.stringify(formDataValues));
      setcapacityDevelopAColony((prev) => [...prev, formDataValues]);
      
      // dispatch(setTechnicalData(
      //   formDataValues
      // ))
      
    }
    const jsonobj=localStorage.getItem("capacity") ;
    console.log(JSON.parse(jsonobj));
    
  
    const [noofRows, setNoOfRows] = useState(1);
    const [noofRow, setNoOfRow] = useState(1);
    const [noofRow1, setNoOfRow1] = useState(1);
    const onSkip = () => onSelect();
    return (
        <div className={isOpenLinkFlow ? "OpenlinkContainer" : ""}>
            <Timeline currentStep={4} flow="STAKEHOLDER" />
            <FormStep 
                config={config}
                onSelect={submitTechdevData}
                onSkip={onSkip}
                // onClick={submitTechdevData} 
                t={t}
            >
                {devTypeFlagVal === "01" &&(
                <div className="card-body">
                    <div className="form-group row mb-12">
                        {/* <label className="col-sm-3 col-form-label">Individual</label> */}
                        <div className="col-sm-12">
                        {/* <textarea type="text" className="employee-card-input" id="details" placeholder="Enter Details" /> */}
                        <table className="table table-bordered" size="sm">
                            <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Particulars of document</th>
                                <th>Details </th>
                                <th>Annexure </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td> 1 </td>
                                <td>
                                Net Worth in case of individual certified by
                                CA
                                </td>
                                <td>
                                <input
                                    type="file"
                                    name="upload"
                                    placeholder=""
                                    class="employee-card-input"
                                />
                                </td>
                                <td align="center" size="large">
                                {/* <FileUploadIcon /> */}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>)}
                {devTypeFlagVal === "02" &&(
                <div className="card-body">
                    <div className="form-group row">
                        {/* <label className="col-sm-3 col-form-label">Company</label> */}
                        <div className="col-sm-12">
                        {/* <input type="text" className="employee-card-input" id="Email" placeholder="Enter Email" /> */}
                        <table className="table table-bordered" size="sm">
                            <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Particulars of document</th>
                                <th>Details </th>
                                <th>Annexure </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td> 1 </td>
                                <td>Balance sheet of last 3 years </td>
                                <td>
                                <input
                                    type="file"
                                    name="upload"
                                    placeholder=""
                                    class="employee-card-input"
                                />
                                </td>
                                <td align="center" size="large">
                                {/* <FileUploadIcon /> */}
                                </td>
                            </tr>
                            <tr>
                                <td> 2 </td>
                                <td>Ps-3(Representing Paid-UP capital)</td>
                                <td>
                                <input
                                    type="file"
                                    name="upload"
                                    placeholder=""
                                    class="employee-card-input"
                                />
                                </td>
                                <td align="center" size="large">
                                {/* <FileUploadIcon /> */}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>)}
                {devTypeFlagVal === "03" &&(
                <div className="card-body">
                    <div className="form-group row">
                        {/* <label className="col-sm-3 col-form-label">LLP</label> */}
                        <div className="col-sm-12">
                        {/* <input type="text" className="employee-card-input" id="llp" placeholder="Enter Email" /> */}
                        <table className="table table-bordered" size="sm">
                            <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Particulars of document</th>
                                <th>Details </th>
                                <th>Annexure </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td> 1 </td>
                                <td>Networth of partners </td>
                                <td>
                                <input
                                    type="file"
                                    name="upload"
                                    placeholder=""
                                    class="employee-card-input"
                                />
                                </td>
                                <td align="center" size="large">
                                {/* <FileUploadIcon /> */}
                                </td>
                            </tr>
                            <tr>
                                <td> 2 </td>
                                <td>Net worth of firm</td>
                                <td>
                                <input
                                    type="file"
                                    name="upload"
                                    placeholder=""
                                    class="employee-card-input"
                                />
                                </td>
                                <td align="center" size="large">
                                {/* <FileUploadIcon /> */}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>)}
                {/* <div>
                    <h5 className="card-h">
                    {" "}
                    Capacity of Developer to develop a colony:
                    </h5>
                </div> */}
                <div className="card-body">
                    <p>
                    1. I/ We hereby submit the following information/ enclose the
                    relevant documents:-
                    </p>
                    <p>
                    &nbsp;&nbsp;&nbsp; (i) Whether the Developer/ group company has
                    earlier been granted permission to set up a colony under HDRU
                    Act, 1975: *{" "}
                    </p>
                    <div className="form-group">
                    <input
                        type="radio"
                        value="Yes"
                        id="Yes"
                        className="mx-2 mt-1"
                        onChange={handleChange}
                        name="Yes"
                        onClick={handleshow0}
                    />
                    <label for="Yes">Yes</label>

                    <input
                        type="radio"
                        value="No"
                        id="No"
                        className="mx-2 mt-1"
                        onChange={handleChange}
                        name="Yes"
                        onClick={handleshow0}
                    />
                    <label for="No">No</label>
                    {showhide0 === "Yes" && (
                        <div className="card-body">
                        {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                        <div className="table-bd">
                            <Table className="table table-bordered">
                            <thead>
                                <tr>
                                <th>S. no</th>
                                <th> Licence No / year and date of grant of licence </th>
                                <th>Name of developer *</th>
                                <th>Purpose of colony </th>
                                <th>Sector and development plan </th>
                                <th>Validity of licence including renewals if any</th>
                                {/* <th>Remove</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                (capacityDevelopColonyHdruAct.length > 0) ?
                                    capacityDevelopColonyHdruAct.map((elementInArray, input) => {
                                    return (
                                    <tr>

                                        <td>{input + 1}</td>
                                        <td>
                                            <input
                                            type="text"
                                            value={elementInArray.licenceNumber}
                                            placeholder={elementInArray.licenceNumber}
                                            class="employee-card-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                            type="text"
                                            value={elementInArray.nameOfDeveloper}
                                            placeholder={elementInArray.nameOfDeveloper}
                                            class="employee-card-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                            type="text"
                                            value={elementInArray.purposeOfColony}
                                            placeholder={elementInArray.purposeOfColony}
                                            class="employee-card-input"
                                            />
                                        </td>
                                        <td>
                                            <div className="row">
                                            <button className="btn btn-sm col-md-6">
                                                <VisibilityIcon color="info" className="icon" />
                                            </button>
                                            <button className="btn btn-sm col-md-6">
                                                <FileDownloadIcon color="primary"  />
                                            </button>
                                            
                                            </div>
                                        </td>
                                        <td>
                                            <div className="row">
                                            <button className="btn btn-sm col-md-6">
                                                <VisibilityIcon color="info" className="icon" />
                                            </button>
                                            <button className="btn btn-sm col-md-6">
                                                <FileDownloadIcon color="primary"  />
                                            </button>
                                            
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                    }) : <p>Click on Add more</p>
                                }
                            </tbody>
                            </Table>
                            <div>
                            <button
                                type="button"
                                style={{
                                float: "left",
                                backgroundColor: "#0b3629",
                                color: "white",
                                }}
                                className="btn mt-3"
                                // onClick={() => setNoOfRows(noofRows + 1)}
                                onClick={() => setmodal(true)}
                            >
                                Add More
                            </button>

                            <div>
                                <Modal
                                size="lg"
                                isOpen={modal}
                                toggle={() => setmodal(!modal)}
                                >
                                <ModalHeader
                                    toggle={() => setmodal(!modal)}
                                ></ModalHeader>

                                <ModalBody>
                                    <div className="card2">
                                    <div className="popupcard">


                                        <form className="text1">
                                        <Row>
                                            <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Licence No / year of licence</label>
                                            <input
                                                type="text"
                                                onChange={(e) => setModalLcNo(e.target.value)}
                                                placeholder=""
                                                class="employee-card-input"
                                            />
                                            </Col>
                                            <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Name of developer *</label>
                                            <input
                                                type="text"
                                                onChange={(e) => setModalDevName(e.target.value)}
                                                placeholder=""
                                                class="employee-card-input"
                                            />
                                            </Col>
                                            <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Purpose of colony</label>
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
                                            <label htmlFor="name" className="text">Sector and development plan</label>
                                            <input
                                                type="file"
                                                onChange={(e) => setModalDevPlan(e.target.value)}
                                                placeholder=""
                                                class="employee-card-input"
                                            />
                                            </Col>
                                            <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Validity of licence </label>
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
                                        <button
                                            type="button"
                                            onClick={handleArrayValues}
                                            style={{ float: "right" }}
                                            className="btn btn-success"
                                        >
                                            Submit
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter
                                    toggle={() => setmodal(!modal)}
                                ></ModalFooter>
                                </Modal>
                            </div>
                            </div>

                            <br></br>
                            <br></br>
                        </div>

                        </div>
                    )}
                    </div>

                    <div className="hl"></div>
                    <p>
                    &nbsp;&nbsp;&nbsp;(ii) Licences/permissions granted to
                    Developer/ group company for development of colony under any
                    other law/Act as .
                    </p>
                    <div>
                    <div className="card-body">
                        {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                        <div className="table-bd">
                        <Table className="table table-bordered">
                            <thead>
                            <tr>
                                {/* <th>Add More</th> */}
                                <th>S.No</th>
                                <th>Colonies developed</th>
                                <th>Area</th>
                                <th>Purpose</th>
                                <th>Status of development</th>
                                <th>Outstanding Dues</th>
                                {/* <th>Action</th> */}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (capacityDevelopColonyLawAct.length > 0) ?
                                capacityDevelopColonyLawAct.map((elementInArray, input) => {
                                    return (
                                    <tr>
                                        <td>{input+1}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={elementInArray.coloniesDeveloped}
                                                placeholder={elementInArray.coloniesDeveloped}
                                                class="employee-card-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={elementInArray.area}
                                                placeholder={elementInArray.area}
                                                class="employee-card-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={elementInArray.purpose}
                                                placeholder={elementInArray.purpose}
                                                class="employee-card-input"
                                            />
                                        </td>
                                        <td>
                                            <div className="row">
                                                <button className="btn btn-sm col-md-6">
                                                    <VisibilityIcon color="info" className="icon" />
                                                </button>
                                                <button className="btn btn-sm col-md-6">
                                                    <FileDownloadIcon color="primary"  />
                                                </button>
                                                
                                            </div>
                                        </td>
                                        <td>
                                            <div className="row">
                                                <button className="btn btn-sm col-md-6">
                                                    <VisibilityIcon color="info" className="icon" />
                                                </button>
                                                <button className="btn btn-sm col-md-6">
                                                    <FileDownloadIcon color="primary"  />
                                                </button>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                                    ):<p>Click on add more</p>
                        }
                            </tbody>
                        </Table>
                        <div>
                            <button
                            type="button"
                            style={{
                                float: "left",
                                backgroundColor: "#0b3629",
                                color: "white",
                            }}
                            className="btn mt-3"
                            // onClick={() => setNoOfRows(noofRows + 1)}
                            onClick={() => setmodalColony(true)}
                            >
                            Add More
                            </button>

                            <div>
                            <Modal
                                size="lg"
                                isOpen={modalColony}
                                toggle={() => setmodalColony(!modalColony)}
                            >
                                <ModalHeader
                                toggle={() => setmodalColony(!modalColony)}
                                ></ModalHeader>

                                <ModalBody>
                                <div className="card2">
                                    <div className="popupcard">
                                    <form className="text1">
                                        <Row>
                                        <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Colonies developed</label>
                                            <input
                                            type="text"
                                            onChange={(e) => setColonyDev(e.target.value)}
                                            placeholder=""
                                            class="employee-card-input"
                                            />
                                        </Col>
                                        <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Area</label>
                                            <input
                                            type="number"
                                            onChange={(e) => setColonyArea(e.target.value)}
                                            placeholder=""
                                            class="employee-card-input"
                                            />
                                        </Col>
                                        <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Purpose</label>
                                            <input
                                            type="text"
                                            onChange={(e) => setColonyPurpose(e.target.value)}
                                            placeholder=""
                                            class="employee-card-input"
                                            />
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Status of development</label>
                                            <input
                                            type="file"
                                            onChange={(e) => setColonyStatusDev(e.target.value)}
                                            placeholder=""
                                            class="employee-card-input"
                                            />
                                        </Col>
                                        <Col md={4} xxl lg="4">
                                            <label htmlFor="name" className="text">Outstanding Dues</label>
                                            <input
                                            type="file"
                                            onChange={(e) => setColonyoutstandingDue(e.target.value)}
                                            placeholder=""
                                            class="employee-card-input"
                                            />
                                        </Col>

                                        </Row>
                                    </form>

                                    </div>
                                    <div className="submit-btn">
                                    <div className="form-group col-md6 mt-6">
                                        <button
                                        type="button"
                                        style={{ float: "right" }}
                                        className="btn btn-success"
                                        onClick={handleColonyDevGrp}
                                        >
                                        Submit
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </ModalBody>
                                <ModalFooter
                                toggle={() => setmodalColony(!modalColony)}
                                ></ModalFooter>
                            </Modal>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        </div>
                    </div>
                    </div>

                    <div className="hl"></div>
                    <p>
                    &nbsp;&nbsp;&nbsp;(iii) Whether any technical expert(s) engaged
                    </p>

                    <div className="form-group">
                    <input
                        type="radio"
                        value="Yes"
                        id="Yes"
                        className="mx-2 mt-1"
                        onChange={handleChange}
                        name="Yes"
                        onClick={handleshow1}
                    />
                    <label for="Yes">Yes</label>

                    <input
                        type="radio"
                        value="No"
                        id="No"
                        className="mx-2 mt-1"
                        onChange={handleChange}
                        name="Yes"
                        onClick={handleshow1}
                    />
                    <label for="No">No</label>
                    {showhide1 === "Yes" && (
                        <div className="row ">
                        <div className="form-group row">
                            <div className="col-sm-12">
                            <div className="table-bd">
                                <Table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>S.No</th>
                                    <th>Professional </th>
                                    <th>Qualification</th>
                                    <th>Signature</th>
                                    <th>Annexure</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>
                                        <input
                                        typr="text"
                                        onChange={(e) => setEngineerName(e.target.value)}
                                        placeholder="Name of Engineer"
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                        type="text"
                                        onChange={(e) => setEngineerQualification(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>

                                    <td>
                                        <input
                                        type="file"
                                        onChange={(e) => setEngineerSign(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td align="center" size="large">
                                    <input
                                        type="file"
                                        onChange={(e) => setEngineerDegree(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>

                                    <tr>
                                    <td>2</td>
                                    <td> 
                                    <input
                                        typr="text"
                                        onChange={(e) => setArchitectName(e.target.value)}
                                        placeholder="Name of Architect"
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                        type="text"
                                        onChange={((e) => setArchitectQualification(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>

                                    <td>
                                        <input
                                        type="file"
                                        onChange={((e) => setArchitectSign(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td align="center" size="large">
                                        <input
                                        type="file"
                                        onChange={((e) => setArchitectDegree(e.target.value))}
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>

                                    <tr>
                                    <td>3</td>
                                    <td> 
                                    <input
                                        type="text"
                                        onChange={((e) => setTownPlannerName(e.target.value))}
                                        placeholder="Name of Town Planner"
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                        type="text"
                                        onChange={((e) => setTownPlannerQualification(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>

                                    <td>
                                        <input
                                        type="file"
                                        onChange={((e) => setTownPlannerSign(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td align="center" size="large">
                                    <input
                                        type="file"
                                        onChange={((e) => setTownPlannerDegree(e.target.value))}
                                        placeholder=""
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
                    )}
                    {showhide1 === "No" && (
                        <div className="row ">
                        <div className="form-group row">
                            {/* <label className="col-sm-3 col-form-label">Company</label> */}
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
                                    <td>
                                        {" "}
                                        Agreement with existing colonizer/developer
                                        who has already developed a colony
                                        {/* <input
                                        type="text"
                                        onChange={((e) => setExistingDev(e.target.value))}
                                        placeholder=""
                                        /> */}
                                    </td>
                                    <td align="center" size="large">
                                    <input
                                        type="file"
                                        onChange={((e) => setExistingDevDoc(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td> 2&nbsp;&nbsp; </td>
                                    <td>
                                    <input
                                        type="text"
                                        onChange={((e) => setTechnicalCapacity(e.target.value))}
                                        placeholder="Technical Capacity"
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td align="center" size="large">
                                        <input
                                        type="file"
                                        onChange={((e) => setTechnicalCapacityDoc(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td> 3 &nbsp;&nbsp;</td>
                                    {/* <td colSpan={2}>Larry the Bird</td> */}
                                    <td>
                                        <input 
                                        type="text"
                                        placeholder="Name of Engineer"
                                        onChange={((e)=> setengineerNameN(e.target.value))}
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td align="center" size="large">
                                    <input
                                        type="file"
                                        onChange={((e) => setEngineerDocN(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td> 4&nbsp;&nbsp; </td>
                                    <td>
                                    <input 
                                        type="text"
                                        placeholder="Name of Architect"
                                        onChange={((e)=> setArchitectNameN(e.target.value))}
                                        class="employee-card-input"
                                        />
                                    </td>
                                    <td align="center" size="large">
                                    <input
                                        type="file"
                                        onChange={((e) => setArchitectDocN(e.target.value))}
                                        placeholder=""
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td> 5&nbsp;&nbsp; </td>
                                    <td>
                                        {/* <input
                                        type="text"
                                        onChange={((e) => setUplaodSpaBoard(e.target.value))} 
                                        placeholder=""
                                        class="employee-card-input"
                                        /> */}
                                        Upload SPA/GPA/ Board Resolution to sign
                                        collaboration agreement on behalf of land
                                        owner(s)
                                    </td>
                                    <td align="center" size="large">
                                        <input 
                                        type="file"
                                        class="employee-card-input"
                                        onChange={((e)=> setUplaodSpaBoardDoc(e.target.value))}
                                        />
                                    </td>
                                    </tr>
                                </tbody>
                                </Table>
                            </div>
                            </div>
                        </div>

                        {/* <input type="text" className="employee-card-input" /> */}
                        </div>
                    )}
                    </div>

                    <div className="hl"></div>
                    <p>
                    &nbsp;&nbsp;&nbsp;(iv) If director/partner of the proposed
                    developer company/firm also holds designation of
                    director/partner in any other company/firm who has already
                    obtained license(s) under act of 1975:
                    </p>

                    <div className="form-group">
                    <input
                        type="radio"
                        value="Yes"
                        id="Yes"
                        className="mx-2 mt-1"
                        onChange={(e)=>handleChange(e.target.value)}
                        name="Yes"
                        onClick={handleshow}
                    />
                    <label for="Yes">Yes</label>

                    <input
                        type="radio"
                        value="No"
                        id="No"
                        className="mx-2 mt-1"
                        onChange={(e)=>handleChange(e.target.value)}
                        name="Yes"
                        onClick={handleshow}
                    />
                    <label for="No">No</label>
                    {showhide === "Yes" && (
                        <div className="row ">
                        <div className="form-group row">
                            <div className="col-sm-12">
                            <Col xs="12" md="12" sm="12">
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
                                    <td>
                                        {" "}
                                        Agreement between the entities to provide
                                        technical assistance
                                    </td>
                                    <td align="center" size="large">
                                        <input
                                        type="file"
                                        onChange={((e) => setAgreementDoc(e.target.value))}
                                        class="employee-card-input"
                                        />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td> 2&nbsp;&nbsp; </td>
                                    <td>
                                        Board resolutions of authorized signatory of
                                        firm/company provided technical assistance
                                    </td>
                                    <td align="center" size="large">
                                    <input
                                        type="file"
                                        onChange={((e) => setBoardDoc(e.target.value))}
                                        class="employee-card-input"
                                        />
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

                    <div className="hl"></div>
                    <p>
                    2. In case of technical capacity sought from another
                    company/firm who has already obtained license(s) under act of
                    1975 or outside Haryana:
                    </p>
                    <div className="form-group">
                    <input
                        type="radio"
                        value="Yes"
                        id="Yes"
                        className="mx-2 mt-1"
                        onChange={handleChange}
                        name="Yes"
                        onClick={handleshow6}
                    />
                    <label for="Yes">Yes</label>

                    <input
                        type="radio"
                        value="No"
                        id="No"
                        className="mx-2 mt-1"
                        onChange={handleChange}
                        name="Yes"
                        onClick={handleshow6}
                    />
                    <label for="No">No</label>
                    {showhide6 === "Yes" && (
                        <div className="row ">
                        <div className="form-group row">
                            <div className="col-sm-12">
                            <Col xs="12" md="12" sm="12">
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
                                        <td> Registered and Irrevocable Agreement</td>
                                        <td align="center" size="large">
                                        <input 
                                            type="file"
                                            onChange={((e)=> setRegisteredDoc(e.target.value))}
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
                                            onChange={((e)=> setBoardDocY(e.target.value))}
                                            class="employee-card-input"
                                        />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> 3 </td>

                                        <td>
                                        Auto populate details of earlier license(s)
                                        granted to existing developer company/firm
                                        to set up a colony under act of 1975.
                                        </td>
                                        <td align="center" size="large">
                                        <input 
                                            type="file"
                                            onChange={((e)=> setEarlierDocY(e.target.value))}
                                            class="employee-card-input"
                                        />
                                        </td>
                                    </tr>
                                    </tbody>{" "}
                                </Table>
                                </div>
                            </Col>
                            </div>
                        </div>
                        </div>
                    )}
                    {showhide6 === "No" && (
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
                                        onChange={((e)=> setTechnicalAssistanceAgreementDoc(e.target.value))}
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
                                            onChange={((e)=> setBoardDocN(e.target.value))}
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
                                            onChange={((e)=> setEarlierDocN(e.target.value))}
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
                    )}
                    </div>
                    {/* </Col> */}
                </div>
                {/* <div className="form-group col-md2 mt-4">
                    <button 
                        className="btn btn-success" 
                        style={{ float: "right" }} 
                        >
                    Submit
                    </button>
                </div> */}
               
            </FormStep>
        </div>
    );
};
export default DeveloperCapacity;