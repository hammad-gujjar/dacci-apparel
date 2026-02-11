import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbDataItem {
    label: string;
    href: string;
}

const BreadCrumb = ({ breadcrumbData }: { breadcrumbData: BreadcrumbDataItem[] }) => {
    return (
        <Breadcrumb className="mb-5">
            <BreadcrumbList>
                {breadcrumbData.length > 0 && breadcrumbData.map((item, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index !== breadcrumbData.length - 1 && (
                            <BreadcrumbSeparator className="mt-1" />
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb