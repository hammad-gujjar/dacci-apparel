import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag, MdOutlinePermMedia, MdOutlineManageSearch } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { RiCoupon2Line, RiContactsBookLine } from "react-icons/ri";

export const adminSidebarMenu = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        Icon: AiOutlineDashboard,
    },
    {
        label: "B2B CRM Leads",
        href: "/admin/leads",
        Icon: RiContactsBookLine,
    },
    {
        label: "SEO & Content CMS",
        href: "#",
        Icon: MdOutlineManageSearch,
        submenu: [
            {
                label: "SEO Overview",
                href: "/admin/seo",
            },
            {
                label: "Solution Pages",
                href: "/admin/seo/solutions",
            },
            {
                label: "Knowledge Hub",
                href: "/admin/seo/knowledge",
            },
        ],
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
        href: "/admin/orders",
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