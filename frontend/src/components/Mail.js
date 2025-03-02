import { useState } from "react";
import { Range } from 'react-daisyui'

const Mail = () => {
    let [isEdit, setIsEdit] = useState(0);
    let [sliderValue, setSliderValue] = useState(50);
    const getSliderValue = (event) => {
        setSliderValue(event.target.value);
    }
    return (
        <>
            <div className="mail pt-[50px]">
                <div className="container mx-auto px-[16px] md:flex md:gap-[10px] flex-nowrap ">
                    <div className="md:w-[50%] md:mb-[0px] mb-[20px]">
                        <h2 className="text-[30px] font-[500] ">Sender Email:</h2>
                        <div className="mail__sender bg-[#F8F3D9] md:text-[24px] text-[18px] p-[20px] rounded-[20px] mt-[8px]">
                            khoisyhoang@gmail.com
                        </div>
                        <h2 className="text-[30px] font-[500] mt-[20px]">Subject: </h2>
                        <div className="mail__subject bg-[#F8F3D9] md:text-[24px] text-[18px] p-[20px] rounded-[20px] mt-[8px]">
                            Follow up on last email
                        </div>
                        <h2 className="text-[30px] font-[500] mt-[20px]">Content: </h2>
                        {
                            // isEdit ?    
                            // <textarea className="mail__content bg-[#F8F3D9] text-[24px] p-[20px] rounded-[20px] mt-[8px]">
                            //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            // </textarea>
                            // :
                            <div className="mail__content bg-[#F8F3D9] md:text-[24px] text-[18px] p-[20px] rounded-[20px] mt-[8px]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        }

                    </div>
                    <div className="model p-[20px] bg-[#C7DB9C] flex-1 rounded-[15px]">
                        <h2 className="text-[30px] font-[700] mb-[20px]">AI suggestions</h2>
                        <div className="md:text-[24px] text-[18px] bg-white rounded-[20px] p-[10px]">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </div>
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
                                <div className="buttons">
                                    <a
                                        className="button bg-[#4963DD] text-[30px] text-white justify-center mx-auto md:inline-flex flex py-[24px] px-[70px] rounded-[62px] xl:my-[50px] my-[30px] flex-1" href="#" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">Send
                                    </a>
                                </div>
                                <button class="relative px-5 text-white font-medium rounded-[25px] bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-[100px]">
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
    )
}
export default Mail;