import React from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";

export interface formValues {
  address: string;
  bedroom: string;
  bathroom: string;
  description: string;
  fromCsv?: boolean;
}
interface IProps {
  setStep: (step: number) => void;
  setInitialValues: (values: formValues) => void;
}

const InitialStep: React.FC<IProps> = ({ setStep, setInitialValues }) => {
  const readFileData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.files) {
      const extension = e.target.value.match(/\.([^.]+)$/);
      if (extension && extension[1] === "csv") {
        Papa.parse(e.target.files[0], {
          complete: function (results) {
            const { data } = results as { data: string[][] };
            if (data[0]) {
              const [address, bedroom, bathroom, description] = data[0];
              setInitialValues({
                address: address.trim(),
                bedroom: bedroom.trim(),
                bathroom: bathroom.trim(),
                description: description.trim(),
                fromCsv: true,
              });
              setStep(1);
            } else {
              toast.error("The data seems like not properly formatted", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          },
        });
      } else {
        toast.error(`When I say "Only CSVs allowed" I mean it`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You seem to have selected an invisible file", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
        <div className="relative h-full max-w-screen-xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>

      <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="/" aria-label="Home">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="Logo"
                  />
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"></div>

        <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
          <div className="text-center">
            <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Want base64 for
              <br className="xl:hidden" />
              <span className="text-indigo-600"> your images ?</span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              What are you waiting for, let's turn your images into gibberish.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => {
                    setInitialValues({
                      address: "",
                      description: "",
                      bathroom: "",
                      bedroom: "",
                    });
                    setStep(1);
                  }}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  Add from scratch
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={() => {
                    if (document.getElementById("csvFile")) {
                      document.getElementById("csvFile")!.click();
                    }
                  }}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  Upload CSV
                </button>
                <input
                  type="file"
                  id="csvFile"
                  accept=".csv"
                  onClick={(event) => {
                    event.currentTarget.value = "";
                  }}
                  onChange={readFileData}
                  style={{ display: "none" }}
                ></input>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default InitialStep;
