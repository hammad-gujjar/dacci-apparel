import type { ReactNode } from "react";

export type TableColumn = {
    accessorKey: string;
    header: string;
    Cell?: (props: { renderedCellValue: unknown }) => ReactNode | string;
};

export const columnConfig = (
    column: TableColumn[],
    isCreatedAt = false,
    isUpdatedAt = false,
    isDeletedAt = false
): TableColumn[] => {
    const newColumn: TableColumn[] = [...column];

    if (isCreatedAt) {
        newColumn.push({
            accessorKey: "createdAt",
            header: "Created At",
            Cell: ({ renderedCellValue }) =>
                renderedCellValue
                    ? new Date(renderedCellValue as string).toLocaleString()
                    : "",
        });
    }

    if (isUpdatedAt) {
        newColumn.push({
            accessorKey: "updatedAt",
            header: "Updated At",
            Cell: ({ renderedCellValue }) =>
                renderedCellValue
                    ? new Date(renderedCellValue as string).toLocaleString()
                    : "",
        });
    }

    if (isDeletedAt) {
        newColumn.push({
            accessorKey: "deletedAt",
            header: "Deleted At",
            Cell: ({ renderedCellValue }) =>
                renderedCellValue
                    ? new Date(renderedCellValue as string).toLocaleString()
                    : "",
        });
    }

    return newColumn;
};
