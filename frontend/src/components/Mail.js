import { useEffect, useState, useRef } from "react";
import { GenerateReply } from "./generate-reply";

let dataReturn = {
    email: "",
    subject: "",
    content: ""
};

// Instead of exporting dataReturn directly, consider a more React-friendly approach
export const useFormData = () => {
    return dataReturn;
};

const Mail = () => {
    let [isEdit, setIsEdit] = useState(0);
    let [sliderValue, setSliderValue] = useState(50);
    let [textContent, setTextContent] = useState("Generating...");

    useEffect(() => {
        // Call GenerateReply once on mount
        GenerateReply()
            .then((reply) => {
                setTextContent(reply);  // Update state with the response
            })
            .catch((error) => {
                console.error("Error:", error);  // Handle errors
            });
    }, []);

    const getSliderValue = (event) => {
        setSliderValue(event.target.value);
    };

    const handleBlur = (event) => {
        setTextContent(event.target.value);
        setIsEdit(0);
    };
    const handleClick = (event) => {
        setIsEdit(1);
    };
    const handleGenerate = (event) => {
        setTextContent("Generating...");
        GenerateReply()
            .then((reply) => {
                setTextContent(reply);  // Update state with the response
            })
            .catch((error) => {
                console.error("Error:", error);  // Handle errors
            });
    };
    const handleReload = (event) => {
        console.log("lmao");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Update dataReturn with the form's values
        dataReturn = {
            email: event.target.email.value,
            subject: event.target.subject.value,
            content: event.target.content.value
        };
        console.log("Data Submitted:", dataReturn); // Check if data is updated correctly
    };

    return (
        <>
            <div className="mail pt-[50px]">
                <div className="container mx-auto px-[16px] md:flex md:gap-[10px] flex-nowrap ">
                    <div className="md:w-[50%] md:mb-[0px] mb-[20px]">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h2 className="text-[30px] font-[500] ">Sender Email:</h2>
                            <textarea
                                className="mail__sender bg-[#F8F3D9] md:text-[24px] text-[18px] p-[20px] rounded-[20px] mt-[8px] h-[40px]"
                                rows="2"
                                cols="2"
                                name="email"
                            ></textarea>
                            <h2 className="text-[30px] font-[500] mt-[20px]">Subject: </h2>
                            <textarea
                                className="mail__subject bg-[#F8F3D9] md:text-[24px] text-[18px] p-[20px] rounded-[20px] mt-[8px]"
                                rows="2"
                                name="subject"
                            ></textarea>

                            <h2 className="text-[30px] font-[500] mt-[20px]">Content: </h2>
                            <textarea
                                className="mail__content bg-[#F8F3D9] md:text-[24px] text-[18px] p-[20px] rounded-[20px] mt-[8px] h-[400px] flex flex-start items-start"
                                rows="10"
                                cols="10"
                                name="content"
                            ></textarea>

                            <button
                                className="button bg-[#4963DD] text-[30px] text-white justify-center mx-auto md:inline-flex flex py-[24px] px-[70px] rounded-[62px] xl:my-[50px] my-[30px] flex-1"
                                href="#"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="300"
                                type="submit"
                            >
                                Send
                            </button>

                        </form>
                        <form onSubmit={(e) => (handleReload(e))}>
                            <button
                                className="button bg-[#4963DD] text-[30px] text-white justify-center mx-auto md:inline-flex flex py-[24px] px-[70px] rounded-[62px] xl:my-[50px] my-[30px] flex-1"
                                href="#"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="300"
                                type="submit"
                            >
                                Next
                            </button>
                        </form>
                        
                    </div>
                    <div className="model p-[20px] bg-[#C7DB9C] flex-1 rounded-[15px]">
                        <h2 className="text-[30px] font-[700] mb-[20px]">AI suggestions</h2>
                        {isEdit ? (
                            <textarea
                                className="mail__content bg-[#F8F3D9] text-[24px] p-[20px] rounded-[20px] mt-[8px] h-[400px]"
                                onBlur={(event) => handleBlur(event)}
                                defaultValue={textContent}
                            ></textarea>
                        ) : (
                            <div
                                className="mail__content bg-[#F8F3D9] md:text-[24px] text-[18px] p-[10px] rounded-[20px] mt-[8px] break-words h-[420px] line-clamp-11 overflow-hidden"
                                style={{
                                    height: "400px",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 11,
                                    WebkitBoxOrient: "vertical",
                                    position: "relative",
                                }}
                                onClick={(event) => handleClick(event)}
                            >
                                {textContent}
                            </div>
                        )}

                        <div className="slider">
                            <div className="mt-[20px] w-[60%] mx-auto">
                                <h3 className="text-[24px] font-[700]">Formality 1-100</h3>
                                <input
                                    className="w-full h-4 cursor-pointer bg-gray-200 rounded-lg appearance-none transition-all "
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={1}
                                    defaultValue={50}
                                    onChange={(e) => getSliderValue(e)}
                                />
                                <p className="text-[24px] font-[700] mx-auto block">{sliderValue}</p>
                            </div>
                            <div className="flex justify-center items-center gap-[10px] mt-[30px]">
                                <button
                                    className="relative px-5 text-white font-medium rounded-[25px] bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-[100px]"
                                    onClick={handleGenerate}
                                >
                                    <span className="relative z-10 text-[16px]">✨ AI Regenerate ✨</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-md"></span>
                                    <span className="absolute left-2 top-1 w-1 h-0.5 bg-white rounded-full opacity-75 animate-ping"></span>
                                    <span className="absolute right-2 bottom-1 w-1 h-0.5 bg-white rounded-full opacity-75 animate-ping"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mail;
