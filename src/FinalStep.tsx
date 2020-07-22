//@ts-nocheck
import React, { useMemo, useState } from "react";
import { formValues } from "./InitialStep";
import { useDropzone } from "react-dropzone";
import { logger } from "./utils/fancyLogger";

interface IProps {
  setStep: (value: number) => void;
  initialValues: formValues;
}

const thumbsContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const StyledDropzone: React.FC<IProps> = ({ setStep, initialValues }) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const thumbs = previewFiles.map((file, i) => (
    <div style={thumb} key={file.preview}>
      <div style={thumbInner} className="thumb-container">
        <input
          type="checkbox"
          id={file.preview}
          checked={
            featuredImage && featuredImage.preview === file.preview ? true : ""
          }
          onChange={(e) => {
            if (e.target.checked) {
              setFeaturedImage(file);
            } else {
              setFeaturedImage(null);
            }
          }}
        />
        <label htmlFor={file.preview}>
          <img src={file.preview} style={img} alt="Gallery" />
        </label>
      </div>
    </div>
  ));

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newAcceptedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const newCollectionOfFiles = [...previewFiles, ...newAcceptedFiles];
      newCollectionOfFiles.length = Math.min(newCollectionOfFiles.length, 4);
      setPreviewFiles(newCollectionOfFiles);
    },
    disabled: previewFiles.length === 4,
  });
  const onFinalSubmit = () => {
    logger.log("Your address", initialValues.address);
    logger.log("No. of bedroom(s)", initialValues.bedroom);
    logger.log("No. of bathroom(s)", initialValues.bathroom);
    logger.log("Your Optional Description", initialValues.description);

    if (!previewFiles.length) {
      logger.error(
        "ASocial Pilot",
        "Why you gotta submit before selecting any images man?"
      );
    } else if (!featuredImage) {
      logger.groupCollapsed(
        "Mildly Social Pilot",
        "Don't want a feature image?"
      );
      previewFiles.forEach((file) => {
        logger.log("Mildly Social Pilot", file.name + " " + file.preview);
      });
      logger.groupEnd("");
    } else {
      var reader = new FileReader();
      reader.onloadend = function () {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(",")[1];

        logger.log("Social Pilot", base64);
      };
      reader.readAsDataURL(featuredImage);
    }
    // logger.log(
    //   "Social Pilot",
    //   `The following out-of-date precaches were cleaned up ` + `automatically:`,
    //   "yes"
    // );
  };
  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Gallery
          </h3>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            You can select one of the images as your profile pictures
          </p>
          <div className="mt-1 text-sm leading-5">
            <span
              onClick={() => setStep(1)}
              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
            >
              &larr; Go back to the previous page
            </span>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700">
              Gallery photos
            </label>
            <div
              {...getRootProps(style)}
              className="dropzone-container mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input {...getInputProps()} />
                <p className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                  Drag 'n' drop some files here, you may select upto 4
                </p>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={onFinalSubmit}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </span>
            </div>
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>
    </div>
  );
};

export default StyledDropzone;
