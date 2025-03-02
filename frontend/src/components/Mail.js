import { useState } from "react";

const Mail = () => {
    let [isEdit, setIsEdit] = useState(0);
    isEdit = 1;
    return (
        <>
        <div className="mail pt-[50px]">
            <div className="container mx-auto px-[16px]">
                <h2 className="text-[30px] font-[500] ">Sender Email:</h2>
                <div className="mail__sender bg-[#F8F3D9] text-[24px] p-[20px] rounded-[20px] mt-[8px]"> 
                    khoisyhoang@gmail.com
                </div>
                <h2 className="text-[30px] font-[500] mt-[20px]">Subject: </h2>
                <div className="mail__subject bg-[#F8F3D9] text-[24px] p-[20px] rounded-[20px] mt-[8px]"> 
                    Follow up on last email
                </div>
                <h2 className="text-[30px] font-[500] mt-[20px]">Content: </h2>
                {
                    // isEdit ?    
                    // <textarea className="mail__content bg-[#F8F3D9] text-[24px] p-[20px] rounded-[20px] mt-[8px]">
                    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    // </textarea>
                    // :
                    <div className="mail__content bg-[#F8F3D9] text-[24px] p-[20px] rounded-[20px] mt-[8px]"> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                }
                <div className="buttons">
                    <a 
                        class="button bg-[#578FCA] text-[30px] justify-center mx-auto md:inline-flex flex py-[24px] px-[70px] rounded-[62px] xl:my-[50px] my-[30px]" href="#" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">Send
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}
export default Mail;