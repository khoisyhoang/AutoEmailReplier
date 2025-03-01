const Header = () => {

    return (
        <header class="header my-[24px]">
            <div class="container mx-auto px-[16px]">
                <div class="inner-wrap flex justify-between items-center gap-[40px]">
                    <div class="inner-brand flex justify-between items-center gap-[16px]"><i class="fa-solid fa-bars text-[24px]  md:hidden"></i>
                        <div class="inner-logo text-main text-[32px] font-[700]">28.SHOP</div>
                    </div>
                    <ul class="inner-menu md:flex hidden justify-between gap-[24px] font-[400]">
                        <li class="inner-menu-item">Giới Thiệu</li>
                        <li class="inner-menu-item">Sản Phẩm</li>
                        <li class="inner-menu-item">Bài Viết</li>
                        <li class="inner-menu-item">Liên Hệ</li>
                    </ul>
                    <form class="inner-search hidden lg:flex items-center m-[0px] gap-[12px] flex-1 bg-[#F0F0F0] py-[12px] px-[16px] rounded-[62px] "><i class="fa-solid fa-magnifying-glass text-[#00000066]"></i><input class=" bg-transparent focus:outline-none " type="text" placeholder="Tìm kiếm sản phẩm..." /></form>
                    <div class="inner-icon flex gap-[14px] text-[20px]"><i class="fa-solid fa-magnifying-glass md:hidden"></i><i class="fa-solid fa-cart-shopping"></i><i class="fa-regular fa-user"></i></div>
                </div>
            </div>
        </header>
    )
}
export default Header;