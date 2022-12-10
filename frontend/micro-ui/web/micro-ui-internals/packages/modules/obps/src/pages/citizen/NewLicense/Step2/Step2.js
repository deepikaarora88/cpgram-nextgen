import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import WorkingTable from "../../../../components/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { VALIDATION_SCHEMA } from "../../../../utils/schema/step2";
import ReactMultiSelect from "../../../../../../../react-components/src/atoms/ReactMultiSelect";
import Spinner from "../../../../components/Loader";
import { getDocShareholding } from "../docView/docView.help";

const ApllicantPuropseForm = (props) => {
  const resetFields = {
    tehsil: "",
    revenueEstate: "",
    rectangleNo: "",
    kanal: "",
    marla: "",
    sarsai: "",
    bigha: "",
    biswa: "",
    biswansi: "",
    agreementIrrevocialble: "",
    agreementValidFrom: "",
    agreementValidTill: "",
    authSignature: "",
    collaboration: "",
    developerCompany: "",
    landOwner: "",
    nameAuthSign: "",
    registeringAuthority: "",
  };
  const datapost = {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: "v1",
      ts: 0,
      action: "_search",
      did: "",
      key: "",
      msgId: "090909",
      requesterId: "",
      authToken: "",
    },
  };
  const columns = [
    {
      key: "tehsil",
      title: "Tehsil",
      dataIndex: "tehsil",
    },
    {
      key: "revenueEstate",
      title: "Revenue Estate",
      dataIndex: "revenueEstate",
    },
    {
      key: "hadbastNo",
      title: "Hadbast No.",
      dataIndex: "hadbastNo",
    },
    {
      key: "rectangleNo",
      title: "Rectangle No.",
      dataIndex: "rectangleNo",
    },

    {
      key: "consolidationType",
      title: "Consolidation Type",
      dataIndex: "consolidationType",
    },
    { key: "kanal", title: "Kanal", dataIndex: "kanal" },
    {
      key: "kanal",
      title: "Bigha",
      dataIndex: "bigha",
    },
    {
      key: "marla",
      title: "Marla",
      dataIndex: "marla",
    },
    {
      key: "biswa",
      title: "Biswa",
      dataIndex: "biswa",
    },
    {
      key: "sarsai",
      title: "Sarsai",
      dataIndex: "sarsai",
    },
    {
      key: "biswansi",
      title: "Biswansi",
      dataIndex: "biswansi",
    },
    {
      key: "landOwner",
      title: "Name of Land Owner",
      dataIndex: "landOwner",
      render: (data) => data?.split(" ")?.slice(0, 2)?.join(" "),
    },
    {
      key: "agreementIrrevocialble",
      title: "Whether collaboration agreement irrevocable (Yes/No)",
      dataIndex: "agreementIrrevocialble",
    },
    {
      key: "agreementValidFrom",
      title: "Date of registering collaboration agreement",
      dataIndex: "agreementValidFrom",
    },
    {
      key: "agreementValidTill",
      title: "Date of validity of collaboration agreement",
      dataIndex: "agreementValidTill",
    },
    {
      key: "authSignature",
      title: "Name of authorized signatory on behalf of land owner(s)",
      dataIndex: "authSignature",
    },
    {
      key: "collaboration",
      title: "Collaboration agreement Owner",
      dataIndex: "collaboration",
    },
    {
      key: "developerCompany",
      title: "Name of the developer company",
      dataIndex: "developerCompany",
    },
    {
      key: "nameAuthSign",
      title: " Name of authorized signatory",
      dataIndex: "nameAuthSign",
    },
    {
      key: "registeringAuthority",
      title: "Registring Authority",
      dataIndex: "registeringAuthority",
    },
    {
      // key: "action",
      title: "Action",
      dataIndex: "",
      render: (data) => (
        <div>
          <h6
            onClick={() => {
              setmodal(true);
              setSpecificTableData(data);
            }}
          >
            <EditIcon color="primary" />

            <DeleteIcon color="error" />
          </h6>
        </div>
      ),
    },
  ];

  const [district, setDistrict] = useState("");
  const [modalData, setModalData] = useState([]);
  const [specificTableData, setSpecificTableData] = useState(null);
  const [districtDataLabels, setDistrictDataLabels] = useState({ data: [], isLoading: true });
  const [tehsilDataLabels, setTehsilDataLabels] = useState({ data: [], isLoading: true });
  const [revenueDataLabels, setRevenueDataLabels] = useState({ data: [], isLoading: true });
  const [mustilDataLabels, setMustilDataLabels] = useState({ data: [], isLoading: true });
  const [modal, setmodal] = useState(false);
  const [tehsilCode, setTehsilCode] = useState(null);
  const [purposeOptions, setPurposeOptions] = useState({ data: [], isLoading: true });
  const [potentialOptons, setPotentialOptions] = useState({ data: [], isLoading: true });
  const [docId, setDocId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (specificTableData) {
      setValue("tehsil", specificTableData?.tehsil);
      setValue("revenueEstate", specificTableData?.revenueEstate);
      setValue("rectangleNo", specificTableData?.rectangleNo);
      setValue("kanal", specificTableData?.kanal);
      setValue("marla", specificTableData?.marla);
      setValue("sarsai", specificTableData?.sarsai);
      setValue("bigha", specificTableData?.bigha);
      setValue("biswansi", specificTableData?.biswansi);
      setValue("biswa", specificTableData?.biswa);
      setValue("landOwner", specificTableData?.landOwner);
    }
  }, [specificTableData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(VALIDATION_SCHEMA),
    defaultValues: {
      consolidationType: "consolidated",
    },
    shouldFocusError: true,
  });

  const stateId = Digit.ULBService.getStateId();
  const { data: PurposeType } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["Purpose"]);

  const { data: PotentialType } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["PotentialZone"]);

  useEffect(() => {
    const purpose = PurposeType?.["common-masters"]?.Purpose?.map(function (data) {
      return { value: data?.purposeCode, label: data?.name };
    });
    setPurposeOptions({ data: purpose, isLoading: false });
  }, [PurposeType]);

  useEffect(() => {
    const potential = PotentialType?.["common-masters"]?.PotentialZone?.map(function (data) {
      return { value: data?.code, label: data?.zone };
    });
    setPotentialOptions({ data: potential, isLoading: false });
  }, [PotentialType]);

  const DistrictApiCall = async () => {
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_district", datapost);
      const distData = Resp?.data?.map((el) => {
        return { label: el?.districtName, id: el?.districtCode, value: el?.districtCode };
      });
      setDistrictDataLabels({ data: distData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getTehslidata = async (data) => {
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_tehsil?dCode=" + data, datapost, {});
      const tehsilData = Resp?.data?.map((el) => {
        return { label: el?.name, id: el?.code, value: el?.code };
      });
      setTehsilDataLabels({ data: tehsilData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getRevenuStateData = async (code) => {
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_village?" + "dCode=" + district + "&" + "tCode=" + code, datapost, {});
      const revenData = Resp?.data?.map((el) => {
        return { label: el?.name, id: el?.khewats, value: el?.code, khewats: el?.khewats, code: el?.code };
      });
      setRevenueDataLabels({ data: revenData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getMustilData = async (code) => {
    try {
      const Resp = await axios.post(
        "/egov-mdms-service/v1/_must?" + "dCode=" + district + "&" + "tCode=" + tehsilCode + "&NVCode=" + code,
        datapost,
        {}
      );
      const mustData = Resp?.data?.must?.map((el, i) => {
        return { label: el, id: i, value: el };
      });
      setMustilDataLabels({ data: mustData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getLandOwnerStateData = async (text) => {
    setLoader(true);
    try {
      const Resp = await axios.post(
        "/egov-mdms-service/v1/_owner?" +
          "dCode=" +
          district +
          "&" +
          "tCode=" +
          tehsilCode +
          "&NVCode=" +
          watch("revenueEstate")?.value +
          "&khewat=" +
          text,
        datapost,
        {}
      );
      setLoader(false);
      setValue("landOwner", Resp?.data?.[0]?.name);
    } catch (error) {
      setLoader(false);
      return error;
    }
  };

  useEffect(() => {
    DistrictApiCall();
  }, []);

  const ApplicantPurposeModalData = (modalData) => {
    modalData["tehsil"] = modalData?.tehsil?.value;
    modalData["revenueEstate"] = modalData?.revenueEstate?.value;
    modalData["rectangleNo"] = modalData?.rectangleNo?.value;
    modalData["registeringAuthorityDoc"] = docId;
    delete modalData?.district;
    delete modalData?.potential;
    delete modalData?.purpose;
    delete modalData?.state;

    if (modalData?.consolidationType === "consolidated") {
      delete modalData?.bigha;
      delete modalData?.biswa;
      delete modalData?.biswansi;
    }
    if (modalData?.consolidationType === "non-consolidated") {
      delete modalData?.marla;
      delete modalData?.kanal;
      delete modalData?.sarsai;
    }
    modalData["rowid"] = "1";

    setModalData((prev) => [...prev, modalData]);
    setmodal(false);
    // reset(resetFields);
  };

  const PurposeFormSubmitHandler = async (data) => {
    data["purpose"] = data?.purpose?.value;
    data["potential"] = data?.potential?.value;
    data["district"] = watch("district")?.value;
    data["state"] = "Haryana";
    delete data?.tehsil;
    delete data?.revenueEstate;
    delete data?.rectangleNo;
    delete data?.kanal;
    delete data?.marla;
    delete data?.sarsai;
    delete data?.bigha;
    delete data?.biswa;
    delete data?.biswansi;
    delete data?.agreementIrrevocialble;
    delete data?.agreementValidFrom;
    delete data?.agreementValidTill;
    delete data?.authSignature;
    delete data?.collaboration;
    delete data?.developerCompany;
    delete data?.landOwner;
    delete data?.nameAuthSign;
    delete data?.registeringAuthority;
    delete data?.registeringAuthorityDoc;
    delete data?.consolidationType;
    delete data?.khewats;
    delete data?.rowid;

    const token = window?.localStorage?.getItem("token");
    if (!modalData?.length) alert("Please enter atleast one record");
    else {
      const postDistrict = {
        pageName: "ApplicantPurpose",
        ApplicationStatus: "DRAFT",
        id: props.getId,
        createdBy: props?.userData?.id,
        updatedBy: props?.userData?.id,
        LicenseDetails: {
          ApplicantPurpose: {
            ...data,
            AppliedLandDetails: modalData,
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
      setLoader(true);
      try {
        const Resp = await axios.post("/tl-services/new/_create", postDistrict);
        setLoader(false);
        props.Step2Continue(Resp?.data?.LicenseServiceResponseInfo?.[0]?.newServiceInfoData?.[0]);
      } catch (error) {
        setLoader(false);
        return error;
      }
    }
  };

  useEffect(() => {
    if (props?.getLicData?.ApplicantPurpose) {
      const data = purposeOptions?.data?.filter((item) => item?.value === props?.getLicData?.ApplicantPurpose?.purpose);
      const potientialData = potentialOptons?.data?.filter((item) => item?.value === props?.getLicData?.ApplicantPurpose?.potential);
      const districtData = districtDataLabels?.data?.filter((item) => item?.value === props?.getLicData?.ApplicantPurpose?.district);
      setValue("purpose", { label: data?.[0]?.label, value: data?.[0]?.value });
      setValue("potential", { label: potientialData?.[0]?.label, value: potientialData?.[0]?.value });
      setValue("district", { label: districtData?.[0]?.label, value: districtData?.[0]?.value });
    }
  }, [props?.getLicData, purposeOptions, potentialOptons, districtDataLabels]);

  const handleChangePurpose = (data) => {
    console.log("data", data);
    const purposeSelected = data?.value;
    window?.localStorage.setItem("purpose", purposeSelected);
  };
  const handleChangePotential = (data) => {
    const potentialSelected = data?.value;
    window?.localStorage.setItem("potential", JSON.stringify(potentialSelected));
  };
  const [fileStoreId, setFileStoreId] = useState({});
  const getDocumentData = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenantId", "hr");
    formData.append("module", "property-upload");
    formData.append("tag", "tag-property");
    setLoader(true);
    try {
      const Resp = await axios.post("/filestore/v1/files", formData, {});
      setValue(fieldName, Resp?.data?.files?.[0]?.fileStoreId);
      setFileStoreId({ ...fileStoreId, [fieldName]: Resp?.data?.files?.[0]?.fileStoreId });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      return error;
    }
  };

  let delay;

  useEffect(() => {
    delay = setTimeout(() => {
      if (watch("khewats")) getLandOwnerStateData(watch("khewats"));
    }, 500);
    return () => clearTimeout(delay);
  }, [watch("khewats")]);

  return (
    <div>
      {loader && <Spinner />}
      <form onSubmit={handleSubmit(PurposeFormSubmitHandler)}>
        <Card style={{ width: "126%", border: "5px solid #1266af" }}>
          <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>New Licence </h4>
          <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "52px" }}>
            <Form.Group>
              <Row className="ml-auto" style={{ marginBottom: 5 }}>
                <Col md={4} xxl lg="3">
                  <div>
                    <Form.Label>
                      <h2>
                        Puropse Of Licence<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>

                  <ReactMultiSelect
                    control={control}
                    name="purpose"
                    onChange={handleChangePurpose}
                    placeholder="Purpose"
                    data={purposeOptions?.data}
                    labels="Purpose"
                    loading={purposeOptions?.isLoading}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.purpose?.value && errors?.purpose?.value?.message}
                  </h3>
                </Col>

                <Col md={4} xxl lg="3">
                  <div>
                    <Form.Label>
                      <h2>
                        Potential Zone<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>
                  <ReactMultiSelect
                    control={control}
                    name="potential"
                    placeholder="Potential"
                    data={potentialOptons?.data}
                    labels="Potential"
                    onChange={handleChangePotential}
                    loading={potentialOptons?.isLoading}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.potential?.value && errors?.potential?.value?.message}
                  </h3>
                </Col>

                <Col md={4} xxl lg="3">
                  <div>
                    <Form.Label>
                      <h2>
                        District<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>
                  <ReactMultiSelect
                    control={control}
                    name="district"
                    placeholder="District"
                    data={districtDataLabels?.data}
                    labels="District"
                    loading={districtDataLabels?.isLoading}
                    onChange={(e) => {
                      getTehslidata(e.value);
                      setDistrict(e.value);
                    }}
                  />

                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.district?.value && errors?.district?.value?.message}
                  </h3>
                </Col>
                <Col md={4} xxl lg="3">
                  <div>
                    <Form.Label>
                      <h2>
                        State<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>

                  <input type="text" className="form-control" placeholder="N/A" {...register("state")} disabled defaultValue="Haryana" />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.state && errors?.state?.message}
                  </h3>
                </Col>
              </Row>

              <div className="ml-auto" style={{ marginTop: 20 }}>
                <h5>
                  <b>Details of applied land</b>
                </h5>
                <br></br>
                <p>
                  Note: The term “Collaboration agreement" shall include all Development agreements/ Joint Venture agreements/ Joint Development
                  agreements/ Memorandum of Understanding etc. and similar agreements registered with competent authority.
                </p>
                <br></br>
                <p>
                  <h3>(i) Khasra-wise information to be provided in the following format</h3>
                </p>
                <br></br>
              </div>
              <div className="ml-auto">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    if (!getValues()?.district) alert("Please Select District First To Proceed Further");
                    else setmodal(true);
                  }}
                >
                  Enter Details
                </Button>
              </div>
              <br></br>

              <div className="applt" style={{ overflow: "auto" }}>
                <WorkingTable
                  columns={columns}
                  data={props?.getLicData?.ApplicantPurpose?.AppliedLandDetails ? props?.getLicData?.ApplicantPurpose?.AppliedLandDetails : modalData}
                />
              </div>
            </Form.Group>

            <div class="row">
              <div class="col-sm-12 text-left">
                <div id="btnClear" class="btn btn-primary btn-md center-block" onClick={() => props.Step2Back()}>
                  Back
                </div>
              </div>
              <div class="col-sm-12 text-right">
                <button type="submit" id="btnSearch" class="btn btn-primary btn-md center-block">
                  Save and Continue
                </button>
              </div>
            </div>
          </Card>
        </Card>
      </form>

      <Modal
        size="xl"
        isOpen={modal}
        toggle={() => {
          // reset(resetFields);
          setmodal(!modal);
        }}
      >
        <ModalHeader
          toggle={() => {
            setmodal(!modal);
            // reset(resetFields);
          }}
        ></ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(ApplicantPurposeModalData)}>
            <Row className="ml-auto mb-3">
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Tehsil <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  {...register("tehsil")}
                  data={tehsilDataLabels?.data}
                  labels="Tehsil"
                  loading={tehsilDataLabels?.isLoading}
                  onChange={(e) => {
                    getRevenuStateData(e.value);
                    setTehsilCode(e.value);
                  }}
                />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.tehsil && errors?.tehsil?.message}
                </h3>
              </Col>
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Name of Revenue Estate <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  {...register("revenueEstate")}
                  data={revenueDataLabels?.data}
                  labels="Revenue Estate"
                  loading={revenueDataLabels?.isLoading}
                  onChange={(e) => getMustilData(e.code)}
                />

                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.revenueEstate && errors?.revenueEstate?.message}
                </h3>
              </Col>
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Hadbast No. <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <input type="number" className="form-control" placeholder="" {...register("hadbastNo")} />
                {/* <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.revenueEstate && errors?.revenueEstate?.message}
                </h3> */}
              </Col>
            </Row>

            <Row className="ml-auto mb-3">
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Rectangle No./Mustil <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  data={mustilDataLabels?.data}
                  loading={mustilDataLabels?.isLoading}
                  labels="Rectangle No."
                  {...register("rectangleNo")}
                />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.mustil && errors?.mustil?.message}
                </h3>
              </Col>

              <Col md={4} xxl lg="4">
                <div>
                  <label>
                    <h2>
                      Enter Khewat <span style={{ color: "red" }}>*</span>
                    </h2>
                  </label>
                </div>
                <input type="text" className="form-control" placeholder="Enter Khewat" {...register("khewats")} />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.khewats?.value && errors?.khewats?.value?.message}
                </h3>
              </Col>
              <Col md={4} xxl lg="4">
                <div>
                  <label>
                    <h2>
                      Name of Land Owner<span style={{ color: "red" }}>*</span>
                    </h2>
                  </label>
                </div>
                <Form.Control type="text" className="form-control" placeholder="" {...register("landOwner")} />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.landOwner && errors?.landOwner?.message}
                </h3>
              </Col>
            </Row>
            <br></br>
            <Row className="ml-auto mb-3">
              <Col md={4} xxl lg="12">
                <div>
                  <h2>
                    Consolidation Type<span style={{ color: "red" }}>*</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <label htmlFor="consolidated">
                      <input
                        {...register("consolidationType")}
                        type="radio"
                        value="consolidated"
                        defaultChecked={true}
                        defaultValue="consolidated"
                        id="consolidated"
                      />
                      &nbsp; Consolidated &nbsp;&nbsp;
                    </label>
                    <label htmlFor="non-consolidated">
                      <input {...register("consolidationType")} type="radio" value="non-consolidated" id="non-consolidated" />
                      &nbsp; Non-Consolidated &nbsp;&nbsp;
                    </label>
                  </h2>
                </div>

                {watch("consolidationType") == "consolidated" && (
                  <table className="table table-bordered" style={{ backgroundColor: "rgb(251 251 253))" }}>
                    <thead>
                      <tr>
                        <th>
                          <h2>
                            Kanal <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Marla <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Sarsai <span style={{ color: "red" }}>*</span>
                          </h2>
                          &nbsp;&nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" className="form-control" {...register("kanal")} id="kanal" minLength={1} maxLength={20} />
                          <label htmlFor="sum">Total: {watch("kanal") * 0.125}</label>&nbsp;&nbsp;
                          <h3 className="error-message" style={{ color: "red" }}>
                            {errors?.kanal?.value && errors?.kanal?.value?.message}
                          </h3>
                        </td>
                        <td>
                          <input type="text" className="form-control" {...register("marla")} id="marla" />
                          <label htmlFor="summarla">Total: {watch("marla") * 0.0062}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="text" className="form-control" {...register("sarsai")} id="sarsai" />
                          <label htmlFor="sumsarsai">Total: {watch("sarsai") * 0.00069}</label>&nbsp;&nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {watch("consolidationType") == "non-consolidated" && (
                  <table className="table table-bordered" style={{ backgroundColor: "rgb(251 251 253))" }}>
                    <thead>
                      <tr>
                        <th>
                          <h2>
                            Bigha <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Biswa <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Biswansi <span style={{ color: "red" }}>*</span>
                          </h2>
                          &nbsp;&nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" className="form-control" {...register("bigha")} id="bigha" />
                          <label htmlFor="sumBigha">Total: {watch("bigha") * 0.33}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="text" className="form-control" {...register("biswa")} id="biswa" />
                          <label htmlFor="sumBiswa">Total: {watch("biswa") * 0.0309}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="text" className="form-control" {...register("biswansi")} id="biswansi" />
                          <label htmlFor="sumBiswansi">Total: {watch("biswansi") * 0.619}</label>&nbsp;&nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </Col>
            </Row>
            <Row className="ml-auto mb-3">
              <div className="col col-12">
                <h2>
                  Collaboration agreement Owner<span style={{ color: "red" }}>*</span>&nbsp;&nbsp;
                  <label htmlFor="collaboration">
                    <input {...register("collaboration")} type="radio" value="Y" id="yes" />
                    &nbsp;&nbsp; Yes &nbsp;&nbsp;
                  </label>
                  <label htmlFor="collaboration">
                    <input {...register("collaboration")} type="radio" value="N" id="no" />
                    &nbsp;&nbsp; No &nbsp;&nbsp;
                  </label>
                </h2>
                {watch("collaboration") === "Y" && (
                  <div>
                    <div className="row ">
                      <div className="col col-4">
                        <label>
                          <h2
                            data-toggle="tooltip"
                            data-placement="top"
                            title=" Name of the developer company / Firm/ LLP etc. with whom collaboration agreement entered."
                          >
                            Name of the developer company .<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="text" className="form-control" placeholder="" {...register("developerCompany")} />
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2>
                            Date of registering collaboration agreement<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="date" className="form-control" placeholder="" {...register("agreementValidFrom")} />
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2>
                            Date of validity of collaboration agreement<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="date" className="form-control" placeholder="" {...register("validitydate")} />
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row ">
                      <div className="col col-4">
                        <h2>
                          Whether collaboration agreement irrevocable (Yes/No)<span style={{ color: "red" }}>*</span>
                        </h2>
                        <label htmlFor="agreementIrrevocialble">
                          <input {...register("agreementIrrevocialble")} type="radio" value="N" id="agreementIrrevocialble" />
                          &nbsp;&nbsp; Yes &nbsp;&nbsp;
                        </label>
                        <label htmlFor="agreementIrrevocialble">
                          <input {...register("agreementIrrevocialble")} type="radio" value="Y" id="agreementIrrevocialble" />
                          &nbsp;&nbsp; No &nbsp;&nbsp;
                        </label>
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2>
                            Name of authorized signatory on behalf of land owner(s)<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="text" className="form-control" placeholder="" {...register("authSignature")} />
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2
                            data-toggle="tooltip"
                            data-placement="top"
                            title="  Name of authorized signatory on behalf of developer to sign Collaboration agreement."
                          >
                            Name of authorized signatory on behalf of developer.<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="text" className="form-control" placeholder="" {...register("nameAuthSign")} />
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row ">
                      <div className="col col-4">
                        <label>
                          <h2>
                            Registering Authority<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="text" className="form-control" placeholder="" {...register("registeringAuthority")} />
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2 data-toggle="tooltip" data-placement="top" title="Upload Document" style={{ marginTop: "-4px" }}>
                            Registering Authority document <span style={{ color: "red" }}>*</span>
                            <ArrowCircleUpIcon color="primary"></ArrowCircleUpIcon>
                            <VisibilityIcon color="primary" onClick={() => getDocShareholding(fileStoreId?.registeringAuthorityDoc)}>
                              {" "}
                            </VisibilityIcon>
                          </h2>
                        </label>
                        <br></br>
                        <input
                          type="file"
                          style={{ marginTop: "-6px" }}
                          className="form-control"
                          onChange={(e) => getDocumentData(e?.target?.files[0], registeringAuthorityDoc)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Row>

            <button type="submit" style={{ float: "right" }} class="btn btn-primary btn-md center-block">
              Submit
            </button>
          </form>
        </ModalBody>
        <ModalFooter toggle={() => setmodal(!modal)}></ModalFooter>
      </Modal>
    </div>
  );
};

export default ApllicantPuropseForm;
