import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm, useFieldArray } from "react-hook-form";
import DDJAYForm from "../Step4/DdjayForm";
import ResidentialPlottedForm from "./ResidentialPlotted";
import IndustrialPlottedForm from "./IndustrialPlotted";
import { Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import CalculateIcon from "@mui/icons-material/Calculate";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import axios from "axios";
import Spinner from "../../../../components/Loader";

const AppliedDetailForm = (props) => {
  console.log("DD", props);
  const Purpose = localStorage.getItem("purpose");
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dgps: [
        {
          XLongitude: "",
          YLatitude: "",
        },
        {
          XLongitude: "",
          YLatitude: "",
        },
        {
          XLongitude: "",
          YLatitude: "",
        },
        {
          XLongitude: "",
          YLatitude: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dgps",
  });

  const AppliedDetailFormSubmitHandler = async (data) => {
    props.Step4Continue(data,5);
    console.log("data------", data);
    props.Step4Continue(data, "5");
    // return;
    const token = window?.localStorage?.getItem("token");
    const postDistrict = {
      pageName: "DetailsofAppliedLand",
      id: props.getId,
      createdBy: props?.userData?.id,
      updatedBy: props?.userData?.id,
      LicenseDetails: {
        DetailsofAppliedLand: {
          ...data,
        },
      },
      RequestInfo: {
        apiId: "Rainmaker",
        ver: "v1",
        ts: 0,
        action: "_search",
        did: "",
        key: "",
        msgId: "090909",
        requesterId: "",
        authToken: token,
        userInfo: props?.userData,
      },
    };

    try {
      const Resp = await axios.post("/tl-services/new/_create", postDistrict);
      console.log("MMM", Resp?.data?.NewServiceInfo?.[0]?.id);
      props.Step4Continue();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSubmitDataLabel = async () => {
    try {
      const Resp = await axios.get(`http://103.166.62.118:8443/land-services/new/licenses/_get?id=${props.getId}`).then((response) => {
        return response;
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getSubmitDataLabel();
  }, []);

  return (
    <div>
      {loader && <Spinner />}
      <form onSubmit={handleSubmit(AppliedDetailFormSubmitHandler)}>
        <Card style={{ width: "126%", border: "5px solid #1266af" }}>
          <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>New License </h4>
          <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "52px" }}>
            <Form.Group className="justify-content-center" controlId="formBasicEmail">
              <Row className="ml-auto" style={{ marginBottom: 5 }}>
                <Col col-12>
                  <h4>
                    1. DGPS points <span className="text-primary"> (Click here for instructions to capture DGPS points)</span>
                  </h4>
                  <br></br>
                  <div className="px-2">
                    {/* <div>
                    (i)Add point 1 &nbsp;
                    <div className="row ">
                      <div className="col col-4">
                        <label>X:Longitude</label>
                        <input type="number" name="XLongitude" className="form-control" {...register("dgpsLongitude")} />
                      </div>
                      <div className="col col-4">
                        <label>Y:Latitude</label>
                        <input type="number" name="YLatitude" className="form-control" {...register("dgpsLatitude")} />
                      </div>
                    </div>
                  </div> */}
                    {fields?.map((item, index) => (
                      <div key={item?.id}>
                        <span>Add point {index + 1} &nbsp;</span>
                        <div className="row ">
                          <div className="col col-4">
                            <label>X:Longitude</label>
                            <input type="number" className="form-control" {...register(`dgps.${index}.XLongitude`)} />
                          </div>
                          <div className="col col-4">
                            <label>Y:Latitude</label>
                            <input type="number" className="form-control" {...register(`dgps.${index}.YLatitude`)} />
                          </div>
                        </div>
                        {index > 3 && (
                          <button type="button" style={{ float: "right" }} className="btn btn-primary" onClick={() => remove(index)}>
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      style={{ float: "right", marginRight: 15 }}
                      className="btn btn-primary"
                      onClick={() => append({ XLongitude: "", YLatitude: "" })}
                    >
                      Add
                    </button>
                  </div>
                  {/* <div className="px-2">
                  <div>
                    (ii)Add point 2 &nbsp;
                    <div className="row ">
                      <div className="col col-4">
                        <label>X:Longitude</label>
                        <input type="number" name="XLongitude" className="form-control" {...register("dgLongitude")} />
                      </div>
                      <div className="col col-4">
                        <label>Y:Latitude</label>
                        <input type="number" name="YLatitude" className="form-control" {...register("dgLatitude")} />
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="px-2">
                  <div>
                    (iii)Add point 3 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="row ">
                      <div className="col col-4">
                        <label>X:Longitude</label>
                        <input type="number" name="XLongitude" className="form-control" {...register("dgpLongitude")} />
                      </div>
                      <div className="col col-4">
                        <label>Y:Latitude</label>
                        <input type="number" name="YLatitude" className="form-control" {...register("dgpLatitude")} />
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="px-2">
                    <div>
                      (iv)Add point 4 &nbsp;
                      <div className="row ">
                      <div className="col col-4">
                        <label>X:Longitude</label>
                        <input type="number" name="XLongitude" className="form-control" {...register("dsLongitude")} />
                      </div>
                      <div className="col col-4">
                        <label>Y:Latitude</label>
                        <input type="number" name="YLatitude" className="form-control" {...register("dgLatitude")} />
                      </div>
                    </div>
                      <button type="button" style={{ float: "right" }} className="btn btn-primary" onClick={() => setNoOfRows(noOfRows - 1)}>
                      Delete
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      style={{ float: "right", marginRight: 15 }}
                      className="btn btn-primary"
                      onClick={() => setNoOfRows(noOfRows + 1)}
                    >
                      Add
                    </button>
                    </div>
                    {[...Array(noOfRows)].map((elementInArray, index) => {
                    return (
                      <div>
                        <div>Add point {index + 1} &nbsp;</div>
                        <div className="row ">
                          <div className="col col-4">
                            <label>X:Longiude</label>
                            <input type="number" name="XLongitude" className="form-control" />
                          </div>
                          <div className="col col-4">
                            <label>Y:Latitude</label>
                            <input type="number" name="YLatitude" className="form-control" />
                          </div>
                        </div>
                      </div>
                    );
                  })} */}

                  <br></br>
                  <hr />
                  <br></br>
                  <div>
                    <h5>
                      2.Details of Plots&nbsp;&nbsp;
                      <label htmlFor="regularOptions">
                        &nbsp;&nbsp;
                        <input {...register("regularOptions")} type="radio" value="regular" id="regularOptions" />
                        &nbsp;&nbsp; Regular &nbsp;&nbsp;
                      </label>
                      <label htmlFor="regularOptions">
                        <input {...register("regularOptions")} type="radio" value="Irregular" id="regularOptions" />
                        &nbsp;&nbsp; Irregular &nbsp;&nbsp;
                      </label>
                    </h5>
                  </div>
                  {watch("regularOptions") === "regular" && (
                    <div className="table table-bordered table-responsive">
                      <thead>
                        <tr>
                          <td>Type of plots</td>
                          <td>Plot No.</td>
                          <td>
                            Length in mtr <CalculateIcon color="primary" />
                          </td>
                          <td>
                            Width in mtr <CalculateIcon color="primary" />
                          </td>
                          <td>
                            Area in sqmtr <CalculateIcon color="primary" />
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">Residential</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">Gen</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("resplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("reslengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("reswidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("resareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">NPNL</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("npnlplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("npnllengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("npnlwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("npnlareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">EWS</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("ewsplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("ewslengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("ewswidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("ewsareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">Commercial</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("complotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("comlengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("comwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("comareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">Community Sites</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("siteplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("sitelengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("sitewidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("siteareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">Parks</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("parkplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("parklengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("parkwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("parkareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2" x>
                                Public Utilities
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">STP</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("publicplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("publiclengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("publicwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("publicareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">ETP</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("etpplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("etplengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("etpwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("etpareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">WTP</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("wtpplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("wtplengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("wtpwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("wtpareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">UGT</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("ugtplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("ugtlengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("ugtwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("ugtareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">Milk Booth</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("milkboothplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("milkboothlengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("milkboothwidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("milkboothareasq")} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2">
                              <p className="mb-2">GSS</p>
                            </div>
                          </td>
                          <td component="th" scope="row">
                            <input type="text" className="form-control" {...register("gssplotno")} />
                          </td>

                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("gsslengthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("gssWidthmtr")} />
                          </td>
                          <td align="right">
                            {" "}
                            <input type="number" className="form-control" {...register("gssareasq")} />
                          </td>
                        </tr>
                      </tbody>
                    </div>
                  )}
                  {watch("regularOptions") === "Irregular" && (
                    <div>
                      <div className="table table-bordered table-responsive ">
                        <thead>
                          <tr>
                            <td>Details of Plot</td>
                            <td>
                              Dimensions (in mtrs) <CalculateIcon color="primary" />
                            </td>
                            <td>Enter Area</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">Residential</p>
                              </div>
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("resDimension")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("resEnteredArea")} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">Commercial</p>
                              </div>
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("comDimension")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("comEnteredArea")} />
                            </td>
                          </tr>
                        </tbody>
                      </div>
                      <h5>Area Under</h5>
                      <div className="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <td>Detail of plots</td>
                            <td> Plot No.</td>
                            <td>
                              Length (in mtrs) <CalculateIcon color="primary" />
                            </td>
                            <td>
                              Dimension (in mtrs) <CalculateIcon color="primary" />
                            </td>
                            <td>Enter Area</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">Sectoral Plan Road</p>
                              </div>
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("secPlanPlot")} />{" "}
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("secPlanLength")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("secPlanDim")} />{" "}
                            </td>
                            <td component="th" scope="row">
                              <input type="text" className="form-control" {...register("secPlanEntered")} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">Green Belt</p>
                              </div>
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("greenBeltPlot")} />
                            </td>
                            <td component="th" scope="row">
                              <input type="text" className="form-control" {...register("greenBeltLength")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("greenBeltDim ")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("greenBeltEntered")} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">24/18 mtr wide internal circulation Plan road</p>
                              </div>
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("internalPlot ")} />
                            </td>
                            <td component="th" scope="row">
                              <input type="text" className="form-control" {...register("internalLength")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("internalDim")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("internalEntered")} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">Other Roads</p>
                              </div>
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("otherPlot")} />
                            </td>
                            <td component="th" scope="row">
                              <input type="text" className="form-control" {...register("otherLength")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("otherDim")} />
                            </td>
                            <td align="right">
                              {" "}
                              <input type="number" className="form-control" {...register("otherEntered")} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="px-2">
                                <p className="mb-2">Undetermined use(UD)</p>
                              </div>
                            </td>
                            <td align="right">
                              <input type="number" className="form-control" {...register("undeterminedPlot")} />
                            </td>
                            <td component="th" scope="row">
                              <input type="number" className="form-control" {...register("undeterminedLength")} />
                            </td>
                            <td align="right">
                              <input type="number" className="form-control" {...register("undeterminedDim")} />
                            </td>
                            <td align="right">
                              <input type="number" className="form-control" {...register("undeterminedEntered")} />
                            </td>
                          </tr>
                        </tbody>
                      </div>
                    </div>
                  )}
                  <div>{Purpose === "DDJAY_APHP" && <DDJAYForm />}</div>
                  <div>{Purpose === "RPL" && <ResidentialPlottedForm />}</div>
                  <div>{Purpose === "IPL" && <IndustrialPlottedForm />}</div>
                  <h5 className="text-black">NILP </h5>
                  <br></br>
                  <div className="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        <td>S.No.</td>
                        <td>NLP Details</td>
                        <td>Yes/No</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1. </td>
                        <td>
                          {" "}
                          Whether you want to surrender the 10% area of license colony to Govt. the instead of providing 10% under EWS and NPNL plots{" "}
                        </td>
                        <td style={{ display: "flex", gap: "8px" }} component="th" scope="row">
                          <label htmlFor="surrender">
                            <input {...register("surrender")} type="radio" value="Y" id="surrender" />
                            Yes
                          </label>
                          <label htmlFor="surrender">
                            <input {...register("surrender")} type="radio" value="N" id="surrender" />
                            No
                          </label>
                          {watch("surrender") === "Y" && (
                            <div className="row ">
                              <div className="col col-12">
                                <label>Area in Acres </label>

                                <input type="text" className="form-control" {...register("surrenderArea")} />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>2. </td>
                        <td>Whether any pocket proposed to be transferred less than 1 acre </td>
                        <td style={{ display: "flex", gap: "8px" }} component="th" scope="row">
                          <label htmlFor="pocketProposed">
                            <input {...register("pocketProposed")} type="radio" value="Y" id="pocketProposed" />
                            Yes
                          </label>
                          <label htmlFor="pocketProposed">
                            <input {...register("pocketProposed")} type="radio" value="N" id="pocketProposed" />
                            No
                          </label>
                          {watch("pocketProposed") === "Y" && (
                            <div className="row ">
                              <div className="col col-6">
                                <label>
                                  Dimension (in mtr)&nbsp;&nbsp;
                                  <CalculateIcon color="primary" />
                                </label>
                                <input type="text" className="form-control" {...register("pocketDim")} />
                              </div>
                              <div className="col col-6">
                                <label> Enter Area </label>
                                <input type="text" className="form-control" {...register("pocketAreaEnter")} />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>3. </td>
                        <td>Whether you want to deposit an amount @ of 3 times of collector rate instead of the surrender 10% land to Govt. </td>
                        <td style={{ display: "flex", gap: "8px" }} component="th" scope="row">
                          <label htmlFor="deposit">
                            <input {...register("deposit")} type="radio" value="Y" id="deposit" />
                            Yes
                          </label>
                          <label htmlFor="deposit">
                            <input {...register("deposit")} type="radio" value="N" id="deposit" />
                            No
                          </label>
                          {watch("deposit") === "Y" && (
                            <div className="row ">
                              <div className="col col-12">
                                <label>
                                  Area in Acres &nbsp;&nbsp;
                                  <CalculateIcon color="primary" />
                                </label>
                                <input type="text" className="form-control" {...register("depositArea")} />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>4. </td>
                        <td>Whether the surrendered area is having a minimum of 18 mtr independent access </td>
                        <td style={{ display: "flex", gap: "8px" }} component="th" scope="row">
                          <label htmlFor="surrendered">
                            <input {...register("surrendered")} type="radio" value="Y" id="surrendered" />
                            Yes
                          </label>
                          <label htmlFor="surrendered">
                            <input {...register("surrendered")} type="radio" value="N" id="surrendered" />
                            No
                          </label>
                          {watch("surrendered") === "Y" && (
                            <div className="row ">
                              <div className="col col-12">
                                <label>
                                  Dimension(in mtr) &nbsp;&nbsp;
                                  <CalculateIcon color="primary" />
                                </label>

                                <input type="text" className="form-control" {...register("surrenderedDim")} />
                              </div>
                              <div className="col col-12">
                                <label>Enter Area</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </div>
                  <hr />
                  <br></br>
                  <h5>Mandatory Documents</h5>
                  <br></br>
                  <div className="row">
                    <div className="col col-3">
                      <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top" title="Upload Document">
                        Demarcation plan. &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>
                      <input type="file" className="form-control" />
                    </div>
                    <div className="col col-3">
                      <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top" title="Upload Document">
                        Democratic Plan. &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>
                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top" title="Upload Document">
                        Sectoral Plan &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>
                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top" title="Upload Document">
                        Upload Layout Plan &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>
                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy of plans showing cross sections of proposed roads indicating, in particular, the width of proposed carriage ways cycle tracks and footpaths etc"
                      >
                        Plans showing cross sections &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>
                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy of plans indicating, in addition, the position of sewers, stormwater channels, water supply and any other public health services."
                      >
                        Plans indicating position of public health services. &nbsp;&nbsp;
                        <ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy of detailed specifications and designs of road works and estimated costs thereof"
                      >
                        Specifications and designs of road works &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>
                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy of detailed specifications and designs of sewerage, storm, water and water supply works and estimated costs thereof"
                      >
                        Designs of sewerage, storm and water supply &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy of detailed specifications and designs for disposal and treatment of storm and sullage water and estimated costs of works."
                      >
                        Designs for disposal and treatment of storm &nbsp;&nbsp;
                        <ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Whether intimated each of the allottees through registered post regarding the proposed changes in the layout plan: - If yes selected upload"
                      >
                        Undertaking that no change &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Whether you hosted the existing approved layout plan & in-principle approved layout on the website of your company/organization Yes/No if yes upload"
                      >
                        Whether you hosted the existing approved layout plan &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top" title="Upload Document">
                        Report any objection from any of the allottees &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Consent of RERA if there is any change in the phasing ."
                      >
                        Consent of RERA &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Undertaking that no change has been made in the phasing "
                      >
                        Undertaking &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy of detailed specifications and designs for electric supply including street lighting"
                      >
                        Detailed specifications and designs for electric supply &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                    <div className="col col-3">
                      <h6
                        style={{ display: "flex" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Explanatory note regarding the salient feature of the proposed colony."
                      >
                        Salient feature of the proposed colony &nbsp;&nbsp;<ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                      </h6>

                      <input type="file" className="form-control" onChange1={(e) => setFile({ file: e.target.files[0] })}></input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 text-left">
                      <div id="btnClear" class="btn btn-primary btn-md center-block" onClick={() => props?.step4Back()}>
                        Back
                      </div>
                    </div>
                    <div class="col-sm-12 text-right">
                      <button id="btnSearch" class="btn btn-primary btn-md center-block">
                        Save and Continue
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form.Group>
          </Card>
        </Card>
      </form>
    </div>
  );
};

export default AppliedDetailForm;
