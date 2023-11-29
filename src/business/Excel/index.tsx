import { Button } from 'antd'
import { FC } from 'react';
import { utils, writeFile } from 'xlsx'
import ExcelJS from 'exceljs'

export interface ColumnHeader {
    key: string;
    title: string;
}

interface ExportToExcelProps<T> {
    disabled: boolean
    fileName: string
    data: T[]
    columns?: ColumnHeader[]
    onSuccess?: () => void
}

export const ExportToExcelButton = <T extends Record<string, any>>(props: ExportToExcelProps<T>) => {

    const { data, fileName, columns = [], disabled = true, onSuccess } = props

    const handleExport = () => {
        const dataWithHeader = data.map(item => {
            const newItem: Record<string, any> = {};
            Object.keys(item).forEach(key => {
                if (columns.some(col => col?.key === key)) {
                    newItem[key] = item[key];
                }
            });
            return newItem;
        });

        const worksheet = utils.json_to_sheet(dataWithHeader, { header: columns.map(c => c.title) })
        const workbook = utils.book_new()

        utils.book_append_sheet(workbook, worksheet, 'Sheet1')
        const timestamp = new Date().getTime();
        // write and download
        writeFile(workbook, `${fileName}_${timestamp}.xlsx`)
        onSuccess?.()
    }

    return (
        <Button type={'dashed'} onClick={handleExport} disabled={disabled}>
            导出
        </Button>
    )
}


interface ExportToExcelJSProps<T> {
    fileName: string;
    data: T[];
    columns: ColumnHeader[];
    disabled?: boolean;
    onSuccess?: () => void
}

export const ExportByExcelJS: FC<ExportToExcelJSProps<any>> = ({ fileName, data, columns, disabled = true, onSuccess = () => {} }) => {
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // 添加表头
        columns.forEach(col => {
            worksheet.getCell(`${String.fromCharCode(65 + columns.indexOf(col))}1`).value = col.title;
        });

        // 添加数据
        data.forEach((item, index) => {
            columns.forEach((col, colIndex) => {
                worksheet.getCell(`${String.fromCharCode(65 + colIndex)}${index + 2}`).value = item[col.key];
            });
        });

        // 生成文件
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        onSuccess?.()
    };

    return (<Button type={'dashed'} onClick={handleExport} disabled={disabled}>
        导出
    </Button>)
};