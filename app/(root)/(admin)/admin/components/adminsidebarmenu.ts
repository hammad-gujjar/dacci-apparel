import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";

export const adminSidebarMenu = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        Icon: AiOutlineDashboard,
    },
    {
        label: "Category",
        href: "#",
        Icon: BiCategory,
        submenu: [{
            label: "Add Category",
            href: "/admin/category/add",
        },
        {
            label: "All Category",
            href: "/admin/category",
        }
        ]
    },
    {
        label: "Products",
        href: "#",
        Icon: IoShirtOutline,
        submenu: [{
            label: "Add Product",
            href: "/admin/product/add",
        },
        {
            label: "Add variant",
            href: "/admin/product-variant/add",
        },
        {
            label: "All Products",
            href: "/admin/product",
        },
        {
            label: "Product Variants",
            href: "/admin/product-variant",
        },
        ]
    },
    {
        label: "Coupons",
        href: "#",
        Icon: RiCoupon2Line,
        submenu: [{
            label: "Add Coupon",
            href: "/admin/coupon/add",
        },
        {
            label: "All Coupons",
            href: "/admin/coupon",
        },
        ]
    },
    {
        label: "Orders",
        href: "#",
        Icon: MdOutlineShoppingBag,
    },
    {
        label: "Customers",
        href: "/admin/customers",
        Icon: LuUserRound,
    },
    {
        label: "Rating & Reviews",
        href: "/admin/review",
        Icon: IoMdStarOutline,
    },
    {
        label: "Media",
        href: "/admin/media",
        Icon: MdOutlinePermMedia,
    },
];