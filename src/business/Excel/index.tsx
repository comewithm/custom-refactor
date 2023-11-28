import { Button } from 'antd'
import {utils, writeFile} from 'xlsx'

export interface ColumnHeader {
    key: string;
    title: string;
}

interface ExportToExcelProps<T> {
    fileName: string
    data: T[]
    columns?: ColumnHeader[]
}

export const ExportToExcelButton = <T extends Record<string, any>>(props:ExportToExcelProps<T>) => {

    const {data, fileName, columns = []} = props

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

        const worksheet = utils.json_to_sheet(dataWithHeader)
        const workbook = utils.book_new()

        utils.book_append_sheet(workbook, worksheet, 'Sheet1')
        // write and download
        writeFile(workbook, `${fileName}.xlsx`)
    }

    return (
        <Button type={'dashed'} onClick={handleExport}>
            导出
        </Button>
    )
}