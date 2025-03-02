import mainIcon from "../images/mainicon.png";
const Header = () => {

    return (
        <>
        <header className="header bg-[#FCFEEF] border-b-2 ">
            <div className="container mx-auto px-[16px]">
                
                <div className="inner-wrap sm:flex justify-between items-center gap-[40px]  sm:py-[28px] py-[10px] ">
                    
                    <div className="inner-brand flex sm:justify-between justify-center items-center sm:gap-[16px] gap-[2px] ">
                        <div className="md:h-[50px] h-[30px]">
                            <img className="w-full h-full bg-transparent" src={mainIcon} alt="main-logo" />
                        </div>
                        <div className="inner-logo text-main lg:text-[46px] md:text-[35px] text-[24px] font-[700]">replies.ai</div>
                    </div>
                    <ul className="inner-menu flex sm:justify-between justify-center md:gap-[35px] gap-[20px] font-[400] lg:text-[25px] md:text-[20px] text-[14px]">
                        <li className="inner-menu-item"><a href="">About</a></li>
                        <li className="inner-menu-item"><a href="">Our Team</a></li>
                        <li className="inner-menu-item"><a href="">Demo</a></li>
                    </ul>

                </div>
            </div>
        </header>
        </>
    )
}
export default Header;